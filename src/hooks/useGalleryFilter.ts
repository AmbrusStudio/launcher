import { useDeepCompareEffect } from 'ahooks'
import { groupBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { compose } from 'redux'

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
      const reg = /(^|\s)Gold(\s|$)/g

      return metadataAllEdition.filter((metadata) => {
        const findResult = metadata.trait.find((i) => i.trait_type !== Trait.Edition && reg.test(i.value))
        reg.lastIndex = 0

        return !!findResult && !BlindBoxMode(metadata.trait)
      })
    } else {
      return metadataAllEdition
    }
  }, [metadataAllEdition, pureGold])

  const galleryFilter = useMemo<Filter[]>(() => {
    // Handle Filter Property

    // Handle Hide blindbox trait
    const handleBlindboxTrait = (data: TokenMetadata[]) =>
      data.map((metadata) => {
        return {
          ...metadata,
          trait: metadata.trait.filter((trait) => trait.trait_type === Trait.Name || !BlindBoxMode(metadata.trait)),
        }
      })

    const metadatas = compose(handleBlindboxTrait)(galleryMetadata)

    const allTrait = metadatas.flatMap((i) => i.trait)
    const allTraitGroupByType = groupBy(allTrait, 'trait_type')

    const traitKeys = [...new Set([...Object.values(Trait), ...Object.keys(allTraitGroupByType)])] as Trait[]

    return traitKeys.map((i) => {
      const list: FilterList[] = []

      if (allTraitGroupByType[i]) {
        const propertyGroupByValue = groupBy(allTraitGroupByType[i], 'value')

        Object.entries(propertyGroupByValue).forEach(([key, vallue]) => {
          list.push({
            label: key,
            isChecked: false,
            count: vallue.length,
          })
        })

        return {
          label: i,
          isOpen: false,
          list: list.sort((a, b) => b.count - a.count),
        }
      } else {
        return {
          label: i,
          isOpen: false,
          list: [],
        }
      }
    })
  }, [galleryMetadata])

  const galleryFilterStatus = useMemo<Filter[]>(() => {
    return galleryFilter.map<Filter>((i) => ({
      ...i,
      isOpen: false,
      list: i.list.map<FilterList>((j) => ({
        ...j,
        isChecked: false,
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
    galleryMetadata,
    filter,
    traitFilter,
    hasFilter,
    setFilter,
    toggleFilterTab,
    toggleFilterTagCheckedChange,
  }
}
