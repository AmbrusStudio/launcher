import Alert from '@mui/material/Alert'
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
import { useMetamaskAccount, useOpenGameClient, useQuery } from '../../../hooks'
import { AccountForgotPasswordFormData, AccountSignInFormData, StepInfo } from '../../../types'

type StepSignInProps = AccountUsernameAndPasswordProps & {
  account: string
  metamaskButtonDisabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignUpClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepSignIn(props: StepSignInProps) {
  const { account, metamaskButtonDisabled = false } = props
  const { onMetamaskClick, onSignUpClick, onFogotPasswordClick, onNextButtonSubmit } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountUsernameAndPassword onFogotPasswordClick={onFogotPasswordClick} onNextButtonSubmit={onNextButtonSubmit} />
      <AccountORSpacer />
      <AccountContinueWithMetamask account={account} disabled={metamaskButtonDisabled} onClick={onMetamaskClick} />
      <Button variant="secondary" onClick={onSignUpClick}>
        Sign up instead
      </Button>
    </div>
  )
}

type StepForgotPasswordProps = AccountForgotPasswordProps

function StepForgotPassword(props: StepForgotPasswordProps) {
  return <AccountForgotPassword {...props} />
}

type StepVerifyEmailProps = AccountEmailVerifyProps

function StepVerifyEmail(props: StepVerifyEmailProps) {
  return <AccountEmailVerify {...props} />
}

type StepResetPasswordProps = AccountPasswordInputProps

function StepResetPassword(props: StepResetPasswordProps) {
  return <AccountPasswordInput {...props} isNew />
}

type StepResetCompleteProps = AccountResetPasswordCompleteProps

function StepResetComplete(props: StepResetCompleteProps) {
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
  const { walletLogin } = useMetamaskAccount()
  const { openGameClient } = useOpenGameClient()

  const shortAccount = shortenIfAddress(account)

  const client = query.get('client')
  const [wallet] = React.useState(!!client)
  const [step, setStep] = React.useState(0)
  const [openWalletModal, setOpenWalletModal] = React.useState(false)
  const [complete, setComplete] = React.useState(false)
  const [signInError, setSignInError] = React.useState('')
  const [metamaskSigning, setMetamaskSigning] = React.useState(false)

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
  const handleNextClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation()
      e.preventDefault()
      stepIncrement()
    },
    [stepIncrement]
  )
  const handleResetPasswordCompleteClick = React.useCallback(() => {
    location && location.reload()
  }, [])
  const handleSignUpClick = React.useCallback(() => {
    navigate(`/account/signup`)
  }, [navigate])

  const handleMetamaskSignInClick = React.useCallback(async () => {
    if (metamaskSigning) return
    try {
      setMetamaskSigning(true)
      if (signInError) setSignInError('')
      if (!account && !openWalletModal) return setOpenWalletModal(true)
      const res = await walletLogin()
      if (!res.isOk) return setSignInError(res.error.message)
      openGameClient({ path: res.data.accessToken }, 1000)
      setComplete(true)
    } finally {
      setMetamaskSigning(false)
    }
  }, [account, metamaskSigning, openGameClient, openWalletModal, signInError, walletLogin])

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
      <div className="md:py-192px md:mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {signInError && (
            <Alert className="mb-24px" variant="filled" severity="error">
              {signInError}
            </Alert>
          )}
          {isStep(0) && (
            <StepSignIn
              account={shortAccount}
              metamaskButtonDisabled={metamaskSigning}
              onNextButtonSubmit={handleSignInSubmit(handleNormalSignInSubmit)}
              onFogotPasswordClick={handleNextClick}
              onMetamaskClick={handleMetamaskSignInClick}
              onSignUpClick={handleSignUpClick}
            />
          )}
          {isStep(1) && <StepForgotPassword onNextButtonSubmit={handleFogotPasswordSubmit(handleSendEmailSubmit)} />}
          {isStep(2) && <StepVerifyEmail onNextButtonSubmit={handleFogotPasswordSubmit(handleEmailVerifyCodeSubmit)} />}
          {isStep(3) && <StepResetPassword onNextButtonSubmit={handleFogotPasswordSubmit(handleNewPasswordSubmit)} />}
          {isStep(4) && <StepResetComplete onCompleteClick={handleResetPasswordCompleteClick} />}
          {!complete && wallet && (
            <AccountWallletSignIn
              account={shortAccount}
              brandName={brandName}
              disabled={metamaskSigning}
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
