import { Dispatch, FC, SetStateAction } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import BlindBox from '../../BlindBox'

interface Props {
  readonly nfts: NFTE4CRanger[]
  setActive: Dispatch<SetStateAction<number>>
}
const slidesToShow = 2

const SimpleSlider: FC<Props> = ({ nfts, setActive }) => {
  const settings = {
    className: 'sliderWrapper',
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    centerPadding: '20px',
    arrows: false,
    adaptiveHeight: true,
    afterChange: (current: number) => setActive(current),
  }

  return (
    <>
      {nfts.length < 4 ? (
        <div>
          {nfts.map((nft, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="opacity-50 border-2 border-white border-solid mx-[6px] text-center bg-[#2A2A2A] box-border"
            >
              <BlindBox />
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {nfts.map((nft, index) => (
            <div key={index}>
              <div className="opacity-50 border-2 border-white border-solid mx-[6px] text-center bg-[#2A2A2A] box-border">
                <BlindBox />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </>
  )
}

export default SimpleSlider
