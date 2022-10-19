import classNames from 'classnames'
import { FC } from 'react'

import { NFTEdition, TokenMetadata } from '../../../types'
import { getEdition, getGalleryEdition, imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'

interface GalleryItemProps {
  readonly data: TokenMetadata
  onClick: () => void
}

const GalleryItem: FC<GalleryItemProps> = ({ data, onClick }) => {
  return (
    <div className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer bg-[#383838]" onClick={onClick}>
      <TokenMedia src={imageSizeConversion(data.image, 800)} />
      <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
        {getEdition(false, data.address) === NFTEdition.UltimateEdition ? data.name : `#${data.tokenId}`}
      </p>
      <span
        className={classNames('absolute top-3 right-3 p-1 text-white text-xs font-bold uppercase', {
          'bg-[#FFB600]': getEdition(false, data.address) === NFTEdition.GoldEdition,
          'bg-[#7024C4]': getEdition(false, data.address) === NFTEdition.RangersEdition,
          'bg-gradient-linear-[(90deg,_#5C5C5C_0%,_#484848_100%)]':
            getEdition(false, data.address) === NFTEdition.UltimateEdition,
          'bg-[#b4b4b4]': getEdition(false, data.address) === NFTEdition.Default,
        })}
      >
        {getGalleryEdition(false, data.address)}
      </span>
    </div>
  )
}

export default GalleryItem
