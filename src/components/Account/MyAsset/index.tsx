import 'swiper/css'
import 'swiper/css/navigation'

import { FC } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'

type AccountMyAssetProps = {
  data: NFTE4CRanger[]
}

const AssetsSlider: FC<AccountMyAssetProps> = ({ data }) => {
  return (
    <>
      {data.length < 5 ? (
        <div className="w-full flex snap-x snap-mandatory overflow-x-auto">
          {data.map((nft) => (
            <div
              className="snap-start w-[240px] h-[240px] shrink-0 mr-9 mb-9 last-of-type:mr-0  rounded-12px object-cover select-none border-1 border-white box-border overflow-hidden"
              key={`${nft.address}_${nft.tokenId}`}
            >
              <TokenMedia src={imageSizeConversion(nft.image, 800)} />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          spaceBetween={36}
          slidesPerView={'auto'}
          navigation={true}
          modules={[Navigation]}
          className="assets-swiper"
        >
          {data.map((nft, index) => (
            <SwiperSlide key={`${nft.address}_${nft.tokenId}`}>
              <div
                data-index={index}
                data-token-id={nft.tokenId}
                className="w-full h-full rounded-12px object-cover select-none border-1 border-white box-border overflow-hidden"
              >
                <TokenMedia src={imageSizeConversion(nft.image, 800)} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default AssetsSlider
