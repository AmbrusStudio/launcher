export type GameIcon = {
  src: string
  activeColor: string
}

export type GameType = 'mobile' | 'client'

export type GameVideo = {
  name: string
  src: string
}

export type GameStoreLink = {
  appStore: string
  googlePlay: string
}

type BaseGameInfo = {
  id: number
  active: boolean
  name: string
  icon: GameIcon
  banner: string | string[]
  background: string | string[]
  video?: GameVideo
}

type NormalGameInfo = BaseGameInfo & {
  type: Exclude<GameType, 'mobile'>
  downloadLink?: string
}

type MobileGameInfo = BaseGameInfo & {
  type: Extract<GameType, 'mobile'>
  store: GameStoreLink
}

export type GameInfo = NormalGameInfo | MobileGameInfo
