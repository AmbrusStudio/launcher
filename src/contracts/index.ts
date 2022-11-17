import { Config as DAppConfig, Goerli, Mainnet } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Network } from 'alchemy-sdk'

import { E4CRangerNftKindChainMap, E4CRangerNftKindMap } from '../types'
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
  [Goerli.chainId]: '0x727391e6c9C06ED160C12c11bd766E835105DCa9',
}
export const E4CRanger_GoldEdition_Holder = E4CRanger_GoldEdition_Holders[defaultChainId]

// E4CRanger RangersEdition Holder
export const E4CRanger_RangersEdition_Holders = {
  [Mainnet.chainId]: '0xAdf4343f4E8eB6Faf88c06A97ed6e0c229566E1d',
  [Goerli.chainId]: '0x1D1a84B17ef6316a563C5DbE2311FC1A99854e0a',
}
export const E4CRanger_RangersEdition_Holder = E4CRanger_RangersEdition_Holders[defaultChainId]

// E4CRanger UltimateEdition <Rin | Kit>
export const E4CRanger_UltimateEditions = {
  [Mainnet.chainId]: '0xeb05CB1c82ACC87Ad8E0bB7927a1dc39Cd300402',
  [Goerli.chainId]: '0xc5252239C1211D6d8B46F26A107F498B15E129fF',
}
export const E4CRanger_UltimateEdition = E4CRanger_UltimateEditions[defaultChainId]

// E4CRanger GoldEdition <Rin | Kit>
export const E4CRanger_GoldEditions = {
  [Mainnet.chainId]: '0xbA265B93519E6473F34F46ee35F4B23970F41a3f',
  [Goerli.chainId]: '0xbF206014a878df4153036d7895188e340527a8f0',
}
export const E4CRanger_GoldEdition = E4CRanger_GoldEditions[defaultChainId]

// E4CRanger RangersEdition <Rin | Kit>
export const E4CRanger_RangersEditions = {
  [Mainnet.chainId]: '0xC17Aa29c43e4cE0c349749C8986a03B2734813fa',
  [Goerli.chainId]: '0x714a090F35a1f1fC9BAa65059b28939DD0F5A196',
}
export const E4CRanger_RangersEdition = E4CRanger_RangersEditions[defaultChainId]

// #region For account avatar use
export const E4CRanger_NftKindMap_Mainnet: E4CRangerNftKindMap = {
  [E4CRanger_UltimateEditions[Mainnet.chainId]]: 'ultimate',
  [E4CRanger_GoldEditions[Mainnet.chainId]]: 'gold',
  [E4CRanger_RangersEditions[Mainnet.chainId]]: 'rangers',
}

export const E4CRanger_NftKindMap_Goerli: E4CRangerNftKindMap = {
  [E4CRanger_UltimateEditions[Goerli.chainId]]: 'ultimate',
  [E4CRanger_GoldEditions[Goerli.chainId]]: 'gold',
  [E4CRanger_RangersEditions[Goerli.chainId]]: 'rangers',
}

export const E4CRanger_NftKindChainMap: E4CRangerNftKindChainMap = {
  [Mainnet.chainId]: E4CRanger_NftKindMap_Mainnet,
  [Goerli.chainId]: E4CRanger_NftKindMap_Goerli,
}

export const E4CRanger_NftKindMap: E4CRangerNftKindMap = E4CRanger_NftKindChainMap[defaultChainId]
// #endregion For account avatar use

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
