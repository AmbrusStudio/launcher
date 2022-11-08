import { useDeepCompareEffect } from 'ahooks'
import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Trait } from '../types'
import { Filter, GALLERY_FILTER, GALLERY_FILTER_LIST } from '../types/gallery'
import { convertFilterToMap, toggleFilterCheckedFn, toggleFilterOpenFn } from '../utils'
import { BlindBoxMode } from '../utils/bindbox'
import { useMetadata } from './useMetadata'

/**
 * Gallery filter
 * @returns
 */
export function useGalleryFilter() {
  const { metadataAllEdition } = useMetadata()
  // Filter
  const [filter, setFilter] = useState<Filter[]>([])
  const [traitFilter, setTraitFilter] = useState<Map<Trait, string[]>>(new Map())
  const [hasFilter, setHasFilter] = useState<boolean>(false)

  const galleryFilter = useMemo<GALLERY_FILTER[]>(() => {
    // Handle Filter Property

    // Hide blindbox trait
    const metadatas = metadataAllEdition.map((metadata) => {
      return {
        ...metadata,
        trait: metadata.trait.filter((trait) => trait.trait_type === Trait.Name || !BlindBoxMode(metadata.trait)),
      }
    })

    const allTrait = metadatas.flatMap((i) => i.trait)
    const allTraitGroupByType = groupBy(allTrait, 'trait_type')

    return Object.values(Trait).map((i) => {
      const list: GALLERY_FILTER_LIST[] = []
      if (allTraitGroupByType[i]) {
        const propertyGroupByValue = groupBy(allTraitGroupByType[i], 'value')

        for (const key in propertyGroupByValue) {
          if (Object.prototype.hasOwnProperty.call(propertyGroupByValue, key)) {
            list.push({
              label: key,
              count: propertyGroupByValue[key].length,
            })
          }
        }
      }

      return {
        label: i,
        list: list.sort((a, b) => b.count - a.count),
      }
    })
  }, [metadataAllEdition])

  const galleryFilterStatus = useMemo<Filter[]>(() => {
    return galleryFilter.map((i) => ({
      ...i,
      is_open: false,
      list: i.list.map((j) => ({
        ...j,
        is_checked: false,
      })),
    }))
  }, [galleryFilter])

  // Filter menu expand
  const toggleFilterTab = useCallback(
    (index: number) => {
      const list = toggleFilterOpenFn(filter, index)
      list && setFilter(list)
    },
    [filter, setFilter]
  )

  // Trait selection
  const toggleFilterTagCheckedChange = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = toggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
    },
    [filter, setFilter]
  )

  useEffect(() => {
    setFilter(galleryFilterStatus)
  }, [galleryFilterStatus])

  useDeepCompareEffect(() => {
    // Set has filter
    let flag = false
    traitFilter.forEach((value) => {
      if (flag) {
        return
      }

      if (value.length > 0) {
        flag = true
      }
    })

    setHasFilter(flag)
  }, [traitFilter])

  useDeepCompareEffect(() => {
    // Set the filter map structure
    const list = convertFilterToMap(filter)
    setTraitFilter(list)
  }, [filter])

  return {
    galleryFilterStatus,
    filter,
    traitFilter,
    hasFilter,
    setFilter,
    toggleFilterTab,
    toggleFilterTagCheckedChange,
  }
}
