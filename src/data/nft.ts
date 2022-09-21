import {
  ConfirmUnstakeDataType,
  ConfirmUpgradeDataType,
  PERK,
  PERKState,
  PERKTag,
  StakeAnnouncement,
  StakeInfoDataType,
} from '../types'

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

export const stakeToUpgrade: StakeInfoDataType = {
  title: 'Stake to Upgrade',
  description: 'Staking Descriptions',
}
export const statusCheckData: StakeInfoDataType = {
  title: 'Status Check',
  description: 'You can upgrade this NFT when:',
}

export const confirmUnstakeData: ConfirmUnstakeDataType = {
  description:
    'Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the future.',
}

export const confirmUpgradeData: ConfirmUpgradeDataType = {
  description:
    'You’ll earn a lot more benefits after upgrading your NFT. You can only upgrade this NFT whilel it’s still staked.',
}

export const stakeAnnouncement: StakeAnnouncement[] = [
  {
    title: 'Upgrade to Legendary Edition +',
    description: 'And You’ll Get',
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
    title: 'Once the NFT is staked',
    description: 'You’ll Get',
    list: [
      {
        text: 'NFT Airdrop (Rangers Edition) from our upcoming E4C Rangers Series',
      },
    ],
  },
]
