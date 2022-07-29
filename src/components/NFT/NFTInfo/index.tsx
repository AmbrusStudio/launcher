import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC } from 'react'

import { NFTUpgradeInfo } from '../../../types'

const InfoButton = styled.button<{ color: string }>`
  padding: 0 20px;
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

const InfoTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`

const InfoTieleFirst = styled(InfoTitle)`
  color: #eb466d;
`
const InfoTieleSecond = styled(InfoTitle)`
  color: #ffa800;
`

const InfoList = styled.ul`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  margin: 12px 0 0 24px;
  padding: 0;
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
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #ffffff;
  padding: 0;
  margin: 12px 0 auto 0;
`

interface NFTInfoProps {
  upgradeInfo: NFTUpgradeInfo
  toggle: (value: boolean) => void
}

const NFTInfo: FC<NFTInfoProps> = ({ upgradeInfo, toggle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Stack
        spacing={10.25}
        sx={{
          width: '600px',
          height: '600px',
          backgroundColor: '#fff',
          p: 3,
        }}
      >
        {upgradeInfo.introduction.map((info, index) => (
          <div key={index}>
            <InfoTieleFirst>{info.first}</InfoTieleFirst>
            <InfoTieleSecond>{info.second}</InfoTieleSecond>
            <InfoList>
              {info.list.map((item, indexJ) => (
                <li key={indexJ}>{item.text}</li>
              ))}
            </InfoList>
          </div>
        ))}
      </Stack>
      <WrapperInfo>
        <Title>{upgradeInfo.title}</Title>
        <Description>{upgradeInfo.description}</Description>
        <Stack spacing={1.5}>
          <InfoButton color="#FF4125" onClick={() => alert('Up....')}>
            Start Staking Now
          </InfoButton>
          <InfoButton color="#A0A4B0" onClick={() => toggle(false)}>
            Cancel
          </InfoButton>
        </Stack>
      </WrapperInfo>
    </Box>
  )
}

export default NFTInfo
