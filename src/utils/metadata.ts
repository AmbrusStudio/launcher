import * as Sentry from '@sentry/react'
import { constants } from 'ethers'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { cloneDeep } from 'lodash'

import { metadataApi } from '../api/metadata'
import { RoleNumber } from '../constants'
import {
  E4CRanger_GoldEdition,
  E4CRanger_GoldEdition_Holder,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEdition_Holder,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { stakeAnnouncementGold, stakeAnnouncementRangers } from '../data'
import {
  Metadata,
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
  TraitName,
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
 * format Metadata
 * @param address
 * @param metadata
 * @param tokenIds
 * @param upgradeds
 * @param originalOwners
 * @param status
 * @returns
 */
export const formatMetadata = (
  address: string,
  metadata: Map<string, TokenMetadata>,
  tokenIds: string[],
  upgradeds: NFTE4CRangerUpgraded[],
  originalOwners: string[],
  status: MetadataStatus
): NFTE4CRanger[] => {
  const result: NFTE4CRanger[] = []

  tokenIds.forEach((tokenId, index) => {
    if (metadata.has(tokenId)) {
      const data = metadata.get(tokenId)

      result.push({
        ...data,
        address,
        tokenId: tokenId,
        upgraded: upgradeds?.[index],
        staking: originalOwners?.[index] ? originalOwners[index] !== constants.AddressZero : false,
        status,
      } as NFTE4CRanger)
    } else {
      const e = `Metadata data not found. tokenId: ${tokenId}`
      console.error(e)
      Sentry.captureException(e)
    }
  })

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
  metadata: Map<string, TokenMetadata>
  tokenIds: string[]
  upgradeds: boolean[]
  stakings: boolean[]
  originalOwner: string[]
  owner: string
  status: MetadataStatus
}): NFTE4CRanger[] => {
  const result: NFTE4CRanger[] = []

  tokenIds.forEach((tokenId, index) => {
    if (owner && originalOwner[index] === owner) {
      if (metadata.has(tokenId)) {
        const data = metadata.get(tokenId)

        result.push({
          ...data,
          address,
          tokenId: tokenId,
          upgraded: upgradeds?.[index],
          staking: stakings?.[index] || false,
          status,
        } as NFTE4CRanger)
      } else {
        const e = `Metadata data not found. tokenId: ${tokenId}`
        console.error(e)
        Sentry.captureException(e)
      }
    }
  })

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
  metadata: Map<string, TokenMetadata>
  tokenIds: string[]
  upgradeds: boolean[]
  stakings: boolean[]
  status: MetadataStatus
}): NFTE4CRanger[] => {
  const result: NFTE4CRanger[] = []

  tokenIds.forEach((tokenId, index) => {
    if (metadata.has(tokenId)) {
      const data = metadata.get(tokenId)

      result.push({
        ...data,
        address,
        tokenId: tokenId,
        upgraded: upgradeds?.[index],
        staking: stakings?.[index] || false,
        status,
      } as NFTE4CRanger)
    } else {
      const e = `Metadata data not found. tokenId: ${tokenId}`
      console.error(e)
      Sentry.captureException(e)
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
  if (
    getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
  ) {
    if (upgraded) {
      return NFTEdition.GoldPlusEdition
    } else {
      return NFTEdition.GoldEdition
    }
  } else if (
    getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
  ) {
    if (upgraded) {
      return NFTEdition.RangersPlusEdition
    } else {
      return NFTEdition.RangersEdition
    }
  } else if (getAddress(address) === getAddress(E4CRanger_UltimateEdition)) {
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
    getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
  ) {
    if (upgraded) {
      return 'Gold+'
    } else {
      return 'Gold'
    }
  } else if (
    getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
  ) {
    if (upgraded) {
      return 'Rangers+'
    } else {
      return 'Rangers'
    }
  } else if (getAddress(address) === getAddress(E4CRanger_UltimateEdition)) {
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
    getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
  ) {
    return baseURL.goldEditionBaseURL
  } else if (
    getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
  ) {
    return baseURL.rangersEditionBaseURL
  } else if (getAddress(address) === getAddress(E4CRanger_UltimateEdition)) {
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
export const getTraitEdition = (data: TokenMetadata | NFTE4CRanger | Metadata): TraitEdition | undefined => {
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
    getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
  ) {
    return stakeAnnouncementGold
  } else if (
    getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
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
    getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
  ) {
    return E4CRanger_GoldEdition_Holder
  } else if (
    getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
    getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
  ) {
    return E4CRanger_RangersEdition_Holder
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

/**
 * buildMetadataInformation
 * @param metadata
 * @param address
 * @param tokenId
 * @returns
 */
export const buildMetadataInformation = (
  metadata: MetadataResponse,
  address: string,
  tokenId: string
): TokenMetadata => {
  return {
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
    address: address,
    tokenId: tokenId,
    trait: metadata.attributes,
  }
}

/**
 * getDefaultMetadataTrait
 * @param address
 * @param tokenId
 * @returns
 */
export const getDefaultMetadataTrait = (address: string, tokenId: string): TraitItem[] => {
  if (!isAddress(address)) {
    return []
  }

  const trait = [
    {
      trait_type: Trait.Name,
      value: '',
    },
    {
      trait_type: Trait.Edition,
      value: '',
    },
  ]
  const _address = getAddress(address)

  if (_address === getAddress(E4CRanger_GoldEdition) || _address === getAddress(E4CRanger_ImmutableX_GoldEdition)) {
    trait[1].value = TraitEdition.Gold
  } else if (
    _address === getAddress(E4CRanger_RangersEdition) ||
    _address === getAddress(E4CRanger_ImmutableX_RangersEdition)
  ) {
    trait[1].value = TraitEdition.Rangers
  } else if (_address === getAddress(E4CRanger_UltimateEdition)) {
    trait[1].value = TraitEdition.Ultimate
  }

  if (trait[1].value) {
    const edition = trait[1].value as TraitEdition.Gold | TraitEdition.Rangers | TraitEdition.Ultimate

    const startRin = RoleNumber[edition][TraitName.Rin].start
    const endRin = RoleNumber[edition][TraitName.Rin].end

    const startKit = RoleNumber[edition][TraitName.Kit].start
    const endKit = RoleNumber[edition][TraitName.Kit].end

    const _tokenId = Number(tokenId)

    if (_tokenId >= startRin && _tokenId <= endRin) {
      trait[0].value = TraitName.Rin
    } else if (_tokenId >= startKit && _tokenId <= endKit) {
      trait[0].value = TraitName.Kit
    }

    return trait
  } else {
    return []
  }
}
