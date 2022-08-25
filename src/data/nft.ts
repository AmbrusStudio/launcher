import { NFT, NFT_TRAIT, NFTStarState, NFTTagState, NFTUpgradeState, PERK, PERKState, PERKTag } from '../types'

export const NFT_DATA: NFT[] = [
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346203_0.92_206.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    description: 'Staking Descriptions',
    id: 537,
    tag: 'Gold Edition',
    tagState: NFTTagState.Cold,
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
    star: 12,
    starState: NFTStarState.Default,
    upgrade: NFTUpgradeState.Upgrade,
    remainingDays: new Date('2022,8,30'),
    upgradeInfo: {
      introduction: [
        {
          first: 'Upgrade to Legendary Edition +',
          second: 'And You’ll Get',
          list: [
            {
              text: '12 more in-game loots',
            },
            {
              text: '1 legendary skin for Rin in our game: E4C Final Salvation',
            },
          ],
        },
        {
          first: 'Once the NFT is staked',
          second: 'You’ll Get',
          list: [
            {
              text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
            },
          ],
        },
      ],
      title: 'Stake to Upgrade',
      description: 'Staking Descriptions',
      upgradingStatusInfo: null,
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346199_0.09_204.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 12',
    description: '',
    id: 57,
    tag: 'Gold Edition',
    tagState: NFTTagState.Cold,
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
    star: 5,
    starState: NFTStarState.New,
    upgrade: NFTUpgradeState.CheckUpgradingStatus,
    remainingDays: new Date('2022,8,30'),
    upgradeInfo: {
      introduction: [
        {
          first: 'Upgrade to Legendary Edition +',
          second: 'And You’ll Get',
          list: [
            {
              text: '12 more in-game loots',
            },
            {
              text: '1 legendary skin for Rin in our game: E4C Final Salvation',
            },
          ],
        },
        {
          first: 'Once the NFT is staked',
          second: 'You’ll Get',
          list: [
            {
              text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
            },
          ],
        },
      ],
      title: 'Upgrading Status Check',
      description: 'You can upgrade this NFT when:',
      upgradingStatusInfo: {
        stakeStatus: false,
        stakeDescription: 'It has been staked for at least 90 days',
        stakeDay: new Date('2022,8,30'),
        stakeValue: 73, // 0 - 90
        badgeStatus: false,
        badgeDescription: 'You have claimed the “xxx” Soulbound Badge in our Discord',
      },
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346199_0.09_204.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 11',
    description: '',
    id: 57,
    tag: 'Gold Edition',
    tagState: NFTTagState.Cold,
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
    star: 5,
    starState: NFTStarState.New,
    upgrade: NFTUpgradeState.CheckUpgradingStatus,
    remainingDays: new Date('2022,8,30'),
    upgradeInfo: {
      introduction: [
        {
          first: 'Upgrade to Legendary Edition +',
          second: 'And You’ll Get',
          list: [
            {
              text: '12 more in-game loots',
            },
            {
              text: '1 legendary skin for Rin in our game: E4C Final Salvation',
            },
          ],
        },
        {
          first: 'Once the NFT is staked',
          second: 'You’ll Get',
          list: [
            {
              text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
            },
          ],
        },
      ],
      title: 'Upgrading Status Check',
      description: 'You can upgrade this NFT when:',
      upgradingStatusInfo: {
        stakeStatus: true,
        stakeDescription: 'It has been staked for at least 90 days',
        stakeDay: new Date('2022,8,30'),
        stakeValue: 100, // 0 - 90
        badgeStatus: true,
        badgeDescription: 'You have claimed the “xxx” Soulbound Badge in our Discord',
      },
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346191_0.92_107.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 10',
    description: 'Staking Descriptions',
    id: 47,
    tag: 'Gold Edition',
    tagState: NFTTagState.ColdAdd,
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
    star: 150,
    starState: NFTStarState.Default,
    upgrade: NFTUpgradeState.Default,
    remainingDays: new Date(),
    upgradeInfo: {
      introduction: [
        {
          first: 'Upgrade to Legendary Edition +',
          second: 'And You’ll Get',
          list: [
            {
              text: '12 more in-game loots',
            },
            {
              text: '1 legendary skin for Rin in our game: E4C Final Salvation',
            },
          ],
        },
        {
          first: 'Once the NFT is staked',
          second: 'You’ll Get',
          list: [
            {
              text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
            },
          ],
        },
      ],
      title: 'Stake to Upgrade',
      description: 'Staking Descriptions',
      upgradingStatusInfo: null,
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346186_0.34_105.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 87',
    description: 'Staking Descriptions',
    id: 537,
    tag: 'Ultimate Edition',
    tagState: NFTTagState.Ultimate,
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
    star: 0,
    starState: NFTStarState.Ultimate,
    upgrade: NFTUpgradeState.Default,
    remainingDays: new Date(),
    upgradeInfo: {
      introduction: [
        {
          first: 'Upgrade to Legendary Edition +',
          second: 'And You’ll Get',
          list: [
            {
              text: '12 more in-game loots',
            },
            {
              text: '1 legendary skin for Rin in our game: E4C Final Salvation',
            },
          ],
        },
        {
          first: 'Once the NFT is staked',
          second: 'You’ll Get',
          list: [
            {
              text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
            },
          ],
        },
      ],
      title: 'Stake to Upgrade',
      description: 'Staking Descriptions',
      upgradingStatusInfo: null,
    },
  },
]

export const PERKS: PERK[] = [
  {
    title: 'Perk Title',
    description: 'Descriptions',
    state: PERKState.ComingSoon,
    tag: PERKTag.Default,
  },
  {
    title: 'Perk Title',
    description: 'Descriptions',
    state: PERKState.Redeem,
    tag: PERKTag.Default,
  },
  {
    title: 'Perk Title',
    description: 'Descriptions',
    state: PERKState.Redeemed,
    tag: PERKTag.Default,
  },
  {
    title: 'Perk Title',
    description: 'Descriptions',
    state: PERKState.Default,
    tag: PERKTag.Default,
  },
  {
    title: 'Perk Title',
    description: 'Descriptions',
    state: PERKState.ComingSoon,
    tag: PERKTag.New,
  },
  {
    title: 'Perk Title (3 left)',
    description: 'Descriptions',
    state: PERKState.Share,
    tag: PERKTag.Default,
  },
]
