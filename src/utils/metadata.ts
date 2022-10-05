import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { compose } from 'redux'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
} from '../contracts'
import { ALL_METADATA, stakeAnnouncementGold, stakeAnnouncementRangers } from '../data'
import { Metadata, NFTE4CRanger, NFTE4CRangerUpgraded, NFTEdition, StakeAnnouncement } from '../types'

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
  address: string,
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
        address,
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
 * @param upgraded
 * @param address
 * @returns
 */
export const getEdition = (upgraded: NFTE4CRangerUpgraded, address: string): NFTEdition => {
  if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
    if (upgraded) {
      return NFTEdition.GoldPlusEdition
    } else {
      return NFTEdition.GoldEdition
    }
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
    if (upgraded) {
      return NFTEdition.RangersPlusEdition
    } else {
      return NFTEdition.RangersEdition
    }
  } else {
    return NFTEdition.Default
  }
}

/**
 * Get Stake Announcement
 * @param address
 * @returns
 */
export const getStakeAnnouncement = (address: string): StakeAnnouncement[] => {
  if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
    return stakeAnnouncementGold
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
    return stakeAnnouncementRangers
  } else {
    return []
  }
}

/**
 * Get Holder By Address
 * @param address
 * @returns
 */
export const getHolderByAddress = (address: string): string => {
  if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
    return ADDRESS_E4CRanger_Gold_Holder
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
    return ADDRESS_E4CRanger_Rangers_Holder
  } else {
    throw new Error('holder not found')
  }
}
