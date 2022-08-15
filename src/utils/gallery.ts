import { cloneDeep } from 'lodash'
import { compose } from 'redux'

import { GALLERYS } from '../data'
import { Filter, FilterList, GALLERY } from '../types/gallery'

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
 * handle filter
 * @param filter
 * @param searchId
 * @returns
 */
export const handleFilterFn = (filter: Filter[], searchId: string): GALLERY[] => {
  const filterFlat = (list: Filter[]) => list.flatMap((item) => item.list)
  const filterChecked = (list: FilterList[]) => list.filter((item) => item.is_checked)
  const filterExtract = (list: FilterList[]) => list.map((item) => item.label)

  // search
  const gallery = searchId ? GALLERYS.filter((item) => String(item.id).includes(searchId)) : GALLERYS

  // filter
  const filterResult = compose(filterExtract, filterChecked, filterFlat)(filter)

  // checked
  const result = filterResult.length
    ? gallery.filter((item) => item.trait.find((i) => filterResult.includes(i.value)))
    : gallery

  return result
}
