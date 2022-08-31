import React from 'react'

import { AccountTitie, MyWallet } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'

export function Settings() {
  const [account, setAccount] = React.useState<string>()

  const handleBindWalletClick = React.useCallback(async () => {
    setAccount('0x8000…2E417')
  }, [])
  const handleUnbindWalletClick = React.useCallback(async () => {
    setAccount(undefined)
  }, [])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitie subtitle="Management" />
      <MyWallet account={account} onMetamaskClick={handleBindWalletClick} onDisconnectClick={handleUnbindWalletClick} />
    </AccountCenterPageLayout>
  )
}
