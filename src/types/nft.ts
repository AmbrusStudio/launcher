import { Metadata, MetadataStatus, TraitItem } from './metadata'

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

export enum TraitEdition {
  Gold = 'Gold',
  ColdPlus = 'Gold+',
  Rangers = 'Rangers',
  RangersPlus = 'Rangers+',
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
  Default = '-',
  GoldEdition = 'Gold Edition',
  GoldPlusEdition = 'Gold Edition',
  RangersEdition = 'Rangers Edition',
  RangersPlusEdition = 'Rangers Edition',
  UltimateEdition = 'Ultimate Edition',
}

export type NFTE4CRangerUpgraded = boolean | undefined

export type NFTE4CRanger = {
  address: string
  tokenId: string
  upgraded: NFTE4CRangerUpgraded
  staking: boolean
  status: MetadataStatus
} & Metadata

export type TokenMetadata = {
  address: string
  tokenId: string
} & Metadata

export type E4CRangerNftKind = 'ultimate' | 'gold' | 'rangers'

export type E4CRangerNftKindMap = Record<string, E4CRangerNftKind>

export type E4CRangerNftKindChainMap = Record<number, E4CRangerNftKindMap>
