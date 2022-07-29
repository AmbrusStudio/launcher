export type NFTIntroduction = {
  title: string
  content: string
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
  Upgrading = 'Upgrading',
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
