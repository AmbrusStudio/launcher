import { useDeepCompareEffect } from 'ahooks'
import { isEqual, unionWith } from 'lodash'
import { useEffect, useState } from 'react'

import {
  E4CRanger_GoldEdition,
  E4CRanger_GoldEdition_Holder,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEdition_Holder,
} from '../contracts'
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
    setCollections((data) => unionWith(data, nftsGold, isEqual))
  }, [nftsGold])

  useDeepCompareEffect(() => {
    setCollections((data) => unionWith(data, nftsRangers, isEqual))
  }, [nftsRangers])

  useDeepCompareEffect(() => {
    setCollections((data) => unionWith(data, nftsImmutableXGold, isEqual))
  }, [nftsImmutableXGold])

  useDeepCompareEffect(() => {
    setCollections((data) => unionWith(data, nftsImmutableXRangers, isEqual))
  }, [nftsImmutableXRangers])

  return {
    collections,
    loading,
  }
}
