import { DAppProvider } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { WalletModalContext } from '../../context'
import { DAPP_CONFIG } from '../../contracts'
import WalletModal from '../WalletModal'

type ProvidersProps = {
  children: React.ReactNode
}

/**
 * web3Modal providerOptions
 */
const infuraId: string | undefined = import.meta.env.VITE_INFURA_API_KEY
if (!infuraId) throw new TypeError('VITE_INFURA_API_KEY not set')
export const web3ModalProviderOptions = {
  injected: {
    display: {
      name: 'Metamask',
      description: 'Connect with the provider in your Browser',
    },
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      bridge: 'https://bridge.walletconnect.org',
      infuraId: infuraId,
    },
  },
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

export function Provider({ children }: ProvidersProps) {
  const formMethods = useForm()
  return (
    <DAppProvider config={DAPP_CONFIG}>
      <FormProvider {...formMethods}>
        <WalletModalProvider>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </WalletModalProvider>
      </FormProvider>
    </DAppProvider>
  )
}
