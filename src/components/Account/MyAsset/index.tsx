import { FC } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import { IconArrowDown } from '../../Icon'
import TokenMedia from '../../TokenMedia'

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        width: '60px',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 21px',
        background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 1,
        transform: 'translate(-43px, -50%)',
      }}
      onClick={onClick}
    >
      <IconArrowDown className="text-white rotate-270 w-4 h-4" />
    </div>
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        width: '60px',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 21px',
        background: 'linear-gradient(-270deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 1,
        transform: 'translate(43px, -50%)',
      }}
      onClick={onClick}
    >
      <IconArrowDown className="text-white rotate-90 w-4 h-4" />
    </div>
  )
}

type AccountMyAssetProps = {
  data: NFTE4CRanger[]
}

const slidesToShow = 5

const AssetsSlider: FC<AccountMyAssetProps> = ({ data }) => {
  const settings = {
    className: 'assetsSliderWrapper',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="overflow-hidden">
      {data.length <= slidesToShow ? (
        <div className="flex flex-wrap w-full">
          {data.map((nft) => (
            <div
              className="w-[240px] h-[240px] mr-9 mb-9 rounded-12px object-cover select-none border-1 border-white last-of-type:mr-0 box-border overflow-hidden"
              key={`${nft.address}_${nft.tokenId}`}
            >
              <TokenMedia src={imageSizeConversion(nft.image, 2000)} />
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {data.map((nft) => (
            <div className="px-[18px]" key={`${nft.address}_${nft.tokenId}`}>
              <div className="w-full h-full rounded-12px object-cover select-none border-1 border-white box-border overflow-hidden">
                <TokenMedia src={imageSizeConversion(nft.image, 2000)} />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default AssetsSlider
