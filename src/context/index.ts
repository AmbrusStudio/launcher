import React from 'react'

type WalletModalContextValue = {
  openWalletModal: () => void
  closeWalletModal: () => void
}

export const WalletModalContext = React.createContext<WalletModalContextValue>({
  openWalletModal: () => void 0,
  closeWalletModal: () => void 0,
})
