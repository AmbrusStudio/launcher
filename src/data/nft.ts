import { TokenomicsLink } from '../constants'
import { ConfirmModalData, PERK, PERKState, PERKTag, StakeAnnouncement, StakeInfoDataType } from '../types'

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

// Stake Upgrade
// Status Check
export const stakeUpgrade: StakeInfoDataType = {
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
  description: `<p>To claim the $DGC yield, holders are supposed to:</p>
  <ul>
    <li>Stake the NFT for at least 24 hours. If the total staking duration is less than 24 hours, holders are not available to receive any $DGC token.</li>
    <li>Finish the community task in E4C's Discord to get 1 SBT badge: Diamond Hand</li>
  </ul>`,
}

export const stakeCheckEarn: StakeInfoDataType = {
  title: 'Status Check',
  description: `The amount of GDC you earned will be recorded in your account information. It will airdrop to your wallet once we launch the token. <a href="${TokenomicsLink}" target="_blank" rel="noopener">Learn more about E4C tokenomics</a>`,
}

// Stake Confirm Modal
export const confirmUnstakeData: ConfirmModalData = {
  title: 'Are you sure?',
  description:
    'Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the future.',
}

export const confirmUpgradeData: ConfirmModalData = {
  title: 'Upgrade your NFT?',
  description:
    'You’ll earn a lot more benefits after upgrading your NFT. You can only upgrade this NFT whilel it’s still staked.',
}

export const confirmUnstakeEarnData: ConfirmModalData = {
  title: 'Are you sure?',
  description:
    'You have not earned Diamond Hand badge in our Discord. Once unstaked, all your DGC earned will be lost.',
}

export const confirmUpgradeEarnData: ConfirmModalData = {
  title: 'Are you sure?',
  description:
    'Your staking progress will be lost once unstaked. The amount of DGC you earned will be recorded in your account information and will be airdropped to your wallet once it’s launched.',
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
    title: 'Stake your NFT and receive $DGC tokens.',
    description: 'Stake longer, receive more.',
    list: [
      {
        text: 'Holders of Thorn are able to stake their NFT to accumulate $DGC tokens as staking yield. The amount of $DGC token is positively correlated to the staking duration (learn more about the <a href="#" target="_blank" rel="noopener">Table of $DGC Yield</a>).',
      },
      {
        text: 'Before the TGE of the $DGC token, staking NFT holders are considered to acquiescently agree to receive the future tokens and can claim their tokens at TGE only, details of which will be revealed when announcing the TGE of the $DGC token.',
      },
      {
        text: 'The $DGC yield is subject to a <strong>3-month cliff period</strong> before it can be withdrawn.',
      },
    ],
  },
]
