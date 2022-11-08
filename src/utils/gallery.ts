import { cloneDeep } from 'lodash'

import { TokenMetadata, Trait, TraitItem } from '../types'
import { Filter, FilterList, GALLERY_MAP } from '../types/gallery'
/**
 * modify filter checked
 * @param filter
 * @param parentIndex
 * @param childrenIndex
 * @returns
 */
export const toggleFilterCheckedFn = (filter: Filter[], parentIndex: number, childrenIndex: number): Filter[] => {
  const list = cloneDeep(filter)
  list[parentIndex].list[childrenIndex].is_checked = !list[parentIndex].list[childrenIndex].is_checked
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
  list[index].is_open = !list[index].is_open
  return list
}

/**
 * Convert Filter To Map Format
 * @param filter
 * @returns
 */
export const convertFilterToMap = (filter: Filter[]): Map<Trait, string[]> => {
  const filterChecked = filter.filter((i) => i.list.some((j: FilterList) => j.is_checked))
  const filterActiveChecked = filterChecked.map((i) => ({
    ...i,
    list: i.list.filter((j: FilterList) => j.is_checked),
  }))

  const result = new Map<Trait, string[]>()

  filterActiveChecked.forEach((item) => {
    const list = item.list.map((i) => i.label)
    result.set(item.label, list)
  })

  return result
}

/**
 * Convert Trait To Map Format
 * @param data
 * @returns
 */
const convertTraitToMap = (data: TokenMetadata[]): GALLERY_MAP[] => {
  return data.map((token) => {
    const traitMap = new Map<Trait, string>()

    token.trait.forEach((trait) => {
      traitMap.set(trait.trait_type, trait.value)
    })

    return {
      ...token,
      trait: traitMap,
    }
  })
}

/**
 * Convert Trait To Array Format
 * @param data
 * @returns
 */
const convertTraitToArray = (data: GALLERY_MAP[]): TokenMetadata[] => {
  return data.map((item) => {
    const traitArr: TraitItem[] = []
    item.trait.forEach((val, key) => {
      traitArr.push({
        trait_type: key,
        value: val,
      })
    })

    return {
      ...item,
      trait: traitArr,
    }
  })
}

/**
 * handle filter
 * @param filter
 * @param searchId
 * @returns
 */
export const handleFilterFn = (
  traitFilter: Map<Trait, string[]>,
  searchId: string,
  tokens: TokenMetadata[]
): TokenMetadata[] => {
  // Search filter
  const gallery = searchId ? tokens.filter((item) => item.tokenId.includes(searchId)) : tokens

  if (!traitFilter.size) {
    return gallery
  }

  const galleryMap = convertTraitToMap(gallery)

  const galleryArray = galleryMap.filter((item) => {
    let flag = true

    traitFilter.forEach((value, key) => {
      const traitVal = item.trait.get(key)

      if (!(traitVal && value.includes(traitVal))) {
        flag = false
      }
    })

    return flag
  })

  const result = convertTraitToArray(galleryArray)

  return result
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
