import { ALL_METADATA } from '../data'
import { Metadata, NFTEdition } from '../types'

/**
 * parse tokenId by name
 * @param name
 * @returns
 */
export const parseTokenId = (name: string): number => {
  // E4C_Rangers_1
  return Number(name.split('_')?.[2] || 0)
}

/**
 * nftsForOwner
 * @param tokenId
 * @returns
 */
export const nftsForOwner = (tokenId: string[]): Metadata[] => {
  return ALL_METADATA.filter((item) => tokenId.includes(String(parseTokenId(item.name))))
}

/**
 * get edition
 * @param tokenId
 * @returns
 */
export const getEdition = (tokenId: number): NFTEdition => {
  if (tokenId >= 1 && tokenId <= 15) {
    return NFTEdition.UltimateEdition
  } else if (tokenId >= 16) {
    return NFTEdition.GoldEdition
  } else {
    return NFTEdition.DefaultEdition
  }
}
