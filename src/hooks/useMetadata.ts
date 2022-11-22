import { Falsy } from '@usedapp/core'
import { useDeepCompareEffect } from 'ahooks'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { metadataApi } from '../api/metadata'
import { defaultChainId } from '../contracts'
import { RootState } from '../store'
import { MetadataResponse, TokenMetadata } from '../types'
import { buildMetadataInformation } from '../utils'

/**
 * useMetadata
 * metadata
 * ALL Edition
 * Gold Trait 14
 * Rangers Trait 15(one more "Particles" trait)
 * @returns
 */
export function useMetadata() {
  const metadadaGoldEdition = useSelector((state: RootState) => state.metadata.GoldEdition[defaultChainId])
  const metadadaRangersEdition = useSelector((state: RootState) => state.metadata.RangersEdition[defaultChainId])
  const metadadaUltimateEdition = useSelector((state: RootState) => state.metadata.UltimateEdition[defaultChainId])

  const metadataImmutableXGoldEdition = useSelector(
    (state: RootState) => state.metadataImmutableX.GoldEdition[defaultChainId]
  )
  const metadataImmutableXRangersEdition = useSelector(
    (state: RootState) => state.metadataImmutableX.RangersEdition[defaultChainId]
  )

  const GoldEditionLoading = useSelector((state: RootState) => state.metadata.GoldEditionLoading)
  const RangersEditionLoading = useSelector((state: RootState) => state.metadata.RangersEditionLoading)
  const UltimateEditionLoading = useSelector((state: RootState) => state.metadata.UltimateEditionLoading)

  const GoldEditionLoadingImmutableX = useSelector((state: RootState) => state.metadataImmutableX.GoldEditionLoading)
  const RangersEditionLoadingImmutableX = useSelector(
    (state: RootState) => state.metadataImmutableX.RangersEditionLoading
  )

  const metadataAllEdition = useMemo<TokenMetadata[]>(
    () => [
      ...metadadaUltimateEdition.metadata,
      ...metadadaGoldEdition.metadata,
      ...metadadaRangersEdition.metadata,
      ...metadataImmutableXGoldEdition.metadata,
      ...metadataImmutableXRangersEdition.metadata,
    ],
    [
      metadadaGoldEdition,
      metadadaRangersEdition,
      metadadaUltimateEdition,
      metadataImmutableXGoldEdition,
      metadataImmutableXRangersEdition,
    ]
  )

  const loading = useMemo<boolean>(
    () =>
      GoldEditionLoading &&
      RangersEditionLoading &&
      UltimateEditionLoading &&
      GoldEditionLoadingImmutableX &&
      RangersEditionLoadingImmutableX,
    [
      GoldEditionLoading,
      RangersEditionLoading,
      UltimateEditionLoading,
      GoldEditionLoadingImmutableX,
      RangersEditionLoadingImmutableX,
    ]
  )

  return {
    metadadaGoldEdition,
    metadadaRangersEdition,
    metadataAllEdition,
    loading,
  }
}

export function useMetadataByTokenIds({
  address,
  tokenIds,
  baseURL,
}: {
  address: string | Falsy
  tokenIds: string[]
  baseURL: string
}) {
  const [metadata, setMetadata] = useState<Map<string, TokenMetadata>>(new Map())
  const [loading, setLoading] = useState<boolean>(false)

  const getMetadataByTokenIds = useCallback(async (address: string | Falsy, tokenIds: string[], baseURL: string) => {
    try {
      setLoading(true)
      setMetadata(new Map())

      if (!address) {
        return
      }

      const promiseAllArray = tokenIds.map((tokenId) =>
        metadataApi<MetadataResponse>({
          url: baseURL,
          tokenId: tokenId,
        })
      )

      const response = await Promise.allSettled(promiseAllArray)

      const data = new Map()
      response.forEach((item, index) => {
        if (item.status === 'fulfilled' && item.value.status === 200) {
          data.set(tokenIds[index], buildMetadataInformation(item.value.data, address, tokenIds[index]))
        }
      })

      setMetadata(data)
    } catch (error) {
      console.error(error)
      setMetadata(new Map())
    } finally {
      setLoading(false)
    }
  }, [])

  useDeepCompareEffect(() => {
    getMetadataByTokenIds(address, tokenIds, baseURL)
  }, [baseURL, tokenIds])

  return {
    metadata,
    loading,
  }
}
