import { Falsy } from '@usedapp/core'
import { useDeepCompareEffect } from 'ahooks'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { metadataApi } from '../api/metadata'
import { defaultChainId } from '../contracts'
import { RootState } from '../store'
import { Metadata, MetadataResponse, TokenMetadata } from '../types'
import { ImmutableXL2Overall } from '../types/immutableX'
import { buildMetadataInformation, getDefaultMetadataTrait } from '../utils'
import { useMetadataBaseURL } from './useMetadataBaseURL'

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

/**
 * useMetadataByTokenIds
 * @param param
 * @returns
 */
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
          // Blind box filling default data
          if (item.value.data.attributes.length <= 0) {
            item.value.data.attributes = getDefaultMetadataTrait(address, tokenIds[index])
          }
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

/**
 * useMetadataImmtableXByTokenIds
 * @param collections l2Overall
 * @returns
 */
export function useMetadataImmtableXByTokenIds(collections: ImmutableXL2Overall[]) {
  const [metadata, setMetadata] = useState<Map<string, Metadata>>(new Map())
  const [loading, setLoading] = useState<boolean>(false)

  const { getBaseURLByAddress } = useMetadataBaseURL()

  const getMetadataByTokenIds = useCallback(
    async (collections: ImmutableXL2Overall[]) => {
      try {
        setLoading(true)
        setMetadata(new Map())

        const promiseAllArray = collections.map((collection) => {
          const url = getBaseURLByAddress(collection.tokenAddress)
          if (!url) {
            return Promise.reject(new Error('not baseUrl'))
          }

          return metadataApi<MetadataResponse>({
            url,
            tokenId: collection.tokenId,
          })
        })

        const response = await Promise.allSettled(promiseAllArray)

        const data: Map<string, Metadata> = new Map()
        response.forEach((item, index) => {
          if (item.status === 'fulfilled' && item.value.status === 200) {
            const { tokenAddress, tokenId } = collections[index]

            // Blind box filling default data
            if (!item.value.data?.attributes || item.value.data.attributes.length <= 0) {
              item.value.data.attributes = getDefaultMetadataTrait(tokenAddress, tokenId)
            }
            const { name, description, image, attributes } = item.value.data
            data.set(tokenId, {
              name,
              description,
              image,
              trait: attributes || [],
            })
          }
        })

        setMetadata(data)
      } catch (error) {
        console.error(error)
        setMetadata(new Map())
      } finally {
        setLoading(false)
      }
    },
    [getBaseURLByAddress]
  )

  useDeepCompareEffect(() => {
    getMetadataByTokenIds(collections)
  }, [collections])

  return {
    metadata,
    loading,
  }
}
