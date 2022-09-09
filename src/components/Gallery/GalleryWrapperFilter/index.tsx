import { Dispatch, FC, SetStateAction } from 'react'

import { Metadata } from '../../../types'
import { parseTokenId } from '../../../utils'
import GalleryItem from '../GalleryItem'

interface Props {
  readonly allToken: Metadata[]
  setCurrentNFTInfo: Dispatch<SetStateAction<Metadata | undefined>>
  setVisibleNFT: Dispatch<SetStateAction<boolean>>
}

const GalleryWrapperFilter: FC<Props> = ({ allToken, setCurrentNFTInfo, setVisibleNFT }) => {
  return (
    <div className="mt-3 lg:mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {allToken.map((item) => (
          <GalleryItem
            key={parseTokenId(item.name)}
            data={item}
            onClick={() => {
              setCurrentNFTInfo(item)
              setVisibleNFT(true)
            }}
          />
        ))}
      </div>

      <div className="py-6 text-center">
        {allToken.length <= 0 && <span className="text-base text-white">No more data</span>}
      </div>
    </div>
  )
}

export default GalleryWrapperFilter
