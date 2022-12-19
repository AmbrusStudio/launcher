import { Goerli, Mainnet } from '@usedapp/core'

import { getDefaultChainId } from '../utils'

const defaultChainId = getDefaultChainId()

// ImmutableX Goerli.chainId instead of ethNetwork: "goerli"

// E4CRanger Holder - ImmutableX
export const E4CRanger_ImmutableX_Holders = {
  [Mainnet.chainId]: '0xE4CdfD21b1Eb96650FF1acde35276D9da579070C',
  [Goerli.chainId]: '0xE4CdfD21b1Eb96650FF1acde35276D9da579070C',
}
export const E4CRanger_ImmutableX_Holder = E4CRanger_ImmutableX_Holders[defaultChainId]

// E4CRanger GoldEdition <Rin | Kit> - ImmutableX
export const E4CRanger_ImmutableX_GoldEditions = {
  [Mainnet.chainId]: '0xba265b93519e6473f34f46ee35f4b23970f41a3f',
  [Goerli.chainId]: '0xbf206014a878df4153036d7895188e340527a8f0',
}
export const E4CRanger_ImmutableX_GoldEdition = E4CRanger_ImmutableX_GoldEditions[defaultChainId]

// E4CRanger RangersEdition <Rin | Kit> - ImmutableX
export const E4CRanger_ImmutableX_RangersEditions = {
  [Mainnet.chainId]: '0xC17Aa29c43e4cE0c349749C8986a03B2734813fa',
  [Goerli.chainId]: '0x714a090f35a1f1fc9baa65059b28939dd0f5a196',
}
export const E4CRanger_ImmutableX_RangersEdition = E4CRanger_ImmutableX_RangersEditions[defaultChainId]

// E4CRanger Hive <Thorn> - ImmutableX
export const E4CRangerHive_ImmutableX_Thorns = {
  [Mainnet.chainId]: '',
  // [Goerli.chainId]: '0x2B79919A89fFA96d98Ac126Ff244A662F77FDC19',
  [Goerli.chainId]: '0xDfdeA040187CFD896BFaff154863466Dd0B68324',
}
export const E4CRangerHive_ImmutableX_Thorn = E4CRangerHive_ImmutableX_Thorns[defaultChainId]

// ImmutableX Withdraw
const ImmutableXWithdraws = {
  [Mainnet.chainId]: 'https://imxtools.io/withdrawal',
  [Goerli.chainId]: 'https://tools.immutable.com/link-reference/',
}
export const ImmutableXWithdraw = ImmutableXWithdraws[defaultChainId]
