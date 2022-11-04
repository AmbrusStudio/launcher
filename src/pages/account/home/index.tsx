import CircularProgress from '@mui/material/CircularProgress'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllGames } from '../../../api'
import { AccountBlock } from '../../../components/Account/Block'
import AssetsSlider from '../../../components/Account/MyAsset'
import { GameBanner } from '../../../components/Game'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4C_Ranger_Ultimate_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
  ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
} from '../../../contracts'
import { useWeb3Modal } from '../../../hooks'
import { useERC721ImmutableXList, useERC721List, useERC721UltimateEditionList } from '../../../hooks/useERC721List'
import { GameInfo } from '../../../types'

export function Home() {
  const navigate = useNavigate()
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const [games, setGames] = useState<GameInfo[]>([])
  const { nfts: nftsGold, loading: loadingGold } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Gold_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721List({
    holderAddress: ADDRESS_E4CRanger_Rangers_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Rangers_Edition,
  })
  const { nfts: nftsUltimate, loading: loadingUltimate } = useERC721UltimateEditionList({
    tokenAddress: ADDRESS_E4C_Ranger_Ultimate_Edition,
  })

  const { nfts: nftsImmutableXGold, loading: loadingImmutableXGold } = useERC721ImmutableXList({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsImmutableXRangers, loading: loadingImmutableXRangers } = useERC721ImmutableXList({
    collection: ADDRESS_ImmutableX_E4C_Ranger_Rangers_Edition,
  })

  console.log('nftsUltimate', nftsUltimate)

  const nfts = useMemo(
    () => [...nftsGold, ...nftsRangers, ...nftsUltimate, ...nftsImmutableXGold, ...nftsImmutableXRangers],
    [nftsGold, nftsRangers, nftsUltimate, nftsImmutableXGold, nftsImmutableXRangers]
  )
  const loading = useMemo(
    () => loadingGold && loadingRangers && loadingUltimate && loadingImmutableXGold && loadingImmutableXRangers,
    [loadingGold, loadingRangers, loadingUltimate, loadingImmutableXGold, loadingImmutableXRangers]
  )

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
          ) : account && active && !loading && !nfts.length ? (
            <span className="text-base text-white">No more data</span>
          ) : (
            <AssetsSlider data={nfts} />
          )}
        </AccountBlock>
      </div>
    </AccountCenterPageLayout>
  )
}
