import { Config as DAppConfig, Goerli, Mainnet } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Network } from 'alchemy-sdk'

import { getDefaultChainId, getViteEnv } from '../utils'
export * from './immutableX'

export const defaultChainId = getDefaultChainId()

// Support chainId
const SUPPORT_CHAIN_ID = {
  [Mainnet.chainId]: Mainnet.chainId,
  [Goerli.chainId]: Goerli.chainId,
}

if (!SUPPORT_CHAIN_ID[defaultChainId]) {
  throw new Error(`This chain is not supported. chainID: ${defaultChainId}`)
}

// E4CRanger GoldEdition Holder
export const E4CRanger_GoldEdition_Holders = {
  [Mainnet.chainId]: '0x9c18beA91AE053397918410311dbB89295baE18b',
  [Goerli.chainId]: '0xE90547570ee95e6929A0DF0434FF9b5fC8050B6E',
}
export const E4CRanger_GoldEdition_Holder = E4CRanger_GoldEdition_Holders[defaultChainId]

// E4CRanger RangersEdition Holder
export const E4CRanger_RangersEdition_Holders = {
  [Mainnet.chainId]: '0xAdf4343f4E8eB6Faf88c06A97ed6e0c229566E1d',
  [Goerli.chainId]: '0x5f9f4D516F24b47A6d233f11Be32Ebbfe115Cdb7',
}
export const E4CRanger_RangersEdition_Holder = E4CRanger_RangersEdition_Holders[defaultChainId]

// E4CRanger GoldEdition <Rin | Kit>
export const E4CRanger_GoldEditions = {
  [Mainnet.chainId]: '0xba265b93519e6473f34f46ee35f4b23970f41a3f',
  [Goerli.chainId]: '0x77dc43876D49382863297889dFa238c5f8b74020',
}
export const E4CRanger_GoldEdition = E4CRanger_GoldEditions[defaultChainId]

// E4CRanger RangersEdition <Rin | Kit>
export const E4CRanger_RangersEditions = {
  [Mainnet.chainId]: '0xC17Aa29c43e4cE0c349749C8986a03B2734813fa',
  [Goerli.chainId]: '0xB6D62797468E7ec16e57229e79501e551970c841',
}
export const E4CRanger_RangersEdition = E4CRanger_RangersEditions[defaultChainId]

// E4CRanger UltimateEdition <Rin | Kit>
export const E4CRanger_UltimateEditions = {
  [Mainnet.chainId]: '0xeb05CB1c82ACC87Ad8E0bB7927a1dc39Cd300402',
  [Goerli.chainId]: '0x1243F6c819265d58d7c9424d50DF42d047832fB3',
}
export const E4CRanger_UltimateEdition = E4CRanger_UltimateEditions[defaultChainId]

// Alchemy Network Config
export const ALCHEMY_NETWORKS = {
  [Mainnet.chainId]: Network.ETH_MAINNET,
  [Goerli.chainId]: Network.ETH_GOERLI,
}
export const ALCHEMY_NETWORK = ALCHEMY_NETWORKS[defaultChainId]

// opensea.io
export const OPENSEA_URLS = {
  [Mainnet.chainId]: 'https://opensea.io/collection/e4crangersgold',
  [Goerli.chainId]: 'https://opensea.io/collection/e4crangersgold',
}
export const OPENSEA_URL = OPENSEA_URLS[defaultChainId]

// Web3Modal providerOptions
const infuraId = getViteEnv('VITE_INFURA_API_KEY')
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
    options: { bridge: 'https://bridge.walletconnect.org', infuraId },
  },
}

// DAPP Config
const DAPP_CONFIG_URLS = {
  [Mainnet.chainId]: 'https://mainnet.infura.io/v3/' + infuraId,
  [Goerli.chainId]: 'https://goerli.infura.io/v3/' + infuraId,
}

export const DAPP_CONFIG: DAppConfig = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: DAPP_CONFIG_URLS,
}
