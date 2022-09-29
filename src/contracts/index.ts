import { Config as DAppConfig, Goerli, Mainnet, Rinkeby } from '@usedapp/core'
import { Network } from 'alchemy-sdk'
import { getDefaultProvider } from 'ethers'

import { getDefaultChainId } from '../utils'

const defaultChainId = getDefaultChainId()

// Holder
export const ADDRESS_E4C_Rangers = {
  [Mainnet.chainId]: '',
  [Rinkeby.chainId]: '0x243A98FA4D9F277aF9C0D89BBf7661aF42Ae742f',
  [Goerli.chainId]: '0xE90547570ee95e6929A0DF0434FF9b5fC8050B6E',
}
export const ADDRESS_E4C_Ranger = ADDRESS_E4C_Rangers[defaultChainId]

// AmbrusStudioRanger
export const ADDRESS_ASRS = {
  [Mainnet.chainId]: '0x5e81f795EE26A4053F2DD04a5acF671B5f725618',
  [Rinkeby.chainId]: '0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8',
  [Goerli.chainId]: '0x77dc43876D49382863297889dFa238c5f8b74020',
}
export const ADDRESS_ASR = ADDRESS_ASRS[defaultChainId]

export const AlchemyNetworks = {
  [Mainnet.chainId]: Network.ETH_MAINNET,
  [Rinkeby.chainId]: Network.ETH_RINKEBY,
  [Goerli.chainId]: Network.ETH_GOERLI,
}
export const AlchemyNetwork = AlchemyNetworks[defaultChainId]

// opensea.io
export const OPENSEA_URLS = {
  [Mainnet.chainId]: 'https://opensea.io/collection/e4c',
  [Rinkeby.chainId]: 'https://opensea.io/collection/e4c',
  [Goerli.chainId]: 'https://opensea.io/collection/e4c',
}
export const OPENSEA_URL = OPENSEA_URLS[defaultChainId]

// DAPP Config
const DAPP_CONFIG_URLS = {
  [Mainnet.chainId]: getDefaultProvider('mainnet'),
  [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
  [Goerli.chainId]: getDefaultProvider('goerli'),
}

export const DAPP_CONFIG: DAppConfig = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: DAPP_CONFIG_URLS,
}
