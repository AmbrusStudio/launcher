import styled from '@emotion/styled'

import RightArrow from '../../../assets/images/svgs/right-arrow.svg'
import { Button } from '../../Forms'

type AccountMyAssetProps = {
  src: string
  title: string
  details: string
  category: string
}

const Overlay = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 132px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 0 0 24px 24px;

  .content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

export function AccountShopCard({ src, category, title, details }: AccountMyAssetProps) {
  return (
    <div className="h-308px relative">
      <img className="w-712px h-full rounded-24px select-none" src={src} alt="Shop Card Image" loading="lazy" />
      <Overlay>
        <div className="content">
          <div className="w-fit text-14px text-black bg-grey-medium px-4px">{category}</div>
          <h3 className="font-bold text-24px leading-30px uppercase text-white">{title}</h3>
          <span className="text-14px text-white">{details}</span>
        </div>
        <Button variant="primary" className="w-221px h-60px hover:!bg-rust/85 hover:!text-white">
          <span>
            Buy Now
            <img className="inline pl-16px" alt="right arrow" src={RightArrow} />
          </span>
        </Button>
      </Overlay>
    </div>
  )
}
