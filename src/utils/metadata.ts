import * as Sentry from '@sentry/react'
import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { cloneDeep } from 'lodash'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4C_Ranger_Ultimate_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
  ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
} from '../contracts'
import { stakeAnnouncementGold, stakeAnnouncementRangers } from '../data'
import {
  MetadataStatus,
  NFTE4CRanger,
  NFTE4CRangerUpgraded,
  NFTEdition,
  StakeAnnouncement,
  TokenMetadata,
  Trait,
  TraitItem,
} from '../types'

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
 * formatMetadata
 * @param tokenId
 * @returns
 */
export const formatMetadata = (
  address: string,
  metadata: TokenMetadata[],
  tokenIds: string[],
  upgradeds: NFTE4CRangerUpgraded[],
  originalOwners: string[],
  status: MetadataStatus
): NFTE4CRanger[] => {
  const result = tokenIds
    .map((tokenId, index) => {
      // Start search
      const findResult = metadata.find((i) => i.tokenId === tokenId)
      if (findResult) {
        return {
          ...findResult,
          address,
          tokenId: tokenId,
          upgraded: upgradeds?.[index],
          staking: originalOwners?.[index] ? originalOwners[index] !== constants.AddressZero : false,
          status,
        }
      } else {
        const e = `Metadata data not found. tokenId: ${tokenId}`
        console.error(e)
        Sentry.captureException(e)

        return
      }
    })
    .filter((i) => i) as NFTE4CRanger[]

  return result
}

/**
 * Get Edition
 * @param upgraded
 * @param address
 * @returns
 */
export const getEdition = (upgraded: NFTE4CRangerUpgraded, address: string): NFTEdition => {
  if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)
  ) {
    if (upgraded) {
      return NFTEdition.GoldPlusEdition
    } else {
      return NFTEdition.GoldEdition
    }
  } else if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)
  ) {
    if (upgraded) {
      return NFTEdition.RangersPlusEdition
    } else {
      return NFTEdition.RangersEdition
    }
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Ultimate_Edition)) {
    return NFTEdition.UltimateEdition
  } else {
    return NFTEdition.Default
  }
}

/**
 * Get gallery edition
 * @param upgraded
 * @param address
 * @returns
 */
export const getGalleryEdition = (upgraded: NFTE4CRangerUpgraded, address: string): string => {
  if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)
  ) {
    if (upgraded) {
      return 'Gold+'
    } else {
      return 'Gold'
    }
  } else if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)
  ) {
    if (upgraded) {
      return 'Rangers+'
    } else {
      return 'Rangers'
    }
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Ultimate_Edition)) {
    return 'Ultimate'
  } else {
    return '-'
  }
}

/**
 * Get Stake Announcement
 * @param address
 * @returns
 */
export const getStakeAnnouncement = (address: string): StakeAnnouncement[] => {
  if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)
  ) {
    return stakeAnnouncementGold
  } else if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)
  ) {
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
  if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)
  ) {
    return ADDRESS_E4CRanger_Gold_Holder
  } else if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)
  ) {
    return ADDRESS_E4CRanger_Rangers_Holder
  } else {
    throw new Error('holder not found')
  }
}

/**
 * Trait name on top
 * @param trait
 * @returns
 */
export const traitNameOnTop = (trait: TraitItem[]): TraitItem[] => {
  const _trait = cloneDeep(trait)
  const index = _trait.findIndex((i) => i.trait_type === Trait.Name)
  if (~index) {
    _trait.unshift(_trait.splice(index, 1)[0])
  }
  return _trait
}
