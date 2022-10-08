import { DAppProvider } from '@usedapp/core'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { WalletModalContext } from '../../context'
import { DAPP_CONFIG } from '../../contracts'
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
