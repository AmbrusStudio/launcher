import { Falsy } from '@usedapp/core'
import { useDeepCompareEffect } from 'ahooks'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { metadataApi } from '../api/metadata'
import {
  defaultChainId,
  E4CRanger_GoldEdition,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { RootState } from '../store'
import { MetadataResponse, MetadataStatus, TokenMetadata } from '../types'
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

  const metadataGold = useMemo<TokenMetadata[]>(
    () => [...metadadaGoldEdition.metadata, ...metadataImmutableXGoldEdition.metadata],
    [metadadaGoldEdition.metadata, metadataImmutableXGoldEdition.metadata]
  )
  const metadadaRangers = useMemo<TokenMetadata[]>(
    () => [...metadadaRangersEdition.metadata, ...metadataImmutableXRangersEdition.metadata],
    [metadadaRangersEdition.metadata, metadataImmutableXRangersEdition.metadata]
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

  /**
   * Get Metadata By Address
   * TODO Obtain on demand through the API interface
   * @param address
   * @returns
   */
  const getMetadataByAddress = useCallback(
    (address: string | Falsy, status: MetadataStatus): TokenMetadata[] => {
      if (!address) {
        return metadataAllEdition
      }

      if (status === MetadataStatus.Ethereum) {
        if (
          getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
          getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
        ) {
          return metadataGold
        } else if (
          getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
          getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
        ) {
          return metadadaRangers
        } else if (getAddress(address) === getAddress(E4CRanger_UltimateEdition)) {
          return metadadaUltimateEdition.metadata
        } else {
          console.error(`metadata not found, Ethereum status: ${status}`)
          return metadataAllEdition
        }
      } else if (status === MetadataStatus.ImmutableX) {
        if (getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)) {
          return metadataGold
        } else if (getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)) {
          return metadadaRangers
        } else {
          console.error(`metadata not found, ImmutableX status: ${status}`)
          return metadataAllEdition
        }
      } else {
        console.error(`metadata status not found, status: ${status}`)
        return metadataAllEdition
      }
    },
    [metadadaRangers, metadadaUltimateEdition.metadata, metadataAllEdition, metadataGold]
  )

  return {
    metadadaGoldEdition,
    metadadaRangersEdition,
    metadataAllEdition,
    loading,
    getMetadataByAddress,
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
