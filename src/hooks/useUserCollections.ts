import { useMemo } from 'react'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4C_Ranger_Ultimate_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
  ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
} from '../contracts'
import { useERC721ImmutableXList, useERC721List, useERC721UltimateEditionList } from './useERC721List'

export function useUserCollections() {
  const { nfts: nftsUltimate, loading: loadingUltimate } = useERC721UltimateEditionList({
    tokenAddress: ADDRESS_E4C_Ranger_Ultimate_Edition,
  })

  const { nfts: nftsGold, loading: loadingGold } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Gold_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Rangers_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Rangers_Edition,
  })
  // The ImmutableX test network address is inconsistent, and additional query is required
  const { nfts: nftsGoldImmutableX, loading: loadingGoldImmutableX } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Gold_Holder,
    tokenAddress: ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsRangersImmutableX, loading: loadingRangersImmutableX } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Rangers_Holder,
    tokenAddress: ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
  })

  const { nfts: nftsImmutableXGold, loading: loadingImmutableXGold } = useERC721ImmutableXList({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsImmutableXRangers, loading: loadingImmutableXRangers } = useERC721ImmutableXList({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
  })

  const nfts = useMemo(
    () => [
      ...nftsUltimate,
      ...nftsGold,
      ...nftsGoldImmutableX,
      ...nftsRangers,
      ...nftsRangersImmutableX,
      ...nftsImmutableXGold,
      ...nftsImmutableXRangers,
    ],
    [
      nftsUltimate,
      nftsGold,
      nftsGoldImmutableX,
      nftsRangers,
      nftsImmutableXGold,
      nftsRangersImmutableX,
      nftsImmutableXRangers,
    ]
  )
  const loading = useMemo(
    () =>
      loadingGold &&
      loadingRangers &&
      loadingGoldImmutableX &&
      loadingRangersImmutableX &&
      loadingUltimate &&
      loadingImmutableXGold &&
      loadingImmutableXRangers,
    [
      loadingGold,
      loadingRangers,
      loadingGoldImmutableX,
      loadingRangersImmutableX,
      loadingUltimate,
      loadingImmutableXGold,
      loadingImmutableXRangers,
    ]
  )

  return {
    collections: nfts,
    loading,
  }
}
