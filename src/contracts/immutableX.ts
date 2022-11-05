import { Goerli, Mainnet } from '@usedapp/core'

import { getDefaultChainId } from '../utils'

export const defaultChainId = getDefaultChainId()

// ImmutableX Goerli.chainId instead of ethNetwork: "goerli"

// ImmutableX Holder
export const ADDRESS_ImmutableX_Holders = {
  [Mainnet.chainId]: '0xE4CdfD21b1Eb96650FF1acde35276D9da579070C',
  [Goerli.chainId]: '0xE4CdfD21b1Eb96650FF1acde35276D9da579070C',
}
export const ADDRESS_ImmutableX_Holder = ADDRESS_ImmutableX_Holders[defaultChainId]

// E4C Ranger Gold Edition - ImmutableX
export const ADDRESS_ImmutableX_E4C_Ranger_Gold_Editions = {
  [Mainnet.chainId]: '0xba265b93519e6473f34f46ee35f4b23970f41a3f',
  [Goerli.chainId]: '0xbf206014a878df4153036d7895188e340527a8f0',
}
export const ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition = ADDRESS_ImmutableX_E4C_Ranger_Gold_Editions[defaultChainId]

// E4C Ranger Rangers Edition - ImmutableX
export const ADDRESS_ImmutableX_E4C_Ranger_Rangers_Editions = {
  [Mainnet.chainId]: '0xC17Aa29c43e4cE0c349749C8986a03B2734813fa',
  [Goerli.chainId]: '0x714a090f35a1f1fc9baa65059b28939dd0f5a196',
}
export const ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition =
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Editions[defaultChainId]
