import { getAddress } from 'ethers/lib/utils'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4C_Ranger_Ultimate_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
  defaultChainId,
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
   * @param address
   * @returns
   */
  const getMetadataByAddress = useCallback(
    (address: string, status: MetadataStatus): TokenMetadata[] => {
      if (status === MetadataStatus.Ethereum) {
        if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
          return metadadaGoldEdition.metadata
        } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
          return metadadaRangersEdition.metadata
        } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Ultimate_Edition)) {
          return metadadaUltimateEdition.metadata
        } else {
          throw new Error(`metadata not found, Ethereum status: ${status}`)
        }
      } else if (status === MetadataStatus.ImmutableX) {
        if (getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)) {
          return metadataImmutableXGoldEdition.metadata
        } else if (getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)) {
          return metadataImmutableXRangersEdition.metadata
        } else {
          throw new Error(`metadata not found, ImmutableX status: ${status}`)
        }
      } else {
        throw new Error(`metadata status not found, status: ${status}`)
      }
    },
    [
      metadadaGoldEdition.metadata,
      metadadaRangersEdition.metadata,
      metadadaUltimateEdition.metadata,
      metadataImmutableXGoldEdition.metadata,
      metadataImmutableXRangersEdition.metadata,
    ]
  )

  return {
    metadadaGoldEdition,
    metadadaRangersEdition,
    metadataAllEdition,
    loading,
    getMetadataByAddress,
  }
}
