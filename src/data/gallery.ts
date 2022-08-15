import { groupBy } from 'lodash'

import { GALLERY, GALLERY_FILTER, GALLERY_FILTER_LIST, GALLERY_INFO_TYPE } from '../types/gallery'
import { NFT_TRAIT } from '../types/nft'

export const GALLERY_INFO: GALLERY_INFO_TYPE = {
  title: 'E4C Rangers',
  description: 'Gallery',
  opensea_url: 'https://opensea.io/collection/e4c',
}

export const GALLERYS: GALLERY[] = [
  {
    id: 1,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Rin',
      },
      {
        key: NFT_TRAIT.BackAccessories,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Makeup,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
    ],
  },
  {
    id: 2,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Pink',
      },
    ],
  },
  {
    id: 3,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Thorn',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 4,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 5,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 6,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 7,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 8,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 9,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 10,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Rin',
      },
      {
        key: NFT_TRAIT.BackAccessories,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Makeup,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
    ],
  },
  {
    id: 11,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Kit',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Cool Girl - Gold',
      },
    ],
  },
  {
    id: 12,
    image: 'https://i.imgur.com/yfUga0u.png',
    opensea_url: 'https://opensea.io/assets/ethereum/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402/13',
    looksrare_url: '',
    etherscan_url: 'https://etherscan.io/address/0xeb05cb1c82acc87ad8e0bb7927a1dc39cd300402',
    trait: [
      {
        key: NFT_TRAIT.Character,
        value: 'Rin',
      },
      {
        key: NFT_TRAIT.BackAccessories,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Hair,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Makeup,
        value: 'Off-white 1',
      },
      {
        key: NFT_TRAIT.Earrings,
        value: 'Off-white 1',
      },
    ],
  },
]

// Handle Filter Property
const allProperty = GALLERYS.flatMap((i) => i.trait)
const allPropertyGroup = groupBy(allProperty, 'key')

export const GALLERYS_FILTERS: GALLERY_FILTER[] = Object.values(NFT_TRAIT).map((i) => {
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

export const GALLERYS_FILTERS_STATUS = GALLERYS_FILTERS.map((i) => ({
  ...i,
  is_open: false,
  list: i.list.map((j) => ({
    ...j,
    is_checked: false,
  })),
}))
