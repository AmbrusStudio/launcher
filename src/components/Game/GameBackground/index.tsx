import React from 'react'

import { GameInfo } from '../../../types'
import { classNames, getImageSet } from '../../../utils'

type GameBackgroundProps = {
  className?: string
  game: GameInfo
}

export function GameBackground(props: React.PropsWithChildren<GameBackgroundProps>) {
  const { className, game, children } = props
  const { background } = game
  const imageSrc = Array.isArray(background) ? background[0] : background
  const imageSrcset = Array.isArray(background) ? getImageSet(background) : undefined
  return (
    <div className={classNames('max-w-1260px max-h-772px relative', className)}>
      <img
        className="w-full h-auto object-cover select-none"
        src={imageSrc}
        srcSet={imageSrcset}
        loading="lazy"
        alt={game.name}
      />
      {children}
    </div>
  )
}
