import { shortenIfAddress } from '@usedapp/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AccountMyAccountInfo, AccountMyAvatar, AccountMyWallet } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'
import {
  useAccountInfo,
  useEmailAccount,
  useImmutableXAccount,
  useImmutableXWallet,
  useSnackbarTR,
} from '../../../hooks'
import { AccountAvatarInfo, AccountInfoFormData } from '../../../types'

export function Settings() {
  const { setValue, reset, handleSubmit } = useFormContext<AccountInfoFormData>()
  const { walletInfo, walletLogin: imxLogin } = useImmutableXWallet()
  const { walletBind, walletUnbind } = useImmutableXAccount()
  const { emailUpdatePassword } = useEmailAccount()
  const { account: userInfo } = useAccountInfo()
  const showSnackbar = useSnackbarTR()

  const [updateSending, setUpdateSending] = React.useState(false)
  const [selectedAvatar, setSelectedAvatar] = React.useState<AccountAvatarInfo | 'default'>('default')
  const [metamaskBinding, setMetamaskBinding] = React.useState(false)

  const handleSaveButtonSubmit = React.useCallback(
    async (data: AccountInfoFormData) => {
      if (updateSending) return
      try {
        setUpdateSending(true)
        const { oldPassword, newPassword } = data
        if (oldPassword && newPassword) {
          const res = await emailUpdatePassword(oldPassword, newPassword)
          if (!res.isOk) return showSnackbar(res.error.message, 'error')
          reset(
            { oldPassword: '', newPassword: '', confirmNewPassword: '' },
            { keepDirty: false, keepErrors: false, keepValues: false }
          )
        }
        showSnackbar('Update successful', 'success')
      } finally {
        setUpdateSending(false)
      }
    },
    [emailUpdatePassword, reset, showSnackbar, updateSending]
  )

  const handleBindWalletClick = React.useCallback(async () => {
    if (metamaskBinding) return
    try {
      setMetamaskBinding(true)
      if (!walletInfo) return await imxLogin()
      const res = await walletBind()
      if (!res.isOk) return showSnackbar(res.error.message, 'error')
    } finally {
      setMetamaskBinding(false)
    }
  }, [imxLogin, metamaskBinding, showSnackbar, walletBind, walletInfo])
  const handleUnbindWalletClick = React.useCallback(async () => {
    if (metamaskBinding) return
    try {
      setMetamaskBinding(true)
      const res = await walletUnbind()
      if (!res.isOk) return showSnackbar(res.error.message, 'error')
    } finally {
      setMetamaskBinding(false)
    }
  }, [metamaskBinding, showSnackbar, walletUnbind])

  const handleAvatarSelect = React.useCallback(async (avatar: AccountAvatarInfo | 'default') => {
    console.log('handleAvatarSelect', avatar)
    setSelectedAvatar(avatar)
  }, [])

  React.useEffect(() => {
    if (userInfo?.username) setValue('username', userInfo.username)
  }, [setValue, userInfo?.username])

  return (
    <AccountCenterPageLayout
      className="flex flex-col gap-24px xl:gap-36px"
      subtitle="Management"
      sessionExpiredNavigateTo="/account/signin"
    >
      <div className="flex flex-col-reverse md:grid md:grid-cols-[auto_1fr] gap-24px lg:gap-36px">
        <AccountMyAccountInfo disabled={updateSending} onSaveButtonSubmit={handleSubmit(handleSaveButtonSubmit)} />
        <AccountMyAvatar data={[]} selected={selectedAvatar} onAvatarSelect={handleAvatarSelect} />
      </div>
      <AccountMyWallet
        bindAccount={shortenIfAddress(userInfo?.wallet)}
        walletAccount={shortenIfAddress(walletInfo?.address)}
        metamaskButtonDisabled={metamaskBinding}
        disconnectButtonDisabled={metamaskBinding}
        onMetamaskClick={handleBindWalletClick}
        onDisconnectClick={handleUnbindWalletClick}
      />
    </AccountCenterPageLayout>
  )
}
