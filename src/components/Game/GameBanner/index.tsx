import React from 'react'

import { getImageSet } from '../../../utils'

type GameBannerProps = {
  src: string | string[]
  active?: boolean
  onBannerClick?: React.MouseEventHandler<HTMLDivElement>
}

export function GameBanner(props: GameBannerProps) {
  const { src, active, onBannerClick } = props
  const imageSrc = Array.isArray(src) ? src[0] : src
  const imageSrcset = Array.isArray(src) ? getImageSet(src) : undefined

  const handleBannerClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!active) return
      onBannerClick && onBannerClick(e)
    },
    [active, onBannerClick]
  )

  return (
    <div className="w-396px h-254px relative cursor-pointer" onClick={handleBannerClick}>
      <img
        className="w-full h-full object-cover select-none"
        src={imageSrc}
        srcSet={imageSrcset}
        loading="lazy"
        alt="Game banner image"
      />
      {!active && (
        <div className="absolute left-0 bottom-0 w-full h-60px flex items-center justify-center bg-black/50">
          <p className="font-semibold text-16px leading-20px uppercase text-white">Coming Soon</p>
        </div>
      )}
    </div>
  )
}
