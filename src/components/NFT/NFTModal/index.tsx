import styled from '@emotion/styled'
import { FC } from 'react'

import { NFT } from '../../../types'
import Close from '../../Icon/Close'
import NFTAnnouncement from '../NFTAnnouncement'

const InfoButton = styled.button<{ color: string }>`
  padding: 8px 0;
  background: ${(p) => p.color || '#ff4125'};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  min-height: 46px;
  min-width: 160px;
  display: inline-block;
  cursor: pointer;
`

const Actions = styled(InfoButton)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

interface NFTModalProps {
  readonly title: string
  readonly nft: NFT
}

const NFTModal: FC<NFTModalProps> = ({ title, nft }) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col z-11">
      <div className="bg-black/70 backdrop-blur-md text-white p-6 flex items-center justify-between">
        <span className="font-bold text-2xl leading-[29px] text-white not-italic uppercase">{title}</span>
        <Close
          onClick={() => console.log(false)}
          sx={{
            fontSize: '22px',
            cursor: 'pointer',
          }}
        />
      </div>
      <div className="overflow-auto bg-black flex-1">
        <div className="bg-white backdrop-blur-md px-6 pt-6 pb-[109px] grid gap-y-[36px]">
          {nft.upgradeInfo.introduction.map((item, index) => (
            <NFTAnnouncement data={item} key={index} />
          ))}
        </div>
        <div className="bg-black backdrop-blur-md p-6">
          <p className="font-normal text-base leading-[30px] text-white not-italic">{nft.upgradeInfo.description}</p>
        </div>
      </div>
      <Actions className="fixed left-6 bottom-6 right-6" color={'#ff4125'}>
        Start Staking Now
      </Actions>
    </div>
  )
}

export default NFTModal
