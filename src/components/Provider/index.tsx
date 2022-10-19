import { Link, LinkResults } from '@imtbl/imx-sdk'
import { DAppProvider } from '@usedapp/core'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'

import { LSK_IMX_WALLET_INFO } from '../../constants'
import { ImmutableXWalletContext, WalletModalContext } from '../../context'
import { DAPP_CONFIG } from '../../contracts'
import { getViteEnv } from '../../utils'
import WalletModal from '../WalletModal'

type ProvidersProps = {
  children: React.ReactNode
}

function WalletModalProvider({ children }: ProvidersProps) {
  const [visible, setVisible] = React.useState(false)
  const openWalletModal = React.useCallback(() => {
    if (!visible) setVisible(true)
  }, [visible])
  const closeWalletModal = React.useCallback(() => {
    if (visible) setVisible(false)
  }, [visible])
  const contextValue = React.useRef({ openWalletModal, closeWalletModal })

  return (
    <WalletModalContext.Provider value={contextValue.current}>
      {children}
      <WalletModal visible={visible} onModalClose={closeWalletModal} />
    </WalletModalContext.Provider>
  )
}

const linkUrl = getViteEnv('VITE_IMX_LINK_URL')

function ImmutableXWalletProvider({ children }: ProvidersProps) {
  const imxLink = React.useMemo(() => new Link(linkUrl), [])
  const [walletInfo, setWalletInfo, { removeItem }] = useLocalStorageState<LinkResults.Setup>(LSK_IMX_WALLET_INFO)

  const walletLogin = React.useCallback(async () => {
    const _walletInfo = await imxLink.setup({})
    if (!_walletInfo) return
    setWalletInfo(_walletInfo)
  }, [imxLink, setWalletInfo])

  const walletLogout = React.useCallback(async () => {
    removeItem()
  }, [removeItem])

  return (
    <ImmutableXWalletContext.Provider value={{ imxLink, walletInfo, walletLogin, walletLogout }}>
      {children}
    </ImmutableXWalletContext.Provider>
  )
}

export function Provider({ children }: ProvidersProps) {
  const formMethods = useForm()
  return (
    <DAppProvider config={DAPP_CONFIG}>
      <FormProvider {...formMethods}>
        <WalletModalProvider>
          <ImmutableXWalletProvider>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
          </ImmutableXWalletProvider>
        </WalletModalProvider>
      </FormProvider>
    </DAppProvider>
  )
}
