import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Dispatch, FC, SetStateAction } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'

interface Props {
  readonly nfts: NFTE4CRanger[]
  setActive: Dispatch<SetStateAction<number>>
}

const SimpleSlider: FC<Props> = ({ nfts, setActive }) => {
  const settings = {
    className: 'sliderWrapper',
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    centerPadding: '20px',
    arrows: false,
    adaptiveHeight: true,
    afterChange: (current: number) => setActive(current),
  }

  return (
    <Slider {...settings}>
      {nfts.map((nft, index) => (
        <div key={index}>
          <div className="opacity-50 border-2 border-white border-solid mx-[6px] text-center bg-[#2A2A2A] box-border">
            <img className="object-cover" src={imageSizeConversion(nft.image, 800)} />
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default SimpleSlider
