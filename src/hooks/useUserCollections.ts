import { useMemo } from 'react'

import {
  E4CRanger_GoldEdition,
  E4CRanger_GoldEdition_Holder,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEdition_Holder,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { useERC721ImmutableXList, useERC721List, useERC721UltimateEditionList } from './useERC721List'
import { useMetadataBaseURL } from './useMetadataBaseURL'

export function useUserCollections() {
  const { metadadaGoldBaseURI, metadadaRangersBaseURI, metadadaUltimateBaseURI } = useMetadataBaseURL()

  const { nfts: nftsUltimate, loading: loadingUltimate } = useERC721UltimateEditionList({
    tokenAddress: E4CRanger_UltimateEdition,
    baseURL: metadadaUltimateBaseURI,
  })

  const { nfts: nftsGold, loading: loadingGold } = useERC721List({
    holderAddress: E4CRanger_GoldEdition_Holder,
    tokenAddress: E4CRanger_GoldEdition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721List({
    holderAddress: E4CRanger_RangersEdition_Holder,
    tokenAddress: E4CRanger_RangersEdition,
    baseURL: metadadaRangersBaseURI,
  })

  const { nfts: nftsImmutableXGold, loading: loadingImmutableXGold } = useERC721ImmutableXList({
    collection: E4CRanger_ImmutableX_GoldEdition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsImmutableXRangers, loading: loadingImmutableXRangers } = useERC721ImmutableXList({
    collection: E4CRanger_ImmutableX_RangersEdition,
    baseURL: metadadaRangersBaseURI,
  })

  const nfts = useMemo(
    () => [...nftsUltimate, ...nftsGold, ...nftsRangers, ...nftsImmutableXGold, ...nftsImmutableXRangers],
    [nftsUltimate, nftsGold, nftsRangers, nftsImmutableXGold, nftsImmutableXRangers]
  )
  const loading = useMemo(
    () => loadingGold && loadingRangers && loadingUltimate && loadingImmutableXGold && loadingImmutableXRangers,
    [loadingGold, loadingRangers, loadingUltimate, loadingImmutableXGold, loadingImmutableXRangers]
  )

  return {
    collections: nfts,
    loading,
  }
}
