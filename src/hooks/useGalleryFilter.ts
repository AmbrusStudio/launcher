import { useDeepCompareEffect } from 'ahooks'
import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { TokenMetadata, Trait } from '../types'
import { Filter, FilterList } from '../types/gallery'
import { convertFilterToMap, toggleFilterCheckedFn, toggleFilterOpenFn } from '../utils'
import { BlindBoxMode } from '../utils/bindbox'
import { useMetadata } from './useMetadata'

/**
 * Gallery filter
 * @returns
 */
export function useGalleryFilter(pureGold: boolean) {
  const { metadataAllEdition } = useMetadata()
  // Filter
  const [filter, setFilter] = useState<Filter[]>([])
  const [traitFilter, setTraitFilter] = useState<Map<Trait, string[]>>(new Map())
  const [hasFilter, setHasFilter] = useState<boolean>(false)

  const galleryMetadata = useMemo<TokenMetadata[]>(() => {
    if (pureGold) {
      // Handle Pure Gold
      const reg = /(^|\s)Gold(\s|$)/
      return metadataAllEdition.filter((metadata) => {
        const findResult = metadata.trait.find((i) => i.trait_type !== Trait.Edition && reg.test(i.value))
        return !!findResult && !BlindBoxMode(metadata.trait)
      })
    } else {
      return metadataAllEdition
    }
  }, [metadataAllEdition, pureGold])

  const galleryFilters = useMemo<Filter[]>(() => {
    const metadatas = galleryMetadata.map<TokenMetadata>((metadata) => {
      return {
        ...metadata,
        // Hide blind box trait
        trait: metadata.trait.filter((trait) => trait.trait_type === Trait.Name || !BlindBoxMode(metadata.trait)),
      }
    })

    const allTrait = metadatas.flatMap((metadata) => metadata.trait)

    const allTraitGroupByType = groupBy(allTrait, 'trait_type')

    const traitKeys = [...new Set([...Object.values(Trait), ...Object.keys(allTraitGroupByType)])] as Trait[]

    const filters = traitKeys.map<Filter>((traitKey) => {
      const oneTraitGroupByValue = groupBy(allTraitGroupByType[traitKey], 'value')

      const list = Object.entries(oneTraitGroupByValue).map<FilterList>(([label, vallue]) => ({
        label,
        isChecked: false,
        count: vallue.length,
      }))

      return { label: traitKey, isOpen: false, list: list.sort((a, b) => b.count - a.count) }
    })

    return filters
  }, [galleryMetadata])

  const galleryFilterStatus = useMemo<Filter[]>(() => {
    return galleryFilters.map<Filter>((i) => ({
      ...i,
      isOpen: false,
      list: i.list.map<FilterList>((j) => ({
        ...j,
        isChecked: false,
      })),
    }))
  }, [galleryFilters])

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
    galleryMetadata,
    filter,
    traitFilter,
    hasFilter,
    setFilter,
    toggleFilterTab,
    toggleFilterTagCheckedChange,
  }
}
