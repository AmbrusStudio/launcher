import { shortenIfAddress, useEthers } from '@usedapp/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AccountContinueWithMetamask,
  AccountEmailVerify,
  AccountEmailVerifyProps,
  AccountForgotPassword,
  AccountForgotPasswordProps,
  AccountORSpacer,
  AccountPasswordInput,
  AccountPasswordInputProps,
  AccountPopup,
  AccountResetPasswordComplete,
  AccountResetPasswordCompleteProps,
  AccountSignInComplete,
  AccountUsernameAndPassword,
  AccountUsernameAndPasswordProps,
  AccountWallletSignIn,
} from '../../../components/Account'
import { Button } from '../../../components/Forms'
import WalletModal from '../../../components/WalletModal'
import { useMetamaskSign, useQuery } from '../../../hooks'
import { AccountForgotPasswordFormData, AccountSignInFormData, StepInfo } from '../../../types'

type StepZeroProps = AccountUsernameAndPasswordProps & {
  account: string
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignUpClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepZero(props: StepZeroProps) {
  const { account, onMetamaskClick, onSignUpClick, onFogotPasswordClick, onNextButtonSubmit } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountUsernameAndPassword onFogotPasswordClick={onFogotPasswordClick} onNextButtonSubmit={onNextButtonSubmit} />
      <AccountORSpacer />
      <AccountContinueWithMetamask account={account} onClick={onMetamaskClick} />
      <Button variant="secondary" onClick={onSignUpClick}>
        Sign up instead
      </Button>
    </div>
  )
}

type StepOneProps = AccountForgotPasswordProps

function StepOne(props: StepOneProps) {
  return <AccountForgotPassword {...props} />
}

type StepTwoProps = AccountEmailVerifyProps

function StepTwo(props: StepTwoProps) {
  return <AccountEmailVerify {...props} />
}

type StepThreeProps = AccountPasswordInputProps

function StepThree(props: StepThreeProps) {
  return <AccountPasswordInput {...props} isNew />
}

type StepFourProps = AccountResetPasswordCompleteProps

function StepFour(props: StepFourProps) {
  return <AccountResetPasswordComplete {...props} />
}

const forgotPasswordStepInfos: Record<number, StepInfo> = {
  0: { title: 'Sign In', navBack: false },
  1: { title: 'Forgot Password', navBack: true },
  2: { title: 'Verify Your Email', navBack: true },
  3: { title: 'Reset Password', navBack: true },
  4: { title: 'You’re all set!', navBack: false },
}

function getStepInfo(step: number, complete?: boolean): StepInfo {
  if (complete) return { title: 'Signed In Successfully', navBack: false }
  const info = forgotPasswordStepInfos[step]
  if (!info) return { title: 'Sign In', navBack: false }
  return info
}

export function SignIn() {
  const brandName = 'E4C Fallen Arena'
  const query = useQuery()
  const navigate = useNavigate()
  const { handleSubmit: handleSignInSubmit } = useFormContext<AccountSignInFormData>()
  const { trigger, handleSubmit: handleFogotPasswordSubmit } = useFormContext<AccountForgotPasswordFormData>()
  const { account } = useEthers()
  const { getMetamaskSignSignature } = useMetamaskSign()

  const shortAccount = shortenIfAddress(account)

  const client = query.get('client')
  const [wallet] = React.useState(!!client)
  const [step, setStep] = React.useState(0)
  const [openWalletModal, setOpenWalletModal] = React.useState(false)
  const [complete, setComplete] = React.useState(false)
  const { title, navBack } = getStepInfo(step, complete)
  const isStep = React.useCallback(
    (s: number) => {
      if (complete || wallet) return false
      return step === s
    },
    [complete, step, wallet]
  )
  const stepIncrement = React.useCallback(() => setStep((s) => (s += 1)), [])
  const stepDecrement = React.useCallback(() => setStep((s) => (s -= 1)), [])

  const handleNavBackClick = React.useCallback(() => {
    stepDecrement()
  }, [stepDecrement])
  const handleNextClick = React.useCallback(() => {
    stepIncrement()
  }, [stepIncrement])
  const handleResetPasswordCompleteClick = React.useCallback(() => {
    location && location.reload()
  }, [])
  const handleSignUpClick = React.useCallback(() => {
    navigate(`/account/signup`)
  }, [navigate])

  const handleMetamaskSignInClick = React.useCallback(async () => {
    if (!account && !openWalletModal) return setOpenWalletModal(true)
    const code = '123456'
    const signature = await getMetamaskSignSignature(code)
    if (!signature) return
    console.log('account', account, 'signature', signature)
    setComplete(true)
  }, [account, getMetamaskSignSignature, openWalletModal])

  const handleNormalSignInSubmit = React.useCallback(async (data: AccountSignInFormData) => {
    console.log('handleNormalSignInSubmit', data)
    setComplete(true)
  }, [])

  /** For step 1, send email for verify user can reset password. */
  const handleSendEmailSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      console.log('handleNormalSignInSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )
  /** For step 2, verify email with 6 digits code. */
  const handleEmailVerifyCodeSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      const check = await trigger('verifyCode')
      if (!check) return
      console.log('handleEmailVerifyCodeSubmit', data)
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 3, set a new password */
  const handleNewPasswordSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      console.log('handleNewPasswordSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )

  return (
    <main id="main">
      <div className="xl:py-192px xl:mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {isStep(0) && (
            <StepZero
              account={shortAccount}
              onNextButtonSubmit={handleSignInSubmit(handleNormalSignInSubmit)}
              onFogotPasswordClick={handleNextClick}
              onMetamaskClick={handleMetamaskSignInClick}
              onSignUpClick={handleSignUpClick}
            />
          )}
          {isStep(1) && <StepOne onNextButtonSubmit={handleFogotPasswordSubmit(handleSendEmailSubmit)} />}
          {isStep(2) && <StepTwo onNextButtonSubmit={handleFogotPasswordSubmit(handleEmailVerifyCodeSubmit)} />}
          {isStep(3) && <StepThree onNextButtonSubmit={handleFogotPasswordSubmit(handleNewPasswordSubmit)} />}
          {isStep(4) && <StepFour onCompleteClick={handleResetPasswordCompleteClick} />}
          {!complete && wallet && (
            <AccountWallletSignIn
              account={shortAccount}
              brandName={brandName}
              onMetamaskClick={handleMetamaskSignInClick}
            />
          )}
          {complete && <AccountSignInComplete brandName={brandName} />}
        </AccountPopup>
      </div>
      <WalletModal visible={openWalletModal} setVisible={setOpenWalletModal} />
    </main>
  )
}
