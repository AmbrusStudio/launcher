import React from 'react'
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
import { StepInfo } from '../../../types'

type StepZeroProps = AccountUsernameAndPasswordProps & {
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignUpClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepZero(props: StepZeroProps) {
  const { onMetamaskClick, onSignUpClick, onFogotPasswordClick, onNextClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountUsernameAndPassword onFogotPasswordClick={onFogotPasswordClick} onNextClick={onNextClick} />
      <AccountORSpacer />
      <AccountContinueWithMetamask onClick={onMetamaskClick} />
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
  const navigate = useNavigate()
  const [step, setStep] = React.useState(0)
  const [wallet, setWallet] = React.useState(false)
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
  const handleToMetamaskClick = React.useCallback(() => {
    setWallet(true)
  }, [])
  const handleNormalSignInClick = React.useCallback(() => {
    setComplete(true)
  }, [])
  const handleMetamaskSignInClick = React.useCallback(() => {
    setComplete(true)
  }, [])
  const handleResetPasswordCompleteClick = React.useCallback(() => {
    location && location.reload()
  }, [])
  const handleSignUpClick = React.useCallback(() => {
    navigate(`/account/signup`)
  }, [navigate])

  return (
    <main id="main">
      <div className="py-192px mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {isStep(0) && (
            <StepZero
              onFogotPasswordClick={handleNextClick}
              onNextClick={handleNormalSignInClick}
              onMetamaskClick={handleToMetamaskClick}
              onSignUpClick={handleSignUpClick}
            />
          )}
          {isStep(1) && <StepOne onNextClick={handleNextClick} />}
          {isStep(2) && <StepTwo onNextClick={handleNextClick} />}
          {isStep(3) && <StepThree onNextClick={handleNextClick} />}
          {isStep(4) && <StepFour onCompleteClick={handleResetPasswordCompleteClick} />}
          {!complete && wallet && (
            <AccountWallletSignIn brandName="E4C Fallen Arena" onMetamaskClick={handleMetamaskSignInClick} />
          )}
          {complete && <AccountSignInComplete brandName="E4C Fallen Arena" />}
        </AccountPopup>
      </div>
    </main>
  )
}
