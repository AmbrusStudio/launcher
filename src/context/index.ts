import { ImmutableXClient, Link, LinkResults } from '@imtbl/imx-sdk'
import React from 'react'

import { AccountAvatarInfo } from '../types'

type WalletModalContextValue = {
  openWalletModal: () => void
  closeWalletModal: () => void
}

export const WalletModalContext = React.createContext<WalletModalContextValue>({
  openWalletModal: () => void 0,
  closeWalletModal: () => void 0,
})

type ImmutableXWalletContextValue = {
  imxLink: Link | undefined
  imxClient: ImmutableXClient | undefined
  walletInfo: LinkResults.Setup | undefined
  walletLogin: () => Promise<void>
  walletLogout: () => Promise<void>
}

export const ImmutableXWalletContext = React.createContext<ImmutableXWalletContextValue>({
  imxLink: undefined,
  imxClient: undefined,
  walletInfo: undefined,
  walletLogin: async () => void 0,
  walletLogout: async () => void 0,
})

type AccountAvatarInfoContextValue = {
  avatarInfo: AccountAvatarInfo | 'default'
  setAvatarInfo: (info: AccountAvatarInfo | 'default') => void
}

export const AccountAvatarInfoContext = React.createContext<AccountAvatarInfoContextValue>({
  avatarInfo: 'default',
  setAvatarInfo: () => void 0,
})
