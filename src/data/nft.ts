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
  description:
    'You can upgrade your NFT by staking it for 35 days, and claiming a community badge by completing a specific task. Your NFT can only be staked to upgrade once.',
}
export const statusCheckData: StakeInfoDataType = {
  title: 'Status Check',
  description: 'You can upgrade this NFT when:',
}

export const stakeUpgradeEarn: StakeInfoDataType = {
  title: 'Stake to Upgrade',
  description: `<p>Holders can stake their NFT to get future DGC token. Holders need to:</p>
  <ul>
    <li>Stake NFT to get future DGC. The more time holders stake, the more DGC they will receive</li>
    <li>Finish community task to get 1 special badge: Diamond Hand</li>
  </ul>`,
}

export const stakeCheckEarn: StakeInfoDataType = {
  title: 'Status Check',
  description: `The amount of GDC you earned will be recorded in your account information. It will airdrop to your wallet once we launch the token. <a href="#" target="_blank" rel="noopener">Learn more about E4C tokenomics</a>`,
}

export const confirmUnstakeData: ConfirmUnstakeDataType = {
  description:
    'Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the future.',
}

export const confirmUpgradeData: ConfirmUpgradeDataType = {
  description:
    'You’ll earn a lot more benefits after upgrading your NFT. You can only upgrade this NFT whilel it’s still staked.',
}

// Announcement
export const stakeAnnouncementGold: StakeAnnouncement[] = [
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

export const stakeAnnouncementRangers: StakeAnnouncement[] = [
  {
    title: 'With a Rangers Edition NFT',
    description: 'You get',
    list: [
      {
        text: '5% in-game IP dividend ownership of the corresponding champions&skins',
      },
      {
        text: 'Exclusive airdrop of the corresponding champion in game E4C: Final Salvation',
      },
    ],
  },
  {
    title: 'Once upgraded to Rangers+ Edition',
    description: 'You will Get',
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
]

export const stakeAnnouncementEarn: StakeAnnouncement[] = [
  {
    title: 'Stake Longer',
    description: 'Earn More',
    list: [
      {
        text: 'Stake to earn DGC in the amount in the following table:',
      },
      {
        text: `Staking time Staking Rewards for unit time Total Rewards(DGC) 1-10 1.0 10 11-20 1.1 21 21-30 1.2 33 31-40 1.3 46 41-50 1.4 60 51-60 1.6 76 61-70 1.8 94 71-80 2.0 114 81-90 2.2 136 91-100 2.4 160 101-110 2.7 187 111-120 3.0 217 121-130 3.5 252 131-140 4.0 292 141-150 5.0 342 151-160 6.0 402\\`,
      },
    ],
  },
]
