import { Blindbox } from '../constants'
import { Trait, TraitItem, TraitName } from '../types'

/**
 * NFT metadata trait name
 * @param metadata
 * @returns
 */
export const traitName = (trait: TraitItem[]): TraitName | undefined => {
  const findTraitResult = trait.find((item) => item.trait_type === Trait.Name)
  return findTraitResult?.value as TraitName | undefined
}

export const BlindBoxVideo = (trait: TraitItem[]): string => {
  const name = traitName(trait)
  return name ? Blindbox[name].BlindBoxVideo : ''
}

export const BlindBoxPictures = (trait: TraitItem[]): string => {
  const name = traitName(trait)
  return name ? Blindbox[name].BlindBoxPictures : ''
}

export const BlindBoxMode = (trait: TraitItem[]): boolean => {
  const name = traitName(trait)
  return name ? Blindbox[name].BlindBoxMode : false
}
