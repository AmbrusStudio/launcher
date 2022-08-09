import { groupBy } from 'lodash'

import { GALLERY, GALLERY_FILTER, GALLERY_FILTER_LIST, GALLERY_PROPERTY } from '../types/gallery'

export const GALLERYS: GALLERY[] = [
  {
    id: 1,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Rin',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Black',
      },
    ],
  },
  {
    id: 2,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Pink',
      },
    ],
  },
  {
    id: 3,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Thorn',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 4,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 5,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 6,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 7,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 8,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 9,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 10,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 11,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 12,
    image: 'https://i.imgur.com/yfUga0u.png',
    property: [
      {
        key: GALLERY_PROPERTY.Character,
        value: 'Kit',
      },
      {
        key: GALLERY_PROPERTY.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
]

// Handle Filter Property
const allProperty = GALLERYS.flatMap((i) => i.property)
const allPropertyGroup = groupBy(allProperty, 'key')

export const GALLERYS_FILTERS: GALLERY_FILTER[] = Object.values(GALLERY_PROPERTY).map((i) => {
  const list: GALLERY_FILTER_LIST[] = []
  if (allPropertyGroup[i]) {
    const propertyGroup = groupBy(allPropertyGroup[i], 'value')

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
    list,
  }
})

// console.log('GALLERYS_FILTERS', GALLERYS_FILTERS)
