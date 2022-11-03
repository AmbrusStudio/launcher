import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Blindbox, BlindBoxTrait } from '../constants'
import { Trait, TraitName } from '../types'
import { Filter, GALLERY_FILTER, GALLERY_FILTER_LIST } from '../types/gallery'
import { toggleFilterCheckedFn, toggleFilterOpenFn } from '../utils'
import { useMetadata } from './useMetadata'

/**
 * Gallery filter
 * @returns
 */
export function useGalleryFilter() {
  const { metadataAllEdition } = useMetadata()
  // Filter
  const [filter, setFilter] = useState<Filter[]>([])

  const galleryFilter = useMemo<GALLERY_FILTER[]>(() => {
    // Handle Filter Property
    const allTrait = metadataAllEdition.flatMap((i) => i.trait)
    const allTraitGroupByType = groupBy(allTrait, 'trait_type')

    return Object.values(Trait).map((i) => {
      const list: GALLERY_FILTER_LIST[] = []
      if (allTraitGroupByType[i]) {
        const propertyGroupByValue = groupBy(allTraitGroupByType[i], 'value')

        for (const key in propertyGroupByValue) {
          if (Object.prototype.hasOwnProperty.call(propertyGroupByValue, key)) {
            list.push({
              label:
                // TODO
                !Blindbox[TraitName.Rin].BlindBoxMode || BlindBoxTrait.includes(propertyGroupByValue[key][0].trait_type)
                  ? key
                  : 'unknown',
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

  // Toggle Filter children open
  const toggleFilterTab = useCallback(
    (index: number) => {
      const list = toggleFilterOpenFn(filter, index)
      list && setFilter(list)
    },
    [filter, setFilter]
  )

  // Toggle filter children tag checked - change
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

  return {
    galleryFilterStatus,
    filter,
    setFilter,
    toggleFilterTab,
    toggleFilterTagCheckedChange,
  }
}
