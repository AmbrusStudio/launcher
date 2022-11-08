import * as Sentry from '@sentry/react'
import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { cloneDeep } from 'lodash'

import { metadataApi } from '../api/metadata'
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
  MetadataResponse,
  MetadataStatus,
  NFTE4CRanger,
  NFTE4CRangerUpgraded,
  NFTEdition,
  StakeAnnouncement,
  TokenMetadata,
  Trait,
  TraitEdition,
  TraitItem,
} from '../types'
import { BlindBoxMode } from './bindbox'

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
 * FormatMetadata ImmutableX
 * @param param
 * @returns
 */
export const formatMetadataImmutableX = ({
  address,
  metadata,
  tokenIds,
  upgradeds,
  stakings,
  originalOwner,
  owner,
  status,
}: {
  address: string
  metadata: TokenMetadata[]
  tokenIds: string[]
  upgradeds: boolean[]
  stakings: boolean[]
  originalOwner: string[]
  owner: string
  status: MetadataStatus
}): NFTE4CRanger[] => {
  const result = tokenIds
    .map((tokenId, index) => {
      if (owner && originalOwner[index] === owner) {
        // Start search
        const findResult = metadata.find((i) => i.tokenId === tokenId)
        if (findResult) {
          return {
            ...findResult,
            address,
            tokenId: tokenId,
            upgraded: upgradeds?.[index],
            staking: stakings?.[index] || false,
            status,
          }
        } else {
          const e = `Metadata data not found. tokenId: ${tokenId}`
          console.error(e)
          Sentry.captureException(e)

          return
        }
      } else {
        return
      }
    })
    .filter((i) => i) as NFTE4CRanger[]

  return result
}

export const formatMetadataImmutableXUser = ({
  address,
  metadata,
  tokenIds,
  upgradeds,
  stakings,
  status,
}: {
  address: string
  metadata: TokenMetadata[]
  tokenIds: string[]
  upgradeds: boolean[]
  stakings: boolean[]
  status: MetadataStatus
}): NFTE4CRanger[] => {
  const result = tokenIds
    .map((tokenId, index) => {
      // Start search
      const findResult: TokenMetadata | undefined = metadata.find((i) => i.tokenId === tokenId)
      if (findResult) {
        return {
          ...findResult,
          address,
          tokenId: tokenId,
          upgraded: upgradeds?.[index],
          staking: stakings?.[index] || false,
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
 * Get Gallery Edition
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
 * Get BaseURL By Address
 * @param address
 * @param goldEditionBaseURL
 * @param rangersEditionBaseURL
 * @param ultimateEditionBaseURL
 * @returns
 */
export const getBaseURLByAddress = (
  address: string,
  baseURL: {
    goldEditionBaseURL: string
    rangersEditionBaseURL: string
    ultimateEditionBaseURL: string
  }
): string | undefined => {
  if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Gold_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition)
  ) {
    return baseURL.goldEditionBaseURL
  } else if (
    getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Rangers_Edition) ||
    getAddress(address) === getAddress(ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition)
  ) {
    return baseURL.rangersEditionBaseURL
  } else if (getAddress(address) === getAddress(ADDRESS_E4C_Ranger_Ultimate_Edition)) {
    return baseURL.ultimateEditionBaseURL
  } else {
    return
  }
}

/**
 * Get Trait Edition
 * @param data
 * @returns
 */
export const getTraitEdition = (data: TokenMetadata): TraitEdition | undefined => {
  const findResult = data.trait.find((i) => i.trait_type === Trait.Edition)
  if (findResult) {
    return findResult.value as TraitEdition
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

/**
 * EditionPlus
 * @param data
 * @param baseURL
 * @returns
 */
export const editionPlus = async (data: NFTE4CRanger[], baseURL: string): Promise<NFTE4CRanger[]> => {
  const nfts = cloneDeep(data)

  const promiseAllArray = nfts.map((item) =>
    metadataApi<MetadataResponse>({
      url: baseURL,
      tokenId: item.tokenId,
    })
  )

  const response = await Promise.allSettled(promiseAllArray)

  response.forEach((item, index) => {
    if (item.status === 'fulfilled') {
      if (item.value.status === 200 && item.value.data.attributes && !BlindBoxMode(nfts[index].trait)) {
        const findIndexResult = nfts[index].trait.findIndex((i) => i.trait_type === Trait.Edition)
        const findIndexEditionResult = item.value.data.attributes.findIndex((i) => i.trait_type === Trait.Edition)

        if (~findIndexResult && ~findIndexEditionResult) {
          nfts[index].trait[findIndexResult].value = item.value.data.attributes[findIndexEditionResult].value
        }
      }
    }
  })

  return nfts
}

/**
 * Gallery Edition Plus
 * @param data
 * @param baseURL
 * @returns
 */
export const galleryEditionPlus = async (
  data: TokenMetadata[],
  baseURL: (string | undefined)[]
): Promise<TokenMetadata[]> => {
  const nfts = cloneDeep(data)

  const promiseAllArray = nfts.map((item, index) => {
    if (baseURL[index]) {
      return metadataApi<MetadataResponse>({
        url: baseURL[index] || '',
        tokenId: item.tokenId,
      })
    } else {
      return Promise.reject('not baseURL')
    }
  })

  const response = await Promise.allSettled(promiseAllArray)

  response.forEach((item, index) => {
    if (item.status === 'fulfilled') {
      if (item.value.status === 200 && item.value.data.attributes && !BlindBoxMode(nfts[index].trait)) {
        const findIndexResult = nfts[index].trait.findIndex((i) => i.trait_type === Trait.Edition)
        const findIndexEditionResult = item.value.data.attributes.findIndex((i) => i.trait_type === Trait.Edition)

        if (~findIndexResult && ~findIndexEditionResult) {
          nfts[index].trait[findIndexResult].value = item.value.data.attributes[findIndexEditionResult].value
        }
      }
    }
  })

  return nfts
}
