import { FC } from 'react'

import { GALLERY } from '../../../types/gallery'

interface GalleryItemProps {
  readonly data: GALLERY
  onClick: () => void
}

const GalleryItem: FC<GalleryItemProps> = ({ data, onClick }) => {
  return (
    <div className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer" onClick={onClick}>
      <img src={data.image} className="w-[100%] h-[100%] object-cover" />
      <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">#{data.id}</p>
    </div>
  )
}

export default GalleryItem
