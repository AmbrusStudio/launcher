import 'swiper/css'

import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Swiper from 'swiper'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'

interface SwiperToggleProps {
  readonly currentIndex: number
  readonly nfts: NFTE4CRanger[]
  toggle: Dispatch<SetStateAction<number>>
}

const SwiperToggle: FC<SwiperToggleProps> = ({ nfts, toggle, currentIndex }) => {
  const [swiper, setSwiper] = useState<Swiper>()

  return (
    <SwiperReact
      spaceBetween={0}
      slidesPerView={2}
      centeredSlidesBounds={true}
      onSlideChange={(swiper) => setSwiper(swiper)}
      onSwiper={(swiper) => setSwiper(swiper)}
      loop={true}
      autoHeight={true}
      centerInsufficientSlides={true}
      autoplay
      className="!px-6"
    >
      {nfts.map((nft, index) => (
        <SwiperSlide
          className="px-[6px] box-border"
          onClick={() => {
            toggle(index)

            if (index > currentIndex || (index === 0 && currentIndex === nfts.length - 1)) {
              swiper?.slideNext()
            } else if (index < currentIndex || (index === nfts.length - 1 && currentIndex === 0)) {
              swiper?.slidePrev()
            }
          }}
          key={nft.tokenId}
        >
          <div
            className={classNames('w-[100%] h-[100%] bg-white opacity-50', {
              'border-2 border-white !opacity-100': index === currentIndex,
            })}
          >
            <img className="object-cover" src={imageSizeConversion(nft.image, 800)} />
          </div>
        </SwiperSlide>
      ))}
    </SwiperReact>
  )
}

export default SwiperToggle
