import { compose } from 'redux'

import { ALL_METADATA } from '../data'
import { Metadata, NFTE4CRanger, NFTE4CRangerUpgraded, NFTEdition } from '../types'

/**
 * parse tokenId by name
 * @param name
 * @returns
 */
export const parseTokenId = (name: string): string => {
  // E4C_Rangers_1
  return name.split('_')?.[2] || '0'
}

/**
 * nftsForOwner
 * @param tokenId
 * @returns
 */
export const nftsForOwner = (tokenIds: string[], upgradeds: NFTE4CRangerUpgraded[]): NFTE4CRanger[] => {
  // tokenId: upgraded
  const tokenIdPairUpgraded = new Map<string, NFTE4CRangerUpgraded>()
  for (let i = 0; i < tokenIds.length; i++) {
    tokenIdPairUpgraded.set(tokenIds[i], upgradeds?.[i])
  }

  const metadataFilter = (data: Metadata[]): Metadata[] =>
    data.filter((item) => tokenIds.includes(parseTokenId(item.name)))

  const metadataFormat = (data: Metadata[]): NFTE4CRanger[] =>
    data.map((item) => {
      const tokenId = parseTokenId(item.name)
      return {
        tokenId: tokenId,
        upgraded: tokenIdPairUpgraded.get(tokenId),
        ...item,
      }
    })

  return compose(metadataFormat, metadataFilter)(ALL_METADATA)
}

/**
 * get edition
 * @param tokenId
 * @returns
 */
export const getEdition = (tokenId: number, upgraded: NFTE4CRangerUpgraded): NFTEdition => {
  if (tokenId >= 1 && tokenId <= 15) {
    return NFTEdition.UltimateEdition
  } else if (tokenId >= 16 && upgraded) {
    return NFTEdition.GoldPlusEdition
  } else if (tokenId >= 16 && !upgraded) {
    return NFTEdition.GoldEdition
  } else {
    // default
    return NFTEdition.GoldEdition
  }
}
