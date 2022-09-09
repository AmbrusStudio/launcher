import { groupBy } from 'lodash'

import { OPENSEA_URL } from '../contracts'
import { Trait } from '../types'
import { GALLERY_FILTER, GALLERY_FILTER_LIST, GALLERY_INFO_TYPE } from '../types/gallery'
import { ALL_METADATA } from './metadata'

export const GALLERY_INFO: GALLERY_INFO_TYPE = {
  title: 'E4C Rangers',
  description: 'Gallery',
  opensea_url: OPENSEA_URL,
}

// Handle Filter Property
const allTrait = ALL_METADATA.flatMap((i) => i.attributes)
const allTraitGroup = groupBy(allTrait, 'trait_type')

export const GALLERYS_FILTERS: GALLERY_FILTER[] = Object.values(Trait).map((i) => {
  const list: GALLERY_FILTER_LIST[] = []
  if (allTraitGroup[i]) {
    const propertyGroup = groupBy(allTraitGroup[i], 'value')

    for (const key in propertyGroup) {
      if (Object.prototype.hasOwnProperty.call(propertyGroup, key)) {
        list.push({
          label: key,
          count: propertyGroup[key].length,
        })
      }
    }
  }
  return {
    label: i,
    list: list.sort((a, b) => b.count - a.count),
  }
})

export const GALLERYS_FILTERS_STATUS = GALLERYS_FILTERS.map((i) => ({
  ...i,
  is_open: false,
  list: i.list.map((j) => ({
    ...j,
    is_checked: false,
  })),
}))
