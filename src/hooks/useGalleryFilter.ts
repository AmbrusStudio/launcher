import { groupBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { BlindBoxMode, BlindBoxTrait } from '../constants'
import { Trait } from '../types'
import { Filter, GALLERY_FILTER, GALLERY_FILTER_LIST } from '../types/gallery'
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
              label: !BlindBoxMode || BlindBoxTrait.includes(propertyGroupByValue[key][0].trait_type) ? key : 'unknown',
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

  useEffect(() => {
    setFilter(galleryFilterStatus)
  }, [galleryFilterStatus])

  return {
    galleryFilterStatus,
    filter,
    setFilter,
  }
}
