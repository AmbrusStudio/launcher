import CircularProgress from '@mui/material/CircularProgress'
import { useInfiniteScroll } from 'ahooks'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useMetadataBaseURL } from '../../../hooks/useMetadataBaseURL'
import { TokenMetadata } from '../../../types'
import { galleryEditionPlus, getBaseURLByAddress } from '../../../utils'
import GalleryItem from '../GalleryItem'

interface Props {
  readonly allToken: TokenMetadata[]
  setCurrentNFTInfo: Dispatch<SetStateAction<TokenMetadata | undefined>>
  setVisibleNFT: Dispatch<SetStateAction<boolean>>
}

interface ListResult {
  list: TokenMetadata[]
  total: number
}

async function getLoadMoreList(
  page: number,
  pageSize: number,
  data: TokenMetadata[],
  baseURL: {
    goldEditionBaseURL: string
    rangersEditionBaseURL: string
    ultimateEditionBaseURL: string
  }
): Promise<ListResult> {
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const list = data.slice(start, end)

  const currentBaseURL = list.map((i) => getBaseURLByAddress(i.address, baseURL))
  const tokens = await galleryEditionPlus(list, currentBaseURL)

  return new Promise((resolve) => {
    resolve({
      list: tokens,
      total: data.length,
    })
  })
}

const PAGE_SIZE = 16

const GalleryWrapper: FC<Props> = ({ allToken, setCurrentNFTInfo, setVisibleNFT }) => {
  const { metadadaGoldBaseURI, metadadaRangersBaseURI, metadadaUltimateBaseURI } = useMetadataBaseURL()

  const { data, loading, loadMore, reload } = useInfiniteScroll(async (d) => {
    const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1
    return getLoadMoreList(page, PAGE_SIZE, allToken, {
      goldEditionBaseURL: metadadaGoldBaseURI,
      rangersEditionBaseURL: metadadaRangersBaseURI,
      ultimateEditionBaseURL: metadadaUltimateBaseURI,
    })
  })

  const hasMore = !!(data && data.list.length < data.total)

  useEffect(() => {
    if (allToken) {
      reload()
    }
  }, [allToken, reload])

  return (
    <div className="mt-3 lg:mt-6">
      {loading ? (
        <div className="text-center py-6 ">
          <CircularProgress className="w-6! h-6! text-white!" />
        </div>
      ) : (
        <>
          <InfiniteScroll
            dataLength={data?.list.length || 0}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center col-span-2 lg:col-span-3 xl:col-span-4 py-6 ">
                <CircularProgress className="w-6! h-6! text-white!" />
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {data?.list.map((item, index) => (
              <GalleryItem
                key={`${item.address}_index_${index}_tokenId_${item.tokenId}`}
                data={item}
                onClick={() => {
                  setCurrentNFTInfo(item)
                  setVisibleNFT(true)
                }}
              />
            ))}
          </InfiniteScroll>
          {!hasMore && <div className="py-6 text-center text-base text-white">No more data</div>}
        </>
      )}
    </div>
  )
}

export default GalleryWrapper
