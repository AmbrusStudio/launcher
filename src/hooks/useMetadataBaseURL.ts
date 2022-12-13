import { getAddress, isAddress } from 'ethers/lib/utils'
import { useCallback } from 'react'
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

/**
 * useMetadataBaseURL
 * @returns
 */
export function useMetadataBaseURL() {
  const metadadaGoldBaseURI = useSelector((state: RootState) => state.metadata.GoldEdition[defaultChainId].baseURI)
  const metadadaRangersBaseURI = useSelector(
    (state: RootState) => state.metadata.RangersEdition[defaultChainId].baseURI
  )
  const metadadaUltimateBaseURI = useSelector(
    (state: RootState) => state.metadata.UltimateEdition[defaultChainId].baseURI
  )

  /**
   * Get BaseURL By Address
   * @param address
   */
  const getBaseURLByAddress = useCallback(
    (address: string): string | undefined => {
      if (!isAddress(address)) {
        return
      }

      // Duplicate addresses are automatically overwritten
      const list = {
        [getAddress(E4CRanger_GoldEdition)]: metadadaGoldBaseURI,
        [getAddress(E4CRanger_ImmutableX_GoldEdition)]: metadadaGoldBaseURI,
        [getAddress(E4CRanger_RangersEdition)]: metadadaRangersBaseURI,
        [getAddress(E4CRanger_ImmutableX_RangersEdition)]: metadadaRangersBaseURI,
        [getAddress(E4CRanger_UltimateEdition)]: metadadaUltimateBaseURI,
      }

      return list[getAddress(address)]
    },
    [metadadaGoldBaseURI, metadadaRangersBaseURI, metadadaUltimateBaseURI]
  )

  return {
    metadadaGoldBaseURI,
    metadadaRangersBaseURI,
    metadadaUltimateBaseURI,
    getBaseURLByAddress,
  }
}
