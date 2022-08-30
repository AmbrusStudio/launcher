import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

import { NFT_DATA } from '../../../data'
import NFTAnnouncement from '../NFTAnnouncement'

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

interface StakeInfoProps {
  toggle: (value: boolean) => void
  stake: () => void
}

const StakeInfo: FC<StakeInfoProps> = ({ toggle, stake }) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="lg:w-[600px] lg:h-[600px] overflow-auto bg-white p-6 grid gap-y-20.5">
        {NFT_DATA[0].upgradeInfo.introduction.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo>
        <Title>Stake to Upgrade</Title>
        <Description>Staking Descriptions</Description>
        <Stack spacing={1.5} className="mt-6">
          <InfoButton color="#FF4125" onClick={() => stake()}>
            Start Staking Now
          </InfoButton>
          <InfoButton color="#A0A4B0" onClick={() => toggle(false)}>
            Cancel
          </InfoButton>
        </Stack>
      </WrapperInfo>
    </div>
  )
}

export default StakeInfo
