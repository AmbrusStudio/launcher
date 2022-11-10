import { Goerli } from '@usedapp/core'
import { useMemo } from 'react'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
  ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
  defaultChainId,
} from '../contracts'
import { useERC721ImmutableXListState, useERC721ListState } from './useERC721List'
import { useMetadataBaseURL } from './useMetadataBaseURL'

export function useUserStakeCollections() {
  const { metadadaGoldBaseURI, metadadaRangersBaseURI } = useMetadataBaseURL()

  const { nfts: nftsGold, loading: loadingGold } = useERC721ListState({
    holderAddress: ADDRESS_E4CRanger_Gold_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Gold_Edition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721ListState({
    holderAddress: ADDRESS_E4CRanger_Rangers_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Rangers_Edition,
    baseURL: metadadaRangersBaseURI,
  })

  // The ImmutableX test network address is inconsistent, and additional query is required
  // Cannot pledge without holder
  const { nfts: nftsGoldImmutableX, loading: loadingGoldImmutableX } = useERC721ListState({
    holderAddress: defaultChainId === Goerli.chainId ? ADDRESS_E4CRanger_Gold_Holder : undefined,
    tokenAddress: defaultChainId === Goerli.chainId ? ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition : undefined,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsRangersImmutableX, loading: loadingRangersImmutableX } = useERC721ListState({
    holderAddress: defaultChainId === Goerli.chainId ? ADDRESS_E4CRanger_Rangers_Holder : undefined,
    tokenAddress: defaultChainId === Goerli.chainId ? ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition : undefined,
    baseURL: metadadaRangersBaseURI,
  })

  const { nfts: nftsImmutableXGold, loading: loadingImmutableXGold } = useERC721ImmutableXListState({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsImmutableXRangers, loading: loadingImmutableXRangers } = useERC721ImmutableXListState({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
    baseURL: metadadaRangersBaseURI,
  })

  const nfts = useMemo(
    () => [
      ...nftsGold,
      ...nftsGoldImmutableX,
      ...nftsRangers,
      ...nftsRangersImmutableX,
      ...nftsImmutableXGold,
      ...nftsImmutableXRangers,
    ],
    [nftsGold, nftsGoldImmutableX, nftsRangers, nftsRangersImmutableX, nftsImmutableXGold, nftsImmutableXRangers]
  )
  const loading = useMemo(() => {
    return (
      loadingGold &&
      loadingGoldImmutableX &&
      loadingRangers &&
      loadingRangersImmutableX &&
      loadingImmutableXGold &&
      loadingImmutableXRangers
    )
  }, [
    loadingGold,
    loadingGoldImmutableX,
    loadingRangers,
    loadingRangersImmutableX,
    loadingImmutableXGold,
    loadingImmutableXRangers,
  ])

  return {
    collections: nfts,
    loading,
  }
}
