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
  description: 'You can upgrade your NFT by<br>Staking for 35 days, and<br>Claiming a community badge by completing a specific task<br><br>Your NFT can only be staked to upgrade once.',
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
    title: 'With a Gold Edition NFT',
    description: 'You get',
    list: [
      {
        text: '5% in-game IP dividend ownership of the corresponding champions&skins',
      },
      {
        text: 'Exclusive airdrop of the corresponding champion in game E4C: Final Salvation',
      },
      {
        text: 'Gold Loot Box containing in-game champions and skins',
      },
      {
        text: '10% discount on in-game purchases',
      },
      {
        text: 'Complementary gifts to 1 friend',
      },
    ],
  },
  {
    title: 'Once upgraded to Gold+ Edition',
    description: 'You will Get',
    list: [
      {
        text: '3% additional in-game IP dividend ownership of the corresponding champions & skins',
      },
      {
        text: 'Exclusive airdrop of the corresponding champion in game E4C: Final Salvation',
      },
      {
        text: 'E4C token airdrop',
      },
      {
        text: 'Gold+ Loot Box containing in-game champions and skins',
      },
      {
        text: '15% discount on in-game purchases',
      },
      {
        text: 'Complementary gifts to 3 friends',
      },
    ],
  },
]
