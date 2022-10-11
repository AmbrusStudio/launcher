import { useSize } from 'ahooks'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'

interface Props {
  readonly nfts: NFTE4CRanger[]
  readonly active: number
  setActive: Dispatch<SetStateAction<number>>
}
const slidesToShow = 2

const SimpleSlider: FC<Props> = ({ nfts, active, setActive }) => {
  const size = useSize(document.querySelector('body'))
  const mediaWidth = useMemo<string>(() => {
    if (size) {
      // 48 = 24 * 2 padding
      // 12 = 6 * 2 padding
      // 60 = 48 + 12
      return (size.width - 60) / 2 + 'px'
    } else {
      return '160px'
    }
  }, [size])

  const settings = {
    className: 'sliderWrapper',
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: slidesToShow,
    centerPadding: '20px',
    arrows: false,
    adaptiveHeight: true,
    autoplay: false,
    initialSlide: active,
    afterChange: (current: number) => setActive(current),
  }

  return (
    <div className="w-full mx-auto">
      {nfts.length < 4 ? (
        <div className="flex flex-nowrap overflow-x-auto py-6">
          {nfts.map((nft, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              style={{
                width: mediaWidth,
                height: mediaWidth,
              }}
              className={classNames(
                'shrink-0 w-[160px] h-[160px] border-2 border-solid mx-[6px] first:ml-6 last:mr-6 text-center bg-[#2A2A2A] box-border',
                {
                  'opacity-50 border-transparent': index !== active,
                  'opacity-100 border-white': index === active,
                }
              )}
            >
              <TokenMedia src={imageSizeConversion(nft.image, 2000)} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="py-6 box-content"
          style={{
            height: mediaWidth,
          }}
        >
          <Slider {...settings}>
            {nfts.map((nft, index) => (
              <div key={index}>
                <div
                  style={{
                    width: mediaWidth,
                    height: mediaWidth,
                  }}
                  data-index={index}
                  className="opacity-50 border-2 border-transparent border-solid mx-[6px] text-center bg-[#2A2A2A] box-border"
                >
                  <TokenMedia src={imageSizeConversion(nft.image, 2000)} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default SimpleSlider
