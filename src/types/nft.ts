export type NFTIntroduction = {
  title: string
  content: string
}

export enum NFTUpgradeInfoState {
  Cold = 'Cold',
}

export type NFTUpgradeInfo = {
  introduction: {
    first: string
    second: string
    list: {
      text: string
    }[]
  }[]
  title: string
  description: string
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
  cover: string
  title: string
  subtitle: string
  id: number
  tag: string
  tagState: NFTTagState
  introduction: NFTIntroduction[]
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
