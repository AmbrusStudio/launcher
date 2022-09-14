import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { LSK_ACCESS_TOKEN } from '../../../constants'
import { useGameClient } from '../../../hooks'
import { GameInfo, ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'

type GameClientButtonProps = ReactButtonProps

function GameClientButton(props: GameClientButtonProps) {
  return (
    <Button className="xl:w-300px xl:h-96px !font-bold !text-24px !leading-30px" variant="primary" {...props}>
      Play
    </Button>
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
    if (!game.downloadLink) return
    downloadGameClient(game.downloadLink)
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
    </div>
  )
}
