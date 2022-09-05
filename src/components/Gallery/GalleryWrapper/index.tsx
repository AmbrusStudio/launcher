import CircularProgress from '@mui/material/CircularProgress'
import { useInfiniteScroll } from 'ahooks'
import { Dispatch, FC, SetStateAction, useRef } from 'react'

import { ALL_METADATA } from '../../../data'
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

interface InfiniteScrollResult {
  list: Metadata[]
  total: number
}

const PAGE_SIZE = 16

function getLoadMoreList(page: number, pageSize: number): Promise<InfiniteScrollResult> {
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const list = ALL_METADATA.slice(start, end)
  return new Promise((resolve) => {
    resolve({
      list: list,
      total: ALL_METADATA.length,
    })
  })
}

const GalleryWrapper: FC<Props> = ({ allToken, searchId, checkedFilterCategory, setCurrentNFTInfo, setVisibleNFT }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
      return getLoadMoreList(page, PAGE_SIZE)
    },
    {
      target: ref,
      isNoMore: (d) => !!(d?.list && d.list.length >= d.total),
    }
  )

  return (
    <div className="mt-3 lg:mt-6 h-[928px] filter-category-scrollbar overflow-auto" ref={ref}>
      {checkedFilterCategory.length || searchId ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {allToken.map((item, index) => (
              <GalleryItem
                key={parseTokenId(item.name)}
                data={item}
                onClick={() => {
                  setCurrentNFTInfo(allToken[index])
                  setVisibleNFT(true)
                }}
              />
            ))}
          </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {data?.list?.map((item, index) => (
                <GalleryItem
                  key={parseTokenId(item.name)}
                  data={item}
                  onClick={() => {
                    setCurrentNFTInfo(allToken[index])
                    setVisibleNFT(true)
                  }}
                />
              ))}
            </div>
          )}

          <div className="py-6 text-center">
            {!noMore && (
              <button type="button" onClick={loadMore} disabled={loadingMore} className="text-base text-white">
                {loadingMore ? 'Loading more...' : 'Click to load more'}
              </button>
            )}

            {/* {noMore && <span className="text-base text-white">No more data</span>} */}
          </div>
        </>
      )}
    </div>
  )
}

export default GalleryWrapper
