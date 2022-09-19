import { FC } from 'react'
import Slider from 'react-slick'

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
    />
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
    />
  )
}

type AccountMyAssetProps = {
  data: { id: number; src: string }[]
}

const AssetsSlider: FC<AccountMyAssetProps> = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="overflow-hidden	">
      <Slider {...settings} className="mx-[-18px]">
        {data.map((asset) => (
          <AssetItem key={`asset-${asset.id}`} src={asset.src} onItemClick={() => null} />
        ))}
      </Slider>
    </div>
  )
}

export default AssetsSlider
