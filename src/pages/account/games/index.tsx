import React from 'react'
import { useLocation } from 'react-router-dom'

import { getAllGames } from '../../../api'
import { AccountTitleWithAccountInfo } from '../../../components/Account'
import { GameBackground, GameIconBar, GameToolbar } from '../../../components/Game'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { GameInfo } from '../../../types'
import { isGameLocationState } from '../../../utils'

export function Games() {
  const { state } = useLocation()
  const [allGames, setAllGames] = React.useState<GameInfo[]>([])
  const [activeGame, setActiveGame] = React.useState<GameInfo>()
  const fetchGame = React.useCallback(
    async (signal: AbortSignal) => {
      const games = await getAllGames(signal)
      setAllGames(games)
      if (isGameLocationState(state)) {
        const game = games.find((g) => g.id === Number(state.gameId))
        setActiveGame(game || games[0])
      } else {
        setActiveGame(games[0])
      }
    },
    [state]
  )

  React.useEffect(() => {
    const abortController = new AbortController()
    fetchGame(abortController.signal)
    return () => abortController.abort()
  }, [fetchGame])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-24px max-w-1332px">
      <AccountTitleWithAccountInfo subtitle="Center" />
      <div className="flex flex-col w-full xl:w-1260px">
        <GameIconBar games={allGames} active={activeGame} />
        {activeGame && (
          <GameBackground game={activeGame}>
            <GameToolbar className="absolute bottom-0" game={activeGame} />
          </GameBackground>
        )}
      </div>
    </AccountCenterPageLayout>
  )
}
