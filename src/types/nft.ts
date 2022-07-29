export type NFTIntroduction = {
  title: string
  content: string
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

export type NFT = {
  title: string
  subtitle: string
  id: number
  tag: string
  tagState: NFTTagState
  introduction: NFTIntroduction[]
  star: number
  starState: NFTStarState
}
