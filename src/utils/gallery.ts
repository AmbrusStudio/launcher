import { cloneDeep } from 'lodash'

import { TokenMetadata, Trait } from '../types'
import { Filter, FilterList } from '../types/gallery'
import { BlindBoxMode } from './bindbox'
/**
 * modify filter checked
 * @param filter
 * @param parentIndex
 * @param childrenIndex
 * @returns
 */
export const toggleFilterCheckedFn = (filter: Filter[], parentIndex: number, childrenIndex: number): Filter[] => {
  const list = cloneDeep(filter)
  list[parentIndex].list[childrenIndex].isChecked = !list[parentIndex].list[childrenIndex].isChecked
  return list
}

/**
 * modify filter open
 * @param filter
 * @param index
 * @returns
 */
export const toggleFilterOpenFn = (filter: Filter[], index: number): Filter[] | undefined => {
  if (!filter[index].list.length) {
    return
  }
  const list = cloneDeep(filter)
  list[index].isOpen = !list[index].isOpen
  return list
}

/**
 * Convert Filter To Map Format
 * @param filter
 * @returns
 */
export const convertFilterToMap = (filter: Filter[]): Map<Trait, string[]> => {
  const filterChecked = filter.filter((i) => i.list.some((j: FilterList) => j.isChecked))
  const filterActiveChecked = filterChecked.map<Filter>((i) => ({
    ...i,
    list: i.list.filter((j: FilterList) => j.isChecked),
  }))

  const result = new Map<Trait, string[]>()

  filterActiveChecked.forEach((item) => {
    const list = item.list.map((i) => i.label)
    result.set(item.label as Trait, list)
  })

  return result
}

/**
 * handle filter
 * @param filter
 * @param searchId
 * @returns
 */
export const handleFilterFn = (
  selectedTrait: Map<Trait, string[]>,
  searchId: string,
  tokens: TokenMetadata[],
  pureGold: boolean
): TokenMetadata[] => {
  // Search filter
  let gallery = searchId ? tokens.filter((item) => item.tokenId.includes(searchId)) : tokens

  if (pureGold) {
    const reg = /(^|\s)Gold(\s|$)/g

    gallery = gallery.filter((item) => {
      const findResult = item.trait.find((i) => i.trait_type !== Trait.Edition && reg.test(i.value))
      reg.lastIndex = 0

      return !!findResult && !BlindBoxMode(item.trait)
    })
  }

  if (!selectedTrait.size) return gallery

  const selectedTraitKeys = [...selectedTrait.keys()]
  const filteredGalleryBySelectedTrait = gallery.filter((item) => {
    const allSelectedTaritMatched = selectedTraitKeys.map((key) => {
      const selectedTraitValue = selectedTrait.get(key)
      const matchedTrait = item.trait.find((trait) => {
        return trait.trait_type === key && selectedTraitValue?.includes(trait.value)
      })
      return !!matchedTrait
    })
    return allSelectedTaritMatched.every(Boolean)
  })

  return filteredGalleryBySelectedTrait
}

/**
 * Image Size Conversion
 * @param image
 * @param size
 * @returns
 */
export const imageSizeConversion = (image: string, size: 800 | 2000): string => {
  if (!image) return image

  const sizeList = {
    800: 'Images_800',
    2000: 'Images_2000',
  }

  return image.replace('Images', sizeList[size]).replace('.png', '.jpeg')
}
