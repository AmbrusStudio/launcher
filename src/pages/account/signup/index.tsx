import { useEthers } from '@usedapp/core'
import React from 'react'
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
import { StepInfo } from '../../../types'

type StepZeroProps = AccountEmailAndAgreementProps & {
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignInClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepZero(props: StepZeroProps) {
  const { onMetamaskClick, onSignInClick, onNextClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountEmailAndAgreement onNextClick={onNextClick} />
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
  const handleNextClick = React.useCallback(() => {
    stepIncrement()
  }, [stepIncrement])
  const handleMetamaskClick = React.useCallback(() => {
    stepIncrement()
  }, [stepIncrement])
  const handleSignInClick = React.useCallback(() => {
    navigate(`/account/signin`)
  }, [navigate])
  const handleConnectWalletClick = React.useCallback(() => {
    if (!(account && active)) activateBrowserWallet()
    if (account && active) setComplete(true)
    console.log('account', account)
  }, [account, activateBrowserWallet, active])
  const handleSkipMetamaskClick = React.useCallback(() => {
    setComplete(true)
  }, [])
  const handleCompleteClick = React.useCallback(() => {
    navigate(`/account/center`)
  }, [navigate])

  console.log(query.get('session'))

  return (
    <main id="main">
      <div className="py-192px mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {isStep(0) && (
            <StepZero
              onNextClick={handleNextClick}
              onMetamaskClick={handleMetamaskClick}
              onSignInClick={handleSignInClick}
            />
          )}
          {isStep(1) && <StepOne onNextClick={handleNextClick} />}
          {isStep(2) && <StepTwo onNextClick={handleNextClick} />}
          {isStep(3) && <StepThree onNextClick={handleNextClick} />}
          {isStep(4) && <StepFour onNextClick={handleNextClick} />}
          {isStep(5) && <StepFive onMetamaskClick={handleConnectWalletClick} onSkipClick={handleSkipMetamaskClick} />}
          {complete && <AccountSignUpComplete onCompleteClick={handleCompleteClick} />}
        </AccountPopup>
      </div>
    </main>
  )
}
