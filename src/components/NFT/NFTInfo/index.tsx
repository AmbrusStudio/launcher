import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

import { NFT, NFTUpgradeState } from '../../../types'
import NFTAnnouncement from '../NFTAnnouncement'
import StatusCheck from '../StatusCheck'

const InfoButton = styled.button<{ color: string }>`
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

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0;
  margin: 0;
`
const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #ffffff;
  padding: 0;
  margin: 12px 0 auto 0;
`

interface NFTInfoProps {
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const NFTInfo: FC<NFTInfoProps> = ({ nft, toggle }) => {
  return (
    <>
      <div className="lg:w-[600px] lg:h-[600px] overflow-auto bg-white p-6 grid gap-y-20.5">
        {nft.upgradeInfo.introduction.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo>
        <Title>{nft.upgradeInfo.title}</Title>
        {nft.description && <Description>{nft.description}</Description>}
        {nft.upgrade === NFTUpgradeState.Upgrade ? (
          <Stack spacing={1.5} className="mt-6">
            <InfoButton color="#FF4125" onClick={() => alert('Up....')}>
              Start Staking Now
            </InfoButton>
            <InfoButton color="#A0A4B0" onClick={() => toggle(false)}>
              Cancel
            </InfoButton>
          </Stack>
        ) : nft.upgrade === NFTUpgradeState.CheckUpgradingStatus && nft.upgradeInfo.upgradingStatusInfo ? (
          <StatusCheck nft={nft} toggle={toggle} />
        ) : null}
      </WrapperInfo>
    </>
  )
}

export default NFTInfo
