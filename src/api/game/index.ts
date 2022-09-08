import { ALL_GAMES } from '../../data'
import { GameInfo } from '../../types'

export function getAllGames(): Promise<GameInfo[]> {
  return Promise.resolve(ALL_GAMES)
}
