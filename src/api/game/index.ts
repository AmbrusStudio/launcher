import { ALL_GAMES } from '../../data'
import { GameInfo } from '../../types'

export function getAllGames(signal: AbortSignal): Promise<GameInfo[]> {
  // TODO: use abort controller signal in fetch api
  return Promise.resolve(ALL_GAMES)
}
