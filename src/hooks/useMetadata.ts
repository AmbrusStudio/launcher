import { getAddress } from 'ethers/lib/utils'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ADDRESS_E4C_Ranger_Gold_Edition, ADDRESS_E4C_Ranger_Rangers_Edition, defaultChainId } from '../contracts'
import { RootState } from '../store'
import { TokenMetadata } from '../types'

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

  console.log('Edition', metadadaGoldEdition, metadadaRangersEdition, metadadaUltimateEdition)

  const metadataAllEdition = useMemo<TokenMetadata[]>(
    () => [...metadadaUltimateEdition.metadata, ...metadadaGoldEdition.metadata, ...metadadaRangersEdition.metadata],
    [metadadaGoldEdition, metadadaRangersEdition, metadadaUltimateEdition]
  )

  /**
   * Get Metadata By Address
   * @param address
   * @returns
   */
  const getMetadataByAddress = useCallback(
    (address: string): TokenMetadata[] => {
      if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
        return metadadaGoldEdition.metadata
      } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
        return metadadaRangersEdition.metadata
      } else {
        throw new Error('metadata not found')
      }
    },
    [metadadaGoldEdition.metadata, metadadaRangersEdition.metadata]
  )

  return {
    metadadaGoldEdition,
    metadadaRangersEdition,
    metadataAllEdition,
    getMetadataByAddress,
  }
}
