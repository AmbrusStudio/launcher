import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AccountContinueWithMetamask,
  AccountEmailAndAgreement,
  AccountEmailAndAgreementProps,
  AccountORSpacer,
  AccountPopup,
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
  const { onNextClick } = props
  return <AccountEmailAndAgreement onNextClick={onNextClick} />
}

const signUpStepInfos: Record<number, StepInfo> = {
  0: { title: 'Sign Up', navBack: false },
  1: { title: 'Enter Email', navBack: true },
  2: { title: 'Verify Your Email', navBack: true },
}

function getStepInfo(step: number): StepInfo {
  const info = signUpStepInfos[step]
  if (!info) return { title: 'Sign Up', navBack: false }
  return info
}

export function SignUp() {
  const query = useQuery()
  const navigate = useNavigate()
  const [step, setStep] = React.useState(0)
  const { title, navBack } = getStepInfo(step)
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

  console.log(query.get('session'))

  return (
    <main id="main">
      <div className="py-192px mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {step === 0 && (
            <StepZero
              onNextClick={handleNextClick}
              onMetamaskClick={handleMetamaskClick}
              onSignInClick={handleSignInClick}
            />
          )}
          {step === 1 && <StepOne onNextClick={handleNextClick} />}
        </AccountPopup>
      </div>
    </main>
  )
}
