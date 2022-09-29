import { constants } from 'ethers'
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
export const nftsForOwner = (
  tokenIds: string[],
  upgradeds: NFTE4CRangerUpgraded[],
  originalOwners: string[]
): NFTE4CRanger[] => {
  // tokenId: upgraded
  const tokenIdPairUpgraded = new Map<string, NFTE4CRangerUpgraded>()
  const tokenIdPairStaking = new Map<string, boolean>()
  for (let i = 0; i < tokenIds.length; i++) {
    tokenIdPairUpgraded.set(tokenIds[i], upgradeds?.[i])
    tokenIdPairStaking.set(tokenIds[i], originalOwners?.[i] ? originalOwners?.[i] !== constants.AddressZero : false)
  }

  const metadataFilter = (data: Metadata[]): Metadata[] =>
    data.filter((item) => tokenIds.includes(parseTokenId(item.name)))

  const metadataFormat = (data: Metadata[]): NFTE4CRanger[] =>
    data.map((item) => {
      const tokenId = parseTokenId(item.name)
      return {
        tokenId: tokenId,
        upgraded: tokenIdPairUpgraded.get(tokenId),
        staking: !!tokenIdPairStaking.get(tokenId),
        ...item,
      }
    })

  return compose(metadataFormat, metadataFilter)(ALL_METADATA)
}

/**
 * Get Edition
 */
export const getEdition = (upgraded: NFTE4CRangerUpgraded): NFTEdition => {
  if (upgraded) {
    return NFTEdition.GoldPlusEdition
  } else {
    return NFTEdition.GoldEdition
  }
}
