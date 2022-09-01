import React from 'react'
import { useFormContext } from 'react-hook-form'

import { AccountMyAccountInfo, AccountMyWallet, AccountTitie } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { AccountInfoFormData } from '../../../types'

export function Settings() {
  const { handleSubmit } = useFormContext<AccountInfoFormData>()

  const [updateSending, setUpdateSending] = React.useState(false)
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

  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitie subtitle="Management" />
      <div className="grid grid-cols-[600px_1fr] gap-36px">
        <AccountMyAccountInfo disabled={updateSending} onSaveButtonSubmit={handleSubmit(handleSaveButtonSubmit)} />
      </div>
      <AccountMyWallet
        account={account}
        onMetamaskClick={handleBindWalletClick}
        onDisconnectClick={handleUnbindWalletClick}
      />
    </AccountCenterPageLayout>
  )
}
