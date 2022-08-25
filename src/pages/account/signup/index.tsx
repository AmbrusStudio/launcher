import Alert from '@mui/material/Alert'
import { shortenIfAddress, useEthers } from '@usedapp/core'
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
import { BasePageLayout } from '../../../components/Layout'
import { useEmailAccount, useMetamaskAccount, useWalletModal } from '../../../hooks'
import { AccountSignUpFormData, StepInfo } from '../../../types'

type StepSignUpProps = AccountEmailAndAgreementProps & {
  account: string
  nextButtonDisabled?: boolean
  metamaskButtonDisabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignInClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepSignUp(props: StepSignUpProps) {
  const { account, nextButtonDisabled = false, metamaskButtonDisabled = false } = props
  const { onNextButtonSubmit, onMetamaskClick, onSignInClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountEmailAndAgreement disabled={nextButtonDisabled} onNextButtonSubmit={onNextButtonSubmit} />
      <AccountORSpacer />
      <AccountContinueWithMetamask account={account} disabled={metamaskButtonDisabled} onClick={onMetamaskClick} />
      <Button variant="secondary" onClick={onSignInClick}>
        Sign in instead
      </Button>
    </div>
  )
}

type StepVerifyYourEmailProps = AccountEmailVerifyProps

function StepVerifyYourEmail(props: StepVerifyYourEmailProps) {
  return <AccountEmailVerify {...props} />
}

type StepChooseAUsernameProps = AccountUsernameInputProps

function StepChooseAUsername(props: StepChooseAUsernameProps) {
  return <AccountUsernameInput {...props} />
}

type StepEnterPasswordProps = AccountPasswordInputProps

function StepEnterPassword(props: StepEnterPasswordProps) {
  return <AccountPasswordInput {...props} />
}

type StepConnectWalletProps = AccountConnectWalletProps

function StepConnectWallet(props: StepConnectWalletProps) {
  return <AccountConnectWallet {...props} />
}

const signUpStepInfos: Record<number, StepInfo> = {
  0: { title: 'Sign Up', navBack: false },
  1: { title: 'Verify Your Email', navBack: true },
  2: { title: 'Choose A Username', navBack: true },
  3: { title: 'Enter Password', navBack: true },
  4: { title: 'Connect Wallet', navBack: false },
}

function getStepInfo(step: number, complete?: boolean): StepInfo {
  if (complete) return { title: 'You’re all set!', navBack: false }
  const info = signUpStepInfos[step]
  if (!info) return { title: 'Sign Up', navBack: false }
  return info
}

export function SignUp() {
  const navigate = useNavigate()
  const { account } = useEthers()
  const { getValues, trigger, handleSubmit } = useFormContext<AccountSignUpFormData>()
  const { openWalletModal } = useWalletModal()
  const { walletLogin, walletBind } = useMetamaskAccount()
  const { emailSendVerification, emailRegister } = useEmailAccount()

  const shortAccount = shortenIfAddress(account)

  const [step, setStep] = React.useState(0)
  const [complete, setComplete] = React.useState(false)
  const [signUpError, setSignUpError] = React.useState('')
  const [metamaskBinding, setMetamaskBinding] = React.useState(false)
  const [metamaskSigning, setMetamaskSigning] = React.useState(false)
  const [verifySending, setVerifySending] = React.useState(false)
  const [emailSigning, setEmailSigning] = React.useState(false)

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
  const handleSignInClick = React.useCallback(() => {
    navigate(`/account/signin`)
  }, [navigate])
  const handleCompleteClick = React.useCallback(() => {
    navigate(`/account/center`)
  }, [navigate])

  const handleMetamaskSignUpClick = React.useCallback(async () => {
    if (metamaskSigning) return
    try {
      setMetamaskSigning(true)
      if (signUpError) setSignUpError('')
      if (!account) return openWalletModal()
      const res = await walletLogin()
      if (!res.isOk) return setSignUpError(res.error.message)
      setComplete(true)
    } finally {
      setMetamaskSigning(false)
    }
  }, [account, metamaskSigning, openWalletModal, signUpError, walletLogin])

  /** For step 0, sign up with email directly. */
  const handleEmailSignUpSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      if (!data.agreement || verifySending) return
      try {
        setVerifySending(true)
        if (signUpError) setSignUpError('')
        const res = await emailSendVerification(data.email, data.newsletter)
        if (!res.isOk) return setSignUpError(res.error.message)
        stepIncrement()
      } finally {
        setVerifySending(false)
      }
    },
    [emailSendVerification, signUpError, stepIncrement, verifySending]
  )
  /** For step 1, verify email with 6 digits code. */
  const handleEmailVerifyCodeSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      if (!data.verifyCode) return
      const check = await trigger('verifyCode')
      if (!check) return
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 1, resend verify email. */
  const handleResendEmailVerifyCodeClick = React.useCallback(async () => {
    const check = await trigger('email')
    if (!check) return stepDecrement() // If no email, back to input email.
    if (signUpError) setSignUpError('')
    const [email, newsletter] = getValues(['email', 'newsletter'])
    const res = await emailSendVerification(email, newsletter)
    if (!res.isOk) return setSignUpError(res.error.message)
  }, [emailSendVerification, getValues, signUpError, stepDecrement, trigger])
  /** For step 2, set an username. */
  const handleUsernameSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      if (!data.username) return
      const check = await trigger('username')
      if (!check) return
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 3, set a password */
  const handlePasswordSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      if (emailSigning) return
      try {
        setEmailSigning(true)
        if (signUpError) setSignUpError('')
        const check = await trigger('password')
        if (!check) return
        const res = await emailRegister({
          address: data.email,
          password: data.password,
          code: data.verifyCode,
          nickname: data.username,
        })
        if (!res.isOk) return setSignUpError(res.error.message)
        stepIncrement()
      } finally {
        setEmailSigning(false)
      }
    },
    [emailRegister, emailSigning, signUpError, stepIncrement, trigger]
  )
  /** For step 4, bind wallet */
  const handleBindWalletClick = React.useCallback(async () => {
    if (metamaskBinding) return
    try {
      setMetamaskBinding(true)
      if (signUpError) setSignUpError('')
      if (!account) return openWalletModal()
      const res = await walletBind()
      if (!res.isOk) return setSignUpError(res.error.message)
      setComplete(true)
    } finally {
      setMetamaskBinding(false)
    }
  }, [account, metamaskBinding, openWalletModal, signUpError, walletBind])
  const handleSkipBindWalletClick = React.useCallback(() => {
    if (signUpError) setSignUpError('')
    setComplete(true)
  }, [signUpError])

  return (
    <BasePageLayout className="md:py-192px md:mx-auto max-w-600px">
      <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
        {signUpError && (
          <Alert className="mb-24px" variant="filled" severity="error">
            {signUpError}
          </Alert>
        )}
        {isStep(0) && (
          <StepSignUp
            account={shortAccount}
            nextButtonDisabled={verifySending}
            metamaskButtonDisabled={metamaskSigning}
            onNextButtonSubmit={handleSubmit(handleEmailSignUpSubmit)}
            onMetamaskClick={handleMetamaskSignUpClick}
            onSignInClick={handleSignInClick}
          />
        )}
        {isStep(1) && (
          <StepVerifyYourEmail
            onNextButtonSubmit={handleSubmit(handleEmailVerifyCodeSubmit)}
            onResendClick={handleResendEmailVerifyCodeClick}
          />
        )}
        {isStep(2) && <StepChooseAUsername onNextButtonSubmit={handleSubmit(handleUsernameSubmit)} />}
        {isStep(3) && (
          <StepEnterPassword disabled={emailSigning} onNextButtonSubmit={handleSubmit(handlePasswordSubmit)} />
        )}
        {isStep(4) && (
          <StepConnectWallet
            account={shortAccount}
            metamaskButtonDisabled={metamaskBinding}
            onMetamaskClick={handleBindWalletClick}
            onSkipClick={handleSkipBindWalletClick}
          />
        )}
        {complete && <AccountSignUpComplete onCompleteClick={handleCompleteClick} />}
      </AccountPopup>
    </BasePageLayout>
  )
}
