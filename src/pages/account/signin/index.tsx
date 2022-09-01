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
import { BasePageLayout } from '../../../components/Layout'
import { useEmailAccount, useMetamaskAccount, useOpenGameClient, useQuery, useWeb3Modal } from '../../../hooks'
import { AccountForgotPasswordFormData, AccountSignInFormData, EmailVerificationTypes, StepInfo } from '../../../types'

type StepSignInProps = AccountUsernameAndPasswordProps & {
  account: string
  nextButtonDisabled?: boolean
  metamaskButtonDisabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignUpClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepSignIn(props: StepSignInProps) {
  const { account, nextButtonDisabled = false, metamaskButtonDisabled = false } = props
  const { onMetamaskClick, onSignUpClick, onFogotPasswordClick, onNextButtonSubmit } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountUsernameAndPassword
        disabled={nextButtonDisabled}
        onFogotPasswordClick={onFogotPasswordClick}
        onNextButtonSubmit={onNextButtonSubmit}
      />
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
  const { handleSubmit: handleFogotPasswordSubmit } = useFormContext<AccountForgotPasswordFormData>()
  const { account } = useEthers()
  const { openGameClient } = useOpenGameClient()
  const { connect } = useWeb3Modal()
  const { walletLogin } = useMetamaskAccount()
  const { emailLogin, emailSendVerification, emailVerifyVerification, emailResetPassword } = useEmailAccount()

  const shortAccount = shortenIfAddress(account)

  const client = query.get('client')
  const [wallet] = React.useState(!!client)
  const [step, setStep] = React.useState(0)
  const [complete, setComplete] = React.useState(false)
  const [signInError, setSignInError] = React.useState('')
  const [metamaskSigning, setMetamaskSigning] = React.useState(false)
  const [emailSigning, setEmailSigning] = React.useState(false)
  const [verifySending, setVerifySending] = React.useState(false)
  const [resetSending, setResetSending] = React.useState(false)

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
      if (!account) return await connect()
      const res = await walletLogin()
      if (!res.isOk) return setSignInError(res.error.message)
      if (wallet) openGameClient({ path: `accessToken=${res.data.accessToken}` }, 1000)
      setComplete(true)
    } finally {
      setMetamaskSigning(false)
    }
  }, [account, connect, metamaskSigning, openGameClient, signInError, wallet, walletLogin])

  const handleNormalSignInSubmit = React.useCallback(
    async (data: AccountSignInFormData) => {
      if (emailSigning) return
      try {
        setEmailSigning(true)
        if (signInError) setSignInError('')
        const res = await emailLogin(data.email, data.password)
        if (!res.isOk) return setSignInError(res.error.message)
        setComplete(true)
      } finally {
        setEmailSigning(false)
      }
    },
    [emailLogin, emailSigning, signInError]
  )

  /** For step 1, send email for verify user can reset password. */
  const handleSendEmailSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      if (!data.email || verifySending) return
      try {
        setVerifySending(true)
        if (signInError) setSignInError('')
        const res = await emailSendVerification(EmailVerificationTypes.Recovery, data.email)
        if (!res.isOk) return setSignInError(res.error.message)
        stepIncrement()
      } finally {
        setVerifySending(false)
      }
    },
    [emailSendVerification, signInError, stepIncrement, verifySending]
  )
  /** For step 2, verify email with 6 digits code. */
  const handleEmailVerifyCodeSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      if (!data.verifyCode || verifySending) return
      try {
        setVerifySending(true)
        if (signInError) setSignInError('')
        const res = await emailVerifyVerification(data.verifyCode, data.email)
        if (!res.isOk) return setSignInError(res.error.message)
        stepIncrement()
      } finally {
        setVerifySending(false)
      }
    },
    [emailVerifyVerification, signInError, stepIncrement, verifySending]
  )
  /** For step 3, set a new password */
  const handleNewPasswordSubmit = React.useCallback(
    async (data: AccountForgotPasswordFormData) => {
      if (!data.password || resetSending) return
      try {
        setResetSending(true)
        if (signInError) setSignInError('')
        const res = await emailResetPassword(data.verifyCode, data.email, data.password)
        if (!res.isOk) return setSignInError(res.error.message)
        stepIncrement()
      } finally {
        setResetSending(false)
      }
    },
    [emailResetPassword, resetSending, signInError, stepIncrement]
  )

  return (
    <BasePageLayout className="md:py-192px md:mx-auto max-w-600px">
      <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
        {signInError && (
          <Alert className="mb-24px" variant="filled" severity="error">
            {signInError}
          </Alert>
        )}
        {isStep(0) && (
          <StepSignIn
            account={shortAccount}
            nextButtonDisabled={emailSigning}
            metamaskButtonDisabled={metamaskSigning}
            onNextButtonSubmit={handleSignInSubmit(handleNormalSignInSubmit)}
            onFogotPasswordClick={handleNextClick}
            onMetamaskClick={handleMetamaskSignInClick}
            onSignUpClick={handleSignUpClick}
          />
        )}
        {isStep(1) && (
          <StepForgotPassword
            disabled={verifySending}
            onNextButtonSubmit={handleFogotPasswordSubmit(handleSendEmailSubmit)}
          />
        )}
        {isStep(2) && (
          <StepVerifyEmail
            nextButtonDisabled={verifySending}
            onNextButtonSubmit={handleFogotPasswordSubmit(handleEmailVerifyCodeSubmit)}
          />
        )}
        {isStep(3) && (
          <StepResetPassword
            disabled={resetSending}
            onNextButtonSubmit={handleFogotPasswordSubmit(handleNewPasswordSubmit)}
          />
        )}
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
    </BasePageLayout>
  )
}
