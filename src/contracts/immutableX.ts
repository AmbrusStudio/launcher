import { Goerli, Mainnet } from '@usedapp/core'

import { getDefaultChainId } from '../utils'

export const defaultChainId = getDefaultChainId()

// ImmutableX Goerli.chainId instead of ethNetwork: "goerli"

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
