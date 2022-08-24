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
import WalletModal from '../../../components/WalletModal'
import { useMetamaskAccount } from '../../../hooks'
import { AccountSignUpFormData, StepInfo } from '../../../types'

type StepSignUpProps = AccountEmailAndAgreementProps & {
  account: string
  metamaskButtonDisabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSignInClick: React.MouseEventHandler<HTMLButtonElement>
}

function StepSignUp(props: StepSignUpProps) {
  const { account, metamaskButtonDisabled = false, onNextButtonSubmit, onMetamaskClick, onSignInClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountEmailAndAgreement onNextButtonSubmit={onNextButtonSubmit} />
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
  const { walletLogin, walletBind } = useMetamaskAccount()
  const { watch, trigger, handleSubmit } = useFormContext<AccountSignUpFormData>()

  const shortAccount = shortenIfAddress(account)

  const [step, setStep] = React.useState(0)
  const [openWalletModal, setOpenWalletModal] = React.useState(false)
  const [complete, setComplete] = React.useState(false)
  const [signUpError, setSignUpError] = React.useState('')
  const [metamaskBinding, setMetamaskBinding] = React.useState(false)
  const [metamaskSigning, setMetamaskSigning] = React.useState(false)

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
      if (!account && !openWalletModal) return setOpenWalletModal(true)
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
      console.log('handleEmailSignUpSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )
  /** For step 1, verify email with 6 digits code. */
  const handleEmailVerifyCodeSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      const check = await trigger('verifyCode')
      if (!check) return
      console.log('handleEmailVerifyCodeSubmit', data)
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 2, set an username. */
  const handleUsernameSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      const check = await trigger('username')
      if (!check) return
      console.log('handleUsernameSubmit', data)
      stepIncrement()
    },
    [stepIncrement, trigger]
  )
  /** For step 3, set a password */
  const handlePasswordSubmit = React.useCallback(
    async (data: AccountSignUpFormData) => {
      console.log('handlePasswordSubmit', data)
      stepIncrement()
    },
    [stepIncrement]
  )
  /** For step 4, bind wallet */
  const handleBindWalletClick = React.useCallback(async () => {
    if (metamaskBinding) return
    try {
      setMetamaskBinding(true)
      if (signUpError) setSignUpError('')
      if (!account && !openWalletModal) return setOpenWalletModal(true)
      const res = await walletBind()
      if (!res.isOk) return setSignUpError(res.error.message)
      setComplete(true)
    } finally {
      setMetamaskBinding(false)
    }
  }, [account, metamaskBinding, openWalletModal, signUpError, walletBind])
  const handleSkipBindWalletClick = React.useCallback(() => {
    setComplete(true)
  }, [])

  React.useEffect(() => {
    // TODO: remove before prodction
    const subscription = watch((value, { name, type }) => console.log('watch', name, type, value))
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <main id="main">
      <div className="md:py-192px md:mx-auto max-w-600px">
        <AccountPopup title={title} showBack={navBack} onNavBackClick={handleNavBackClick}>
          {signUpError && (
            <Alert className="mb-24px" variant="filled" severity="error">
              {signUpError}
            </Alert>
          )}
          {isStep(0) && (
            <StepSignUp
              account={shortAccount}
              metamaskButtonDisabled={metamaskSigning}
              onNextButtonSubmit={handleSubmit(handleEmailSignUpSubmit)}
              onMetamaskClick={handleMetamaskSignUpClick}
              onSignInClick={handleSignInClick}
            />
          )}
          {isStep(1) && <StepVerifyYourEmail onNextButtonSubmit={handleSubmit(handleEmailVerifyCodeSubmit)} />}
          {isStep(2) && <StepChooseAUsername onNextButtonSubmit={handleSubmit(handleUsernameSubmit)} />}
          {isStep(3) && <StepEnterPassword onNextButtonSubmit={handleSubmit(handlePasswordSubmit)} />}
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
      </div>
      <WalletModal visible={openWalletModal} setVisible={setOpenWalletModal} />
    </main>
  )
}
