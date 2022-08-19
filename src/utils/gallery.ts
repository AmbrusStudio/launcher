import { cloneDeep } from 'lodash'

import { GALLERYS } from '../data'
import { NFT_TRAIT } from '../types'
import { Filter, FilterList, GALLERY, GALLERY_MAP, GALLERY_TRAIT } from '../types/gallery'
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
const convertFilterToMap = (filter: Filter[]): Map<NFT_TRAIT, string[]> => {
  const filterChecked = filter.filter((i) => i.list.some((j: FilterList) => j.is_checked))
  const filterActiveChecked = filterChecked.map((i) => ({
    ...i,
    list: i.list.filter((j: FilterList) => j.is_checked),
  }))

  const result = new Map<NFT_TRAIT, string[]>()

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
const convertTraitToMap = (data: GALLERY[]): GALLERY_MAP[] => {
  return data.map((item) => {
    const traitMap = new Map<NFT_TRAIT, string>()

    item.trait.forEach((traitItem) => {
      traitMap.set(traitItem.key, traitItem.value)
    })

    return {
      ...item,
      trait: traitMap,
    }
  })
}

/**
 * Convert Trait To Array Format
 * @param data
 * @returns
 */
const convertTraitToArray = (data: GALLERY_MAP[]): GALLERY[] => {
  return data.map((item) => {
    const traitArr: GALLERY_TRAIT[] = []
    item.trait.forEach((val, key) => {
      traitArr.push({
        key: key,
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
export const handleFilterFn = (filter: Filter[], searchId: string): GALLERY[] => {
  // Search filter
  const gallery = searchId ? GALLERYS.filter((item) => String(item.id).includes(searchId)) : GALLERYS

  const filterChecked = convertFilterToMap(filter)
  // No filter
  if (!filterChecked.size) {
    return gallery
  }

  const galleryMap = convertTraitToMap(gallery)

  const galleryArray = galleryMap.filter((item) => {
    let flag = true

    filterChecked.forEach((value, key) => {
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
