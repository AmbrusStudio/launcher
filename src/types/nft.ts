export type NFTIntroduction = {
  title: string
  content: string
}

export enum NFTState {
  Cold = 'Cold',
  ColdAdd = 'ColdAdd',
  Ultimate = 'Ultimate',
}

export type NFT = {
  title: string
  subtitle: string
  id: number
  tag: string
  tagState: NFTState
  introduction: NFTIntroduction[]
}
