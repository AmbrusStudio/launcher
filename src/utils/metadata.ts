import * as Sentry from '@sentry/react'
import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { cloneDeep } from 'lodash'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
} from '../contracts'
import { METADATA_GOLD, METADATA_RANGERS, stakeAnnouncementGold, stakeAnnouncementRangers } from '../data'
import { Metadata, NFTE4CRanger, NFTE4CRangerUpgraded, NFTEdition, StakeAnnouncement, Trait, TraitItem } from '../types'

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
    let item = data[Number(tokenId) - 1]

    if (parseTokenId(item.name) !== tokenId) {
      const e = `Metadata data not found by subscript. tokenId: ${tokenId}`
      console.error(e)
      Sentry.captureException(e)

      // Start search
      const found = data.find((i) => parseTokenId(i.name) === tokenId)
      if (found) {
        item = found
      }
    }
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
