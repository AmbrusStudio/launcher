import { useSelector } from 'react-redux'

import { defaultChainId } from '../contracts'
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

  return {
    metadadaGoldBaseURI,
    metadadaRangersBaseURI,
    metadadaUltimateBaseURI,
  }
}
