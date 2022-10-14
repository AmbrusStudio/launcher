import classNames from 'classnames'
import { FC, useMemo } from 'react'

import { Metadata, Trait } from '../../../types'
import { imageSizeConversion, parseTokenId } from '../../../utils'
import TokenMedia from '../../TokenMedia'

interface GalleryItemProps {
  readonly data: Metadata
  onClick: () => void
}

const GalleryItem: FC<GalleryItemProps> = ({ data, onClick }) => {
  // TODO: Modify the way of judgment
  // TODO: Support Gold+ Rangers+ Ultimate
  const editionValue = useMemo<string>(() => {
    return data.attributes.find((i) => i.trait_type === Trait.Edition)?.value || '-'
  }, [data.attributes])

  return (
    <div className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer bg-[#383838]" onClick={onClick}>
      <TokenMedia src={imageSizeConversion(data.image, 800)} />
      <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
        #{parseTokenId(data.name)}
      </p>
      <span
        className={classNames('absolute top-3 right-3 p-1 text-white text-xs font-bold uppercase', {
          'bg-[#FFB600]': editionValue.toLocaleLowerCase() === 'gold',
          'bg-[#7024C4]': editionValue.toLocaleLowerCase() === 'rangers',
          'bg-[#b4b4b4]': editionValue.toLocaleLowerCase() === '-',
        })}
      >
        {editionValue}
      </span>
    </div>
  )
}

export default GalleryItem
