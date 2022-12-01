import { useDeepCompareEffect } from 'ahooks'
import { useEffect, useState } from 'react'

import {
  E4CRanger_GoldEdition,
  E4CRanger_GoldEdition_Holder,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEdition_Holder,
} from '../contracts'
import { mergedCollections } from '../tools'
import { NFTE4CRanger } from '../types'
import { useERC721ImmutableXListState, useERC721ListState } from './useERC721List'
import { useMetadataBaseURL } from './useMetadataBaseURL'

export function useUserStakeCollections() {
  const { metadadaGoldBaseURI, metadadaRangersBaseURI } = useMetadataBaseURL()
  const [loading, setLoading] = useState<boolean>(false)
  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

  const { nfts: nftsGold, loading: loadingGold } = useERC721ListState({
    holderAddress: E4CRanger_GoldEdition_Holder,
    tokenAddress: E4CRanger_GoldEdition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721ListState({
    holderAddress: E4CRanger_RangersEdition_Holder,
    tokenAddress: E4CRanger_RangersEdition,
    baseURL: metadadaRangersBaseURI,
  })

  const { nfts: nftsImmutableXGold, loading: loadingImmutableXGold } = useERC721ImmutableXListState({
    collection: E4CRanger_ImmutableX_GoldEdition,
    baseURL: metadadaGoldBaseURI,
  })
  const { nfts: nftsImmutableXRangers, loading: loadingImmutableXRangers } = useERC721ImmutableXListState({
    collection: E4CRanger_ImmutableX_RangersEdition,
    baseURL: metadadaRangersBaseURI,
  })

  useEffect(() => {
    setLoading(loadingGold && loadingRangers && loadingImmutableXGold && loadingImmutableXRangers)
  }, [loadingGold, loadingRangers, loadingImmutableXGold, loadingImmutableXRangers])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsGold))
  }, [nftsGold])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsRangers))
  }, [nftsRangers])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsImmutableXGold))
  }, [nftsImmutableXGold])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsImmutableXRangers))
  }, [nftsImmutableXRangers])

  return {
    collections,
    loading,
  }
}
