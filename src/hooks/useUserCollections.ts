import { useDeepCompareEffect } from 'ahooks'
import { useEffect, useState } from 'react'

import {
  E4CRanger_GoldEdition,
  E4CRanger_GoldEdition_Holder,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEdition_Holder,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { mergedCollections } from '../tools'
import { NFTE4CRanger } from '../types'
import { useERC721ImmutableXList, useERC721List, useERC721UltimateEditionList } from './useERC721List'
import { useMetadataBaseURL } from './useMetadataBaseURL'

export function useUserCollections() {
  const { metadadaGoldBaseURI, metadadaRangersBaseURI, metadadaUltimateBaseURI } = useMetadataBaseURL()
  const [loading, setLoading] = useState<boolean>(false)
  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

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

  const { nfts: nftsImmutableX, loading: loadingImmutableX } = useERC721ImmutableXList()

  useEffect(() => {
    setLoading(loadingGold && loadingRangers && loadingUltimate && loadingImmutableX)
  }, [loadingGold, loadingRangers, loadingUltimate, loadingImmutableX])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsGold))
  }, [nftsGold])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsRangers))
  }, [nftsRangers])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsUltimate))
  }, [nftsUltimate])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsImmutableX))
  }, [nftsImmutableX])

  return {
    collections,
    loading,
  }
}
