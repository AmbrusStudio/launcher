import classNames from 'classnames'
import { FC, useMemo } from 'react'

import { NFTEdition, TokenMetadata, TraitEdition } from '../../../types'
import { TokenMediaMode } from '../../../types/tokenMedia'
import { getEdition, getTraitEdition, imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'

interface GalleryItemProps {
  readonly data: TokenMetadata
  onClick: () => void
}

const GalleryItem: FC<GalleryItemProps> = ({ data, onClick }) => {
  const edition = useMemo<TraitEdition | undefined>(() => getTraitEdition(data), [data])

  return (
    <div className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer bg-[#383838]" onClick={onClick}>
      <TokenMedia src={imageSizeConversion(data.image, 800)} trait={data.trait} mode={TokenMediaMode.Thumbnail} />
      <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
        {getEdition(false, data.address) === NFTEdition.UltimateEdition ? data.name : `#${data.tokenId}`}
      </p>
      <span
        className={classNames('absolute top-3 right-3 p-1 text-white text-xs font-bold uppercase', {
          'bg-[#FFB600]': edition === TraitEdition.Gold,
          'bg-gradient-linear-[(90deg,_#FFB600_0%,_#EB456D_100%)]': edition === TraitEdition.ColdPlus,
          'bg-[#7024C4]': edition === TraitEdition.Rangers,
          'bg-gradient-linear-[(90deg,_#7024C4_0%,_#EB456D_100%)]': edition === TraitEdition.RangersPlus,
          'bg-gradient-linear-[(90deg,_#5C5C5C_0%,_#484848_100%)]': edition === TraitEdition.Ultimate,
          'bg-[#b4b4b4]': !edition,
        })}
      >
        {edition || '-'}
      </span>
    </div>
  )
}

export default GalleryItem
