import React from 'react'

import { AccountShopCard } from '../../..//components/Account/ShopCard'
import { getAllGames } from '../../../api'
import BannerFinalSalvation from '../../../assets/images/banners/final-salvation.png'
import Loot from '../../../assets/images/banners/loot.png'
import SessionPass from '../../../assets/images/banners/session-pass.png'
import BannerUgcTool from '../../../assets/images/banners/ugc-tool.png'
import { AccountTitleWithAccountInfo } from '../../../components/Account'
import { AccountBlock } from '../../../components/Account/Block'
import { AccountMyAsset } from '../../../components/Account/MyAsset'
import { GameBanner } from '../../../components/Game'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { GameInfo } from '../../../types'

const demoData = [
  { id: 1, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 2, src: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 3, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 4, src: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 5, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 6, src: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 7, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 8, src: 'https://i.imgur.com/KH0HhIo.png' },
  { id: 9, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 10, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 11, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 12, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 13, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 14, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 15, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 16, src: 'https://i.imgur.com/OJGH11v.png' },
  { id: 17, src: 'https://i.imgur.com/OJGH11v.png' },
]

export function Home() {
  const [games, setGames] = React.useState<GameInfo[]>([])
  const fetchAllGames = React.useCallback(async () => {
    const games = await getAllGames()
    console.log(games)
    setGames(games)
  }, [])

  React.useEffect(() => {
    fetchAllGames()
  }, [fetchAllGames])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitleWithAccountInfo subtitle="Center" />
      <div className="flex flex-col gap-36px">
        <AccountBlock title="E4C Games">
          <div className="flex gap-36px">
            <GameBanner src={BannerFinalSalvation} active />
            {games.map((game) => (
              <GameBanner key={game.id} src={game.banner} active={game.active} />
            ))}
            <GameBanner src={BannerUgcTool} />
          </div>
        </AccountBlock>
        <AccountBlock title="My Assets">
          <AccountMyAsset data={demoData} />
        </AccountBlock>
        <AccountBlock title="E4C Shop">
          <div className="flex gap-36px">
            <AccountShopCard
              src={SessionPass}
              category="E4C Fallen Arena"
              title="Season 1 Battle Pass"
              details="Earn more rewards in E4C Fallen Arena"
            />
            <AccountShopCard
              src={Loot}
              category="E4C Fallen Arena"
              title="E4C Fallen Arena Loot"
              details="In-game content for E4C Fallen Arena"
            />
          </div>
        </AccountBlock>
      </div>
    </AccountCenterPageLayout>
  )
}
