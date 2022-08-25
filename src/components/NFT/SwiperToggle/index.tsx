import 'swiper/css'

import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Swiper from 'swiper'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'

import { NFT_DATA } from '../../../data'

interface SwiperToggleProps {
  toggle: Dispatch<SetStateAction<number>>
}

const SwiperToggle: FC<SwiperToggleProps> = ({ toggle }) => {
  const [swiper, setSwiper] = useState<Swiper>()

  useEffect(() => {
    if (swiper) {
      ;(window as any).swiper1 = swiper
    }
  }, [swiper])

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
      {NFT_DATA.map((item, index) => (
        <SwiperSlide className="px-[6px] box-border" onClick={() => toggle(index)} key={index}>
          <div
            className={classNames('w-[100%] h-[100%] bg-white opacity-50', {
              'border-2 border-white !opacity-100': index === 0,
            })}
          >
            <img className="object-cover" src={item.cover} />
          </div>
        </SwiperSlide>
      ))}
    </SwiperReact>
  )
}

export default SwiperToggle
