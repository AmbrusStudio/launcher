import { shortenIfAddress, useEthers } from '@usedapp/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { AccountMyAccountInfo, AccountMyAvatar, AccountMyWallet, AccountTitie } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { useAccountInfo, useEmailAccount, useMetamaskAccount, useSnackbarTR, useWeb3Modal } from '../../../hooks'
import { AccountAvatarInfo, AccountInfoFormData } from '../../../types'

const demoData: AccountAvatarInfo[] = [
  { id: 1, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 2, image: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 3, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 4, image: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 5, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 6, image: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 7, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 8, image: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 9, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 10, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 11, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 12, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 13, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 14, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 15, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 16, image: 'https://i.imgur.com/OJGH11v.png' },
  { id: 17, image: 'https://i.imgur.com/OJGH11v.png' },
]

export function Settings() {
  const { setValue, reset, handleSubmit } = useFormContext<AccountInfoFormData>()
  const { account } = useEthers()
  const { connect } = useWeb3Modal()
  const { walletBind, walletUnbind } = useMetamaskAccount()
  const { emailUpdatePassword } = useEmailAccount()
  const { account: userInfo, expired: sessionExpired } = useAccountInfo()
  const showSnackbar = useSnackbarTR()

  const [updateSending, setUpdateSending] = React.useState(false)
  const [selectedAvatar, setSelectedAvatar] = React.useState<AccountAvatarInfo>()
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
      if (!account) return connect()
      const res = await walletBind()
      if (!res.isOk) return showSnackbar(res.error.message, 'error')
    } finally {
      setMetamaskBinding(false)
    }
  }, [account, connect, metamaskBinding, showSnackbar, walletBind])
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

  const handleAvatarSelect = React.useCallback(async (avatar: AccountAvatarInfo) => {
    console.log('handleAvatarSelect', avatar)
    setSelectedAvatar(avatar)
  }, [])

  React.useEffect(() => {
    if (userInfo?.username) {
      setValue('username', userInfo.username)
    }
    const selectedAvatar = demoData.find((a) => a.id === 2)
    setSelectedAvatar(selectedAvatar)
  }, [setValue, userInfo?.username])

  return (
    <React.Fragment>
      {sessionExpired && <Navigate to="/account/signin" replace={true} />}
      <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
        <AccountTitie subtitle="Management" />
        <div className="grid grid-cols-1 xl:grid-cols-[600px_1fr] gap-36px">
          <AccountMyAccountInfo disabled={updateSending} onSaveButtonSubmit={handleSubmit(handleSaveButtonSubmit)} />
          <AccountMyAvatar data={demoData} selected={selectedAvatar} onAvatarSelect={handleAvatarSelect} />
        </div>
        <AccountMyWallet
          bindAccount={shortenIfAddress(userInfo?.wallet)}
          walletAccount={shortenIfAddress(account)}
          metamaskButtonDisabled={metamaskBinding}
          disconnectButtonDisabled={metamaskBinding}
          onMetamaskClick={handleBindWalletClick}
          onDisconnectClick={handleUnbindWalletClick}
        />
      </AccountCenterPageLayout>
    </React.Fragment>
  )
}
