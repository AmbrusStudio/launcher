import { NFT, NFTStarState, NFTTagState, NFTUpgradeState, PERK, PERKState, PERKTag } from '../types'

export const NFTs: NFT[] = [
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346203_0.92_206.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: 537,
    tag: 'Gold Edition',
    tagState: NFTTagState.Cold,
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
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
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346199_0.09_204.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: 537,
    tag: 'Gold Edition',
    tagState: NFTTagState.Cold,
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
      },
    ],
    star: 5,
    starState: NFTStarState.New,
    upgrade: NFTUpgradeState.Upgrading,
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
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346191_0.92_107.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: 537,
    tag: 'Gold Edition',
    tagState: NFTTagState.ColdAdd,
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
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
    },
  },
  {
    cover: 'https://ambrus.s3.amazonaws.com/1657877346186_0.34_105.jpg',
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: 537,
    tag: 'Ultimate Edition',
    tagState: NFTTagState.Ultimate,
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
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
