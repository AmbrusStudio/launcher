import { FC } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import { IconArrowDown } from '../../Icon'

type AssetItemProps = {
  src: string
  onItemClick: React.MouseEventHandler<HTMLDivElement>
}

function AssetItem(props: AssetItemProps) {
  const { src, onItemClick } = props
  return (
    <div className="mx-[18px]" onClick={onItemClick}>
      <img
        className="w-full h-full rounded-12px object-cover select-none border-1 border-white"
        src={src}
        alt="Asset Image"
        loading="lazy"
      />
    </div>
  )
}

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

const AssetsSlider: FC<AccountMyAssetProps> = ({ data }) => {
  const settings = {
    className: 'assetsSliderWrapper',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {data.map((asset) => (
          <AssetItem
            key={`asset-${asset.tokenId}`}
            src={imageSizeConversion(asset.image, 800)}
            onItemClick={() => null}
          />
        ))}
      </Slider>
    </div>
  )
}

export default AssetsSlider
