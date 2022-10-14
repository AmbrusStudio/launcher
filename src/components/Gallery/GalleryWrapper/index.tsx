import CircularProgress from '@mui/material/CircularProgress'
import { useInfiniteScroll } from 'ahooks'
import { Dispatch, FC, SetStateAction } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Metadata } from '../../../types'
import { parseTokenId } from '../../../utils'
import GalleryItem from '../GalleryItem'

interface Props {
  readonly allToken: Metadata[]
  setCurrentNFTInfo: Dispatch<SetStateAction<Metadata | undefined>>
  setVisibleNFT: Dispatch<SetStateAction<boolean>>
}

interface ListResult {
  list: Metadata[]
  total: number
}

function getLoadMoreList(page: number, pageSize: number, data: Metadata[]): Promise<ListResult> {
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const list = data.slice(start, end)
  return new Promise((resolve) => {
    resolve({
      list,
      total: data.length,
    })
  })
}

const PAGE_SIZE = 16

const GalleryWrapper: FC<Props> = ({ allToken, setCurrentNFTInfo, setVisibleNFT }) => {
  const { data, loading, loadMore } = useInfiniteScroll((d) => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    return getLoadMoreList(page, PAGE_SIZE, allToken)
  })

  const hasMore = !!(data && data.list.length < data.total)

  return (
    <div className="mt-3 lg:mt-6">
      {loading ? (
        <div className="text-center">
          <CircularProgress
            sx={{
              color: 'white',
            }}
          />
        </div>
      ) : (
        <>
          <InfiniteScroll
            dataLength={data?.list.length || 0}
            next={loadMore}
            hasMore={hasMore}
            loader={<div className="text-base text-white">Loading...</div>}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {data?.list.map((item, index) => (
              <GalleryItem
                key={`index_${index}_tokenId_${parseTokenId(item.name)}`}
                data={item}
                onClick={() => {
                  setCurrentNFTInfo(item)
                  setVisibleNFT(true)
                }}
              />
            ))}
          </InfiniteScroll>
          <div className="py-6 text-center">
            {!hasMore && <span className="text-base text-white">No more data</span>}
          </div>
        </>
      )}
    </div>
  )
}

export default GalleryWrapper
