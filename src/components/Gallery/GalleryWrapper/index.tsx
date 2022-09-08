import CircularProgress from '@mui/material/CircularProgress'
import { cloneDeep } from 'lodash'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Metadata } from '../../../types'
import { parseTokenId } from '../../../utils'
import GalleryItem from '../GalleryItem'

interface Props {
  readonly allToken: Metadata[]
  readonly searchId: string
  readonly checkedFilterCategory: string[]
  setCurrentNFTInfo: Dispatch<SetStateAction<Metadata | undefined>>
  setVisibleNFT: Dispatch<SetStateAction<boolean>>
}

const LIMIT = 16

const GalleryWrapper: FC<Props> = ({ allToken, searchId, checkedFilterCategory, setCurrentNFTInfo, setVisibleNFT }) => {
  const loading = false
  const noMore = false

  const [items, setItems] = useState<Metadata[]>([])

  const fetchMoreData = useCallback(() => {
    setTimeout(() => {
      const list = cloneDeep(items)
      setItems(list.concat(allToken.slice(0, 20)))
    }, 1000)
  }, [items, allToken])

  return (
    <div>
      <div className="mt-3 lg:mt-6">
        {checkedFilterCategory.length || searchId ? (
          <>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<div className="text-base text-white">Loading...</div>}
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              {items.map((item, index) => (
                <GalleryItem
                  key={parseTokenId(item.name)}
                  data={item}
                  onClick={() => {
                    setCurrentNFTInfo(items[index])
                    setVisibleNFT(true)
                  }}
                />
              ))}
            </InfiniteScroll>
            {!allToken.length && (
              <div className="py-6 text-center">
                <span className="text-base text-white">No more data</span>
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="text-center">
                <CircularProgress
                  sx={{
                    color: 'white',
                  }}
                />
              </div>
            ) : (
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<div className="text-base text-white">Loading...</div>}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {items.map((item, index) => (
                  <GalleryItem
                    key={parseTokenId(item.name)}
                    data={item}
                    onClick={() => {
                      setCurrentNFTInfo(items[index])
                      setVisibleNFT(true)
                    }}
                  />
                ))}
              </InfiniteScroll>
            )}

            <div className="py-6 text-center">
              {noMore && <span className="text-base text-white">No more data</span>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GalleryWrapper
