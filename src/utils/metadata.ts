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
import { ImmutableXL2Overall } from '../types/immutableX'
import { BlindBoxMode, traitName } from './bindbox'

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
    }
  })

  return result
}

/**
 * Format Metadata ImmutableX
 * @param metadata
 * @param stakingStatus
 * @param status
 * @returns
 */
export const formatMetadataImmutableX = ({
  metadata,
  stakingStatus,
  status,
}: {
  metadata: Map<string, Metadata>
  stakingStatus: ImmutableXL2Overall[]
  status: MetadataStatus
}): NFTE4CRanger[] => {
  const result: NFTE4CRanger[] = []

  stakingStatus.forEach((value) => {
    // Must have metadata information
    if (metadata.has(value.tokenId)) {
      const data = metadata.get(value.tokenId)

      result.push({
        ...data,
        address: value.tokenAddress,
        tokenId: value.tokenId,
        upgraded: value.isUpgraded,
        staking: value.isStaking || false,
        status,
      } as NFTE4CRanger)
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
  // Duplicate addresses are automatically overwritten
  const list = {
    [getAddress(E4CRanger_GoldEdition)]: baseURL.goldEditionBaseURL,
    [getAddress(E4CRanger_ImmutableX_GoldEdition)]: baseURL.goldEditionBaseURL,
    [getAddress(E4CRanger_RangersEdition)]: baseURL.rangersEditionBaseURL,
    [getAddress(E4CRanger_ImmutableX_RangersEdition)]: baseURL.rangersEditionBaseURL,
    [getAddress(E4CRanger_UltimateEdition)]: baseURL.ultimateEditionBaseURL,
  }

  return list[getAddress(address)]
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
  // Duplicate addresses are automatically overwritten
  const list = {
    [getAddress(E4CRanger_GoldEdition)]: stakeAnnouncementGold,
    [getAddress(E4CRanger_ImmutableX_GoldEdition)]: stakeAnnouncementGold,
    [getAddress(E4CRanger_RangersEdition)]: stakeAnnouncementRangers,
    [getAddress(E4CRanger_ImmutableX_RangersEdition)]: stakeAnnouncementRangers,
  }

  return list[getAddress(address)] || []
}

/**
 * Get Holder By Address
 * @param address
 * @returns
 */
export const getHolderByAddress = (address: string): string => {
  // Duplicate addresses are automatically overwritten
  const list = {
    [getAddress(E4CRanger_GoldEdition)]: E4CRanger_GoldEdition_Holder,
    [getAddress(E4CRanger_ImmutableX_GoldEdition)]: E4CRanger_GoldEdition_Holder,
    [getAddress(E4CRanger_RangersEdition)]: E4CRanger_RangersEdition_Holder,
    [getAddress(E4CRanger_ImmutableX_RangersEdition)]: E4CRanger_RangersEdition_Holder,
  }

  const result = list[getAddress(address)]
  if (result) {
    return result
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

  // Duplicate addresses are automatically overwritten
  const traitList = {
    [getAddress(E4CRanger_GoldEdition)]: TraitEdition.Gold,
    [getAddress(E4CRanger_ImmutableX_GoldEdition)]: TraitEdition.Gold,
    [getAddress(E4CRanger_RangersEdition)]: TraitEdition.Rangers,
    [getAddress(E4CRanger_ImmutableX_RangersEdition)]: TraitEdition.Rangers,
    [getAddress(E4CRanger_UltimateEdition)]: TraitEdition.Ultimate,
  }
  trait[1].value = traitList[getAddress(address)]

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

/**
 * getSeries
 * Rin 1
 * Kit 2
 * @param trait
 * @returns
 */
export const getSeries = (trait: TraitItem[]): string => {
  const name = traitName(trait)

  if (name === TraitName.Rin) {
    return '1'
  } else if (name === TraitName.Kit) {
    return '2'
  } else {
    return ''
  }
}
