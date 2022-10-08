import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
} from '../contracts'
import { METADATA_GOLD, METADATA_RANGERS, stakeAnnouncementGold, stakeAnnouncementRangers } from '../data'
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
  const data = getMetadataByAddress(address)
  const result = tokenIds.map((tokenId, index) => {
    const item = data[Number(tokenId) - 1]

    return {
      address,
      tokenId: tokenId,
      upgraded: upgradeds?.[index],
      staking: originalOwners?.[index] ? originalOwners[index] !== constants.AddressZero : false,
      ...item,
    }
  })

  return result
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

/**
 * Get Metadata By Address
 * @param address
 * @returns
 */
export const getMetadataByAddress = (address: string): Metadata[] => {
  if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition)) {
    return METADATA_GOLD
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition)) {
    return METADATA_RANGERS
  } else {
    throw new Error('metadata not found')
  }
}
