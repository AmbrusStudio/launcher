import { Falsy } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  defaultChainId,
  E4CRanger_GoldEdition,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { RootState } from '../store'
import { MetadataStatus, TokenMetadata } from '../types'

/**
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
