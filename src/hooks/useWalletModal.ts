import React from 'react'

import { WalletModalContext } from '../context'

export function useWalletModal() {
  return React.useContext(WalletModalContext)
}
