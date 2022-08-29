import { FC } from 'react'

import { Metadata } from '../../../types'
import { parseTokenId } from '../../../utils'

interface GalleryItemProps {
  readonly data: Metadata
  onClick: () => void
}

const GalleryItem: FC<GalleryItemProps> = ({ data, onClick }) => {
  return (
    <div className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer bg-[#383838]" onClick={onClick}>
      <img src={data.image} className="w-[100%] h-[100%] object-cover" />
      <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
        #{parseTokenId(data.name)}
      </p>
    </div>
  )
}

export default GalleryItem
