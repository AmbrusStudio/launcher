import { Metadata, TraitItem } from './metadata'

export type StakeAnnouncement = {
  title: string
  description: string
  list: {
    text: string
  }[]
}

export type StakeInfoDataType = {
  title: string
  description: string
}

export type ConfirmUnstakeDataType = {
  description: string
}

export type ConfirmUpgradeDataType = {
  description: string
}

export type NFTUpgradeInfo = {
  upgradingStatusInfo: {
    stakeStatus: boolean
    stakeDescription: string
    stakeDay: Date
    stakeValue: number
    badgeStatus: boolean
    badgeDescription: string
  } | null
}

export enum NFTTagState {
  Cold = 'Cold',
  ColdAdd = 'ColdAdd',
  Ultimate = 'Ultimate',
}

export enum NFTStarState {
  Default = 'Default',
  New = 'New',
  Ultimate = 'Ultimate',
}

export enum NFTUpgradeState {
  Default = 'Default',
  Upgrade = 'Upgrade',
  CheckUpgradingStatus = 'Check upgrading status',
}

export type NFT = {
  tokenId: string
  cover: string
  title: string
  subtitle: string
  description: string
  id: number
  tag: string
  tagState: NFTTagState
  trait: TraitItem[]
  star: number
  starState: NFTStarState
  upgrade: NFTUpgradeState
  remainingDays: Date
  upgradeInfo: NFTUpgradeInfo
}

export enum PERKState {
  Default = 'Default',
  Redeem = 'Redeem',
  Redeemed = 'Redeemed',
  ComingSoon = 'Coming Soon',
  Share = 'Share',
}
export enum PERKTag {
  Default = 'Default',
  New = 'New',
}

export type PERK = {
  title: string
  description: string
  state: PERKState
  tag: PERKTag
}

export enum NFTEdition {
  GoldEdition = 'Gold Edition',
  GoldPlusEdition = 'Gold Plus Edition',
  UltimateEdition = 'Ultimate Edition',
}

export type NFTE4CRangerUpgraded = boolean | undefined

export type NFTE4CRanger = {
  tokenId: string
  upgraded: NFTE4CRangerUpgraded
  staking: boolean
} & Metadata
