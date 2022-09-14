import * as CSS from 'csstype'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { GameInfo, ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'

type GameIconProps = Omit<ReactButtonProps, 'title'> &
  Required<Pick<ReactButtonProps, 'title'>> & {
    icon: string
    active?: CSS.Property.BackgroundColor
  }

function GameIcon(props: GameIconProps) {
  const { className, active, title, icon, style, ...others } = props
  const iconStyle: React.CSSProperties = { backgroundColor: active ? active : undefined, ...style }
  return (
    <button
      className={classNames('w-80px h-80px p-12px', className)}
      style={iconStyle}
      title={title}
      type="button"
      {...others}
    >
      <img className="w-56px h-56px object-cover select-none" src={icon} alt={title} loading="lazy" />
    </button>
  )
}

type GameIconBarProps = {
  games: GameInfo[]
  active?: GameInfo
}

export function GameIconBar(props: GameIconBarProps) {
  const { games, active } = props
  const navigate = useNavigate()
  const getActiveColor = (id: number) => (active?.id === id ? active.icon.activeColor : undefined)
  const handleGameIconClick = React.useCallback(
    (id: number) => {
      navigate('/account/games', { state: { gameId: id } })
    },
    [navigate]
  )
  return (
    <div className="flex flex-row flex-nowrap items-center gap-24px bg-black/50">
      {games.map((game) => (
        <GameIcon
          key={game.id}
          title={game.name}
          icon={game.icon.src}
          active={getActiveColor(game.id)}
          onClick={() => handleGameIconClick(game.id)}
        />
      ))}
    </div>
  )
}
