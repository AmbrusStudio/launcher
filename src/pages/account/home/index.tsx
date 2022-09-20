import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllGames } from '../../../api'
import { AccountTitleWithAccountInfo } from '../../../components/Account'
import { AccountBlock } from '../../../components/Account/Block'
import AssetsSlider from '../../../components/Account/MyAsset'
import { GameBanner } from '../../../components/Game'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { GameInfo } from '../../../types'

const demoData: { id: number; src: string }[] = []

export function Home() {
  const navigate = useNavigate()

  const [games, setGames] = React.useState<GameInfo[]>([])
  const fetchAllGames = React.useCallback(async (signal: AbortSignal) => {
    const games = await getAllGames(signal)
    setGames(games)
  }, [])

  const handleGameBannerClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | string) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/account/games', { state: { gameId: id } })
    },
    [navigate]
  )

  React.useEffect(() => {
    const abortController = new AbortController()
    fetchAllGames(abortController.signal)
    return () => abortController.abort()
  }, [fetchAllGames])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitleWithAccountInfo subtitle="Center" />
      <div className="flex flex-col gap-36px">
        <AccountBlock title="E4C Games">
          <div className="flex gap-36px">
            {games.map((game) => (
              <GameBanner
                key={game.id}
                src={game.banner}
                active={game.active}
                onBannerClick={(e) => handleGameBannerClick(e, game.id)}
              />
            ))}
          </div>
        </AccountBlock>
        <AccountBlock title="My Assets">
          {demoData.length ? (
            <AssetsSlider data={demoData} />
          ) : (
            <span className="text-base text-white">No more data</span>
          )}
        </AccountBlock>
      </div>
    </AccountCenterPageLayout>
  )
}
