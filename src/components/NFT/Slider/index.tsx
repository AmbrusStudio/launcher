import { useSize } from 'ahooks'
import classNames from 'classnames'
import { Dispatch, FC, MouseEvent, SetStateAction, useCallback, useMemo, useRef } from 'react'
import Slider from 'react-slick'

import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'

interface Props {
  readonly nfts: NFTE4CRanger[]
  readonly active: number
  setActive: Dispatch<SetStateAction<number>>
}

const SimpleSlider: FC<Props> = ({ nfts, active, setActive }) => {
  const size = useSize(document.querySelector('body'))
  const sliderRef = useRef<Slider>(null)
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
    arrows: false,
    variableWidth: true,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setActive(newIndex)
    },
  }

  const handleSlickGoTo = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // TODO: modify get index
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataIndex = (e.target as any).parentElement.parentElement.parentElement.parentElement.getAttribute(
      'data-index'
    )

    dataIndex && sliderRef.current?.slickGoTo(parseInt(dataIndex))
  }, [])

  return (
    <div
      className="w-full mx-auto mb-6"
      style={{
        height: mediaWidth,
      }}
    >
      <Slider {...settings} ref={sliderRef}>
        {nfts.map((nft, index) => (
          <div key={`${nft.address}_${nft.tokenId}`} onClick={handleSlickGoTo}>
            <div
              style={{
                width: mediaWidth,
                height: mediaWidth,
              }}
              data-token-index={index}
              className={classNames('border-2 border-solid mx-[6px] text-center bg-[#2A2A2A] box-border', {
                'opacity-50 border-transparent': index !== active,
                'opacity-100 border-white': index === active,
              })}
            >
              <TokenMedia src={imageSizeConversion(nft.image, 800)} trait={nft.trait} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
