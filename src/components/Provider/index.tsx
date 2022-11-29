import { ImmutableXClient, Link, LinkResults } from '@imtbl/imx-sdk'
import { DAppProvider } from '@usedapp/core'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import useLocalStorageState from 'use-local-storage-state'

import { LSK_IMX_WALLET_INFO } from '../../constants'
import { AccountAvatarInfoContext, ImmutableXWalletContext } from '../../context'
import { DAPP_CONFIG } from '../../contracts'
import { persistor, store } from '../../store/index'
import { AccountAvatarInfo } from '../../types'
import { getViteEnv } from '../../utils'

type ProvidersProps = {
  children: React.ReactNode
}

const linkUrl = getViteEnv('VITE_IMX_LINK_URL')
const publicApiUrl = getViteEnv('VITE_IMX_API_URL')

function ImmutableXWalletProvider({ children }: ProvidersProps) {
  const imxLink = React.useMemo(() => new Link(linkUrl), [])
  const [imxClient, setImxClient] = React.useState<ImmutableXClient>()
  const [walletInfo, setWalletInfo, { removeItem }] = useLocalStorageState<LinkResults.Setup>(LSK_IMX_WALLET_INFO)

  const buildIMXClient = React.useCallback(async () => {
    const imxClient = await ImmutableXClient.build({ publicApiUrl })
    setImxClient(imxClient)
  }, [])

  const walletLogin = React.useCallback(async () => {
    const _walletInfo = await imxLink.setup({})
    if (!_walletInfo) return
    setWalletInfo(_walletInfo)
  }, [imxLink, setWalletInfo])

  const walletLogout = React.useCallback(async () => {
    removeItem()
  }, [removeItem])

  React.useEffect(() => {
    buildIMXClient()
  }, [buildIMXClient])

  return (
    <ImmutableXWalletContext.Provider value={{ imxLink, imxClient, walletInfo, walletLogin, walletLogout }}>
      {children}
    </ImmutableXWalletContext.Provider>
  )
}

function AccountAvatarInfoProvider({ children }: ProvidersProps) {
  const [avatarInfo, setAvatarInfo] = React.useState<AccountAvatarInfo | 'default'>('default')
  const handleSetAvatarInfo = React.useCallback((info: AccountAvatarInfo | 'default') => setAvatarInfo(info), [])

  return (
    <AccountAvatarInfoContext.Provider value={{ avatarInfo, setAvatarInfo: handleSetAvatarInfo }}>
      {children}
    </AccountAvatarInfoContext.Provider>
  )
}

export function Provider({ children }: ProvidersProps) {
  const formMethods = useForm()
  return (
    <DAppProvider config={DAPP_CONFIG}>
      <FormProvider {...formMethods}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ImmutableXWalletProvider>
              <AccountAvatarInfoProvider>
                <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
              </AccountAvatarInfoProvider>
            </ImmutableXWalletProvider>
          </PersistGate>
        </ReduxProvider>
      </FormProvider>
    </DAppProvider>
  )
}
