import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AccountMyAccountInfo, AccountMyAvatar, AccountMyWallet, AccountTitie } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'
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
  const { handleSubmit } = useFormContext<AccountInfoFormData>()

  const [updateSending, setUpdateSending] = React.useState(false)
  const [selectedAvatar, setSelectedAvatar] = React.useState<AccountAvatarInfo>()
  const [account, setAccount] = React.useState<string>()

  const handleSaveButtonSubmit = React.useCallback(
    async (data: AccountInfoFormData) => {
      if (updateSending) return
      try {
        setUpdateSending(true)
        console.log('handleSaveButtonSubmit', data)
      } finally {
        setUpdateSending(false)
      }
    },
    [updateSending]
  )

  const handleBindWalletClick = React.useCallback(async () => {
    setAccount('0x8000…2E417')
  }, [])
  const handleUnbindWalletClick = React.useCallback(async () => {
    setAccount(undefined)
  }, [])

  const handleAvatarSelect = React.useCallback(async (avatar: AccountAvatarInfo) => {
    console.log('handleAvatarSelect', avatar)
    setSelectedAvatar(avatar)
  }, [])

  React.useEffect(() => {
    const selectedAvatar = demoData.find((a) => a.id === 2)
    setSelectedAvatar(selectedAvatar)
  }, [])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitie subtitle="Management" />
      <div className="grid grid-cols-[600px_1fr] gap-36px">
        <AccountMyAccountInfo disabled={updateSending} onSaveButtonSubmit={handleSubmit(handleSaveButtonSubmit)} />
        <AccountMyAvatar data={demoData} selected={selectedAvatar} onAvatarSelect={handleAvatarSelect} />
      </div>
      <AccountMyWallet
        account={account}
        onMetamaskClick={handleBindWalletClick}
        onDisconnectClick={handleUnbindWalletClick}
      />
    </AccountCenterPageLayout>
  )
}
