import { useEthers } from '@usedapp/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AccountConnectWallet,
  AccountConnectWalletProps,
  AccountContinueWithMetamask,
  AccountEmailAndAgreement,
  AccountEmailAndAgreementProps,
  AccountEmailVerify,
  AccountEmailVerifyProps,
  AccountORSpacer,
  AccountPasswordInput,
  AccountPasswordInputProps,
  AccountPopup,
  AccountSignUpComplete,
  AccountUsernameInput,
  AccountUsernameInputProps,
} from '../../../components/Account'
import { Button } from '../../../components/Forms'
import { useQuery } from '../../../hooks'
import { AccountFormData, AccountStepCommonProps, StepInfo } from '../../../types'

type StepZeroProps = AccountStepCommonProps & {
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignInClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepZero(props: StepZeroProps) {
  const { onSubmit, onMetamaskClick, onSignInClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountEmailAndAgreement onNextButtonSubmit={onSubmit} />
      <AccountORSpacer />
      <AccountContinueWithMetamask onClick={onMetamaskClick} />
      <Button variant="secondary" onClick={onSignInClick}>
        Sign in instead
      </Button>
    </div>
  )
}

type StepOneProps = AccountEmailAndAgreementProps

function StepOne(props: StepOneProps) {
  return <AccountEmailAndAgreement {...props} />
}

type StepTwoProps = AccountEmailVerifyProps

function StepTwo(props: StepTwoProps) {
  return <AccountEmailVerify {...props} />
}

type StepThreeProps = AccountUsernameInputProps

function StepThree(props: StepThreeProps) {
  return <AccountUsernameInput {...props} />
}

type StepFourProps = AccountPasswordInputProps

function StepFour(props: StepFourProps) {
  return <AccountPasswordInput {...props} />
}

type StepFiveProps = AccountConnectWalletProps

function StepFive(props: StepFiveProps) {
  return <AccountConnectWallet {...props} />
}

const signUpStepInfos: Record<number, StepInfo> = {
  0: { title: 'Sign Up', navBack: false },
  1: { title: 'Enter Email', navBack: true },
  2: { title: 'Verify Your Email', navBack: true },
  3: { title: 'Choose A Username', navBack: true },
  4: { title: 'Enter Password', navBack: true },
  5: { title: 'Connect Wallet', navBack: false },
}

function getStepInfo(step: number, complete?: boolean): StepInfo {
  if (complete) return { title: 'You’re all set!', navBack: false }
  const info = signUpStepInfos[step]
  if (!info) return { title: 'Sign Up', navBack: false }
  return info
}

export function SignUp() {
  const query = useQuery()
  const navigate = useNavigate()
  const { account, active, activateBrowserWallet } = useEthers()
  const { watch, trigger, handleSubmit } = useFormContext<AccountFormData>()

  const [step, setStep] = React.useState(0)
  const [complete, setComplete] = React.useState(false)
  const { title, navBack } = getStepInfo(step, complete)
  const isStep = React.useCallback(
    (s: number) => {
      if (complete) return false
      return step === s
    },
    [complete, step]
  )
  const stepIncrement = React.useCallback(() => setStep((s) => (s += 1)), [])
  const stepDecrement = React.useCallback(() => setStep((s) => (s -= 1)), [])

  const handleNavBackClick = React.useCallback(() => {
    stepDecrement()
  }, [stepDecrement])
  const handleMetamaskClick = React.useCallback(() => {
    stepIncrement()
  }, [stepIncrement])
  const handleSignInClick = React.useCallback(() => {
    navigate(`/account/signin`)
  }, [navigate])
  const handleBindWalletClick = React.useCallback(() => {
    if (!(account && active)) activateBrowserWallet()
    if (account && active) setComplete(true)
    console.log('account', account)
  }, [account, activateBrowserWallet, active])
  const handleSkipBindWalletClick = React.useCallback(() => {
    setComplete(true)
  }, [])
  const handleCompleteClick = React.useCallback(() => {
    navigate(`/account/center`)
  }, [navigate])

  /** For step 0, sign up with email directly. */
  const handleEmailSignUpSubmit = React.useCallback(async (data: AccountFormData) => {
    console.log('handleEmailSignUpSubmit', data)
    setStep(2)
  }, [])
  /** For step 1, bind email after sign up with Metamask. */
  const handleEmailBindSubmit = React.useCallback(
    async (data: AccountFormData) => {
      console.log('handleEmailBindSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )
  /** For step 2, verify email with 6 digits code. */
  const handleEmailVerifyCodeSubmit = React.useCallback(
    async (data: AccountFormData) => {
      const check = await trigger('verifyCode')
      if (!check) return
      console.log('handleEmailVerifyCodeSubmit', data)
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 3, set an username. */
  const handleUsernameSubmit = React.useCallback(
    async (data: AccountFormData) => {
      const check = await trigger('username')
      if (!check) return
      console.log('handleUsernameSubmit', data)
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 4, set a password */
  const handlePasswordSubmit = React.useCallback(
    async (data: AccountFormData) => {
      console.log('handleUsernameSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )

  console.log('session', query.get('session'))

  React.useEffect(() => {
    // TODO: remove before prodction
    const subscription = watch((value, { name, type }) => console.log('watch', name, type, value))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <main id="main">
      <div className="py-192px mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {isStep(0) && (
            <StepZero
              onSubmit={handleSubmit(handleEmailSignUpSubmit)}
              onMetamaskClick={handleMetamaskClick}
              onSignInClick={handleSignInClick}
            />
          )}
          {isStep(1) && <StepOne onNextButtonSubmit={handleSubmit(handleEmailBindSubmit)} />}
          {isStep(2) && <StepTwo onNextButtonSubmit={handleSubmit(handleEmailVerifyCodeSubmit)} />}
          {isStep(3) && <StepThree onNextButtonSubmit={handleSubmit(handleUsernameSubmit)} />}
          {isStep(4) && <StepFour onNextButtonSubmit={handleSubmit(handlePasswordSubmit)} />}
          {isStep(5) && <StepFive onMetamaskClick={handleBindWalletClick} onSkipClick={handleSkipBindWalletClick} />}
          {complete && <AccountSignUpComplete onCompleteClick={handleCompleteClick} />}
        </AccountPopup>
      </div>
    </main>
  )
}
