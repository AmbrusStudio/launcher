import CircularProgress from '@mui/material/CircularProgress'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllGames } from '../../../api'
import { AccountBlock } from '../../../components/Account/Block'
import AssetsSlider from '../../../components/Account/MyAsset'
import { GameBanner } from '../../../components/Game'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import { useWeb3Modal } from '../../../hooks'
import { useUserCollections } from '../../../hooks/useUserCollections'
import { GameInfo } from '../../../types'

export function Home() {
  const navigate = useNavigate()
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const [games, setGames] = useState<GameInfo[]>([])
  const { collections, loading } = useUserCollections()

  const fetchAllGames = useCallback(async (signal: AbortSignal) => {
    const games = await getAllGames(signal)
    setGames(games)
  }, [])

  const handleGameBannerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number | string) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/account/games', { state: { gameId: id } })
    },
    [navigate]
  )

  useEffect(() => {
    const abortController = new AbortController()
    fetchAllGames(abortController.signal)
    return () => abortController.abort()
  }, [fetchAllGames])

  return (
    <AccountCenterPageLayout className="flex flex-col gap-24px xl:gap-36px">
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
          {!(account && active) ? (
            <WalletButton
              connected={!!(account && active)}
              chainIdMismatch={chainIdMismatch}
              onConnectClick={() => connect()}
              onSwitchNetworkClick={switchNetwork}
            >
              {shortenIfAddress(account)}
            </WalletButton>
          ) : account && active && loading ? (
            <div className="text-center py-6">
              <CircularProgress
                sx={{
                  color: 'white',
                }}
              />
            </div>
          ) : account && active && !loading && !collections.length ? (
            <span className="text-base text-white">No more data</span>
          ) : (
            <AssetsSlider data={collections} />
          )}
        </AccountBlock>
      </div>
    </AccountCenterPageLayout>
  )
}
