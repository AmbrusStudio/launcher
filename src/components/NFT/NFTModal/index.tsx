import styled from '@emotion/styled'
import { FC, useState } from 'react'

import { NFT } from '../../../types'
import { ArrowUp } from '../../Icon'
import Close from '../../Icon/Close'
import NFTAnnouncement from '../NFTAnnouncement'
import StatusCheck from '../StatusCheck'

const InfoButton = styled.button<{ color: string }>`
  padding: 20px 0;
  background: ${(p) => p.color || '#ff4125'};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
`
const DrawerButton = styled.button<{ color: string }>`
  background: ${(p) => p.color || '#ff4125'};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
`

interface NFTModalProps {
  readonly visible: boolean
  readonly title: string
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const NFTModal: FC<NFTModalProps> = ({ visible, toggle, title, nft }) => {
  const [drawer, setDrawer] = useState<boolean>(false)
  return (
    <>
      {visible && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col z-11">
          <div className="bg-black/70 backdrop-blur-md drop-shadow-statusCheck-head-modal text-white p-6 flex items-center justify-between z-12">
            <span className="font-bold text-2xl leading-[29px] text-white not-italic uppercase">{title}</span>
            <Close
              onClick={() => toggle(false)}
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
              <p className="font-normal text-base leading-[30px] text-white not-italic">
                {nft.upgradeInfo.description}
              </p>
            </div>
          </div>
          {/* <Actions className="fixed left-6 bottom-6 right-6" color={'#ff4125'}>
            Start Staking Now
          </Actions> */}
          <InfoButton
            className="fixed left-6 bottom-6 right-6 flex items-center justify-center"
            color={'#ff4125'}
            onClick={() => {
              setDrawer(true)
            }}
          >
            My Status
            <ArrowUp className="!text-base ml-3" />
          </InfoButton>

          {drawer && (
            <div className="fixed z-12 left-0 right-0 bottom-0">
              <div
                className="py-[10px] bg-black shadow-statusCheck-drawer-modal flex items-center justify-center"
                onClick={() => {
                  setDrawer(false)
                }}
              >
                <ArrowUp className="!text-base rotate-180" />
              </div>
              <div className="p-6 bg-black/70 backdrop-blur-[10px] shadow-statusCheck-drawer-modal">
                <StatusCheck nft={nft} toggle={(value) => console.log(value)} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default NFTModal
