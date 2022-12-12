import { useState } from 'react'

import { MetadataStatus, NFTE4CRanger, TraitName } from '../types'

export function useCollectionsHiveStake() {
  const [loading, setLoading] = useState<boolean>(false)
  const [collections, setCollections] = useState<NFTE4CRanger[]>([
    {
      name: 'E4C_Rangers_651',
      description:
        'E4C Rangers consists of avatars derived from 7 champions in the E4Cverse. Holders have special utilities, including the partial in-game IP ownership of the corresponding character and game assets airdrops, such as champions and skins. For more info, please refer to our website https://www.ambrus.studio/',
      image: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/Images/E4C_Rangers_651.png',
      address: '0x714a090f35a1f1fc9baa65059b28939dd0f5a196',
      tokenId: '651',
      trait: [
        {
          trait_type: 'Arm Accessory',
          value: 'Arm Bag Teal',
        },
        {
          trait_type: 'Background',
          value: 'Gray 1',
        },
        {
          trait_type: 'Body',
          value: 'Fur 1 Tan',
        },
        {
          trait_type: 'Earrings',
          value: 'Metal Earring 2',
        },
        {
          trait_type: 'Eyes',
          value: 'Eyes Fern',
        },
        {
          trait_type: 'Hair',
          value: 'Ronin Fern',
        },
        {
          trait_type: 'Jacket',
          value: 'Coat Fern',
        },
        {
          trait_type: 'Pants',
          value: 'Pants Teal',
        },
        {
          trait_type: 'Waist Accessory',
          value: 'Waistband Teal',
        },
        {
          trait_type: 'Weapon',
          value: 'Mecha Blade Teal',
        },
        {
          trait_type: 'Wrist Accessory',
          value: 'Wrist Armor Fern',
        },
        {
          trait_type: 'Edition',
          value: 'Rangers',
        },
        {
          trait_type: 'Zodiac',
          value: 'Virgo',
        },
        {
          trait_type: 'Name',
          value: TraitName.Thorn,
        },
      ],
      upgraded: false,
      staking: false,
      status: MetadataStatus.ImmutableX,
    },
  ] as any[])

  return {
    collections,
    loading,
  }
}
