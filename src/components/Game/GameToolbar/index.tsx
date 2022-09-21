import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { LSK_ACCESS_TOKEN } from '../../../constants'
import { useGameClient } from '../../../hooks'
import { GameInfo, GameStoreLink, ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'
import { IconAppleStoreBadge, IconGooglePlayBadge } from '../../Icon'
import { ExternalLink } from '../../Link'

type GameClientButtonProps = ReactButtonProps

function GameClientButton(props: GameClientButtonProps) {
  return (
    <Button className="xl:w-300px xl:h-96px !font-bold !text-24px !leading-30px" variant="primary" {...props}>
      Play
    </Button>
  )
}

type GameStoreLinksProps = {
  store: GameStoreLink
}

function GameStoreLinks(props: GameStoreLinksProps) {
  const {
    store: { appStore, googlePlay },
  } = props
  return (
    <div className="flex flex-row flex-nowrap items-center p-24px gap-16px">
      {appStore && (
        <ExternalLink to={appStore} blank>
          <IconAppleStoreBadge className="w-auto h-48px" />
        </ExternalLink>
      )}
      {googlePlay && (
        <ExternalLink to={googlePlay} blank>
          <IconGooglePlayBadge className="w-auto h-48px" />
        </ExternalLink>
      )}
    </div>
  )
}

type GameToolbarProps = {
  className?: string
  game: GameInfo
}

export function GameToolbar(props: GameToolbarProps) {
  const { className, game } = props
  const { type } = game
  const [accessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)
  const { openGameClient, downloadGameClient } = useGameClient()

  const handleOpenFailFallback = React.useCallback(() => {
    if (!(type === 'client')) return
    if (!game.download) return
    downloadGameClient(game.download)
  }, [downloadGameClient, game, type])
  const handleOpenGameClient = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!accessToken) return
      openGameClient({ path: `accessToken=${accessToken}`, fallback: handleOpenFailFallback, fallbackDelay: 2000 })
    },
    [accessToken, handleOpenFailFallback, openGameClient]
  )

  return (
    <div className={classNames('flex flex-row-reverse flex-nowrap items-center w-full bg-black/50', className)}>
      {type === 'client' && <GameClientButton onClick={handleOpenGameClient} />}
      {type === 'mobile' && <GameStoreLinks store={game.store} />}
    </div>
  )
}
