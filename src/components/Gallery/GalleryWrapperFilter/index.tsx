import { Dispatch, FC, SetStateAction } from 'react'

import { TokenMetadata } from '../../../types'
import GalleryItem from '../GalleryItem'

interface Props {
  readonly allToken: TokenMetadata[]
  setCurrentNFTInfo: Dispatch<SetStateAction<TokenMetadata | undefined>>
  setVisibleNFT: Dispatch<SetStateAction<boolean>>
}

const GalleryWrapperFilter: FC<Props> = ({ allToken, setCurrentNFTInfo, setVisibleNFT }) => {
  return (
    <div className="mt-3 lg:mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {allToken.map((item, index) => (
          <GalleryItem
            key={`${item.address}_index_${index}_tokenId_${item.tokenId}`}
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
