import { Config as DAppConfig, Goerli, Mainnet, Rinkeby } from '@usedapp/core'
import { Network } from 'alchemy-sdk'
import { getDefaultProvider } from 'ethers'

import { getDefaultChainId } from '../utils'

const defaultChainId = getDefaultChainId()

// Gold E4CRangerHolder
export const ADDRESS_E4CRanger_Gold_Holders = {
  [Mainnet.chainId]: '0x9c18beA91AE053397918410311dbB89295baE18b',
  [Rinkeby.chainId]: '0x243A98FA4D9F277aF9C0D89BBf7661aF42Ae742f',
  [Goerli.chainId]: '0xE90547570ee95e6929A0DF0434FF9b5fC8050B6E',
}
export const ADDRESS_E4CRanger_Gold_Holder = ADDRESS_E4CRanger_Gold_Holders[defaultChainId]

// Rangers E4CRangerHolder
export const ADDRESS_E4CRanger_Rangers_Holders = {
  [Mainnet.chainId]: '0xAdf4343f4E8eB6Faf88c06A97ed6e0c229566E1d',
  [Rinkeby.chainId]: '',
  [Goerli.chainId]: '0x5f9f4D516F24b47A6d233f11Be32Ebbfe115Cdb7',
}
export const ADDRESS_E4CRanger_Rangers_Holder = ADDRESS_E4CRanger_Rangers_Holders[defaultChainId]

// E4C Ranger Gold Edition
export const ADDRESS_E4C_Ranger_Gold_Editions = {
  [Mainnet.chainId]: '0xba265b93519e6473f34f46ee35f4b23970f41a3f',
  [Rinkeby.chainId]: '0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8',
  [Goerli.chainId]: '0x77dc43876D49382863297889dFa238c5f8b74020',
}
export const ADDRESS_E4C_Ranger_Gold_Edition = ADDRESS_E4C_Ranger_Gold_Editions[defaultChainId]

// E4C Ranger Rangers Edition
export const ADDRESS_E4C_Ranger_Rangers_Editions = {
  [Mainnet.chainId]: '0xC17Aa29c43e4cE0c349749C8986a03B2734813fa',
  [Rinkeby.chainId]: '',
  [Goerli.chainId]: '0xB6D62797468E7ec16e57229e79501e551970c841',
}
export const ADDRESS_E4C_Ranger_Rangers_Edition = ADDRESS_E4C_Ranger_Rangers_Editions[defaultChainId]

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
