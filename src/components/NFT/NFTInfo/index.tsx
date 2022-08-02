import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC } from 'react'

import { NFT, NFTUpgradeState } from '../../../types'
import CloseCheck from '../../Icon/CloseCheck'

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
  font-family: 'Montserrat', sans-serif;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #ffffff;
  padding: 0;
  margin: 12px 0 auto 0;
`
const CheckCard = styled(Stack)`
  background: #2a2a2a;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CheckDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  padding: 0;
  margin: 0;
`
const CheckDescriptionDay = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #ff4125;
  padding: 0;
  margin: 0;
`

const CheckFail = styled(Box)`
  width: 108px;
  height: 108px;
  background: #465358;
  border: 1px solid #4a4a4a;
  border-radius: 100%;
  box-shadow: inset 0px 2px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a4b0;
`

interface NFTInfoProps {
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const NFTInfo: FC<NFTInfoProps> = ({ nft, toggle }) => {
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
        {nft.upgradeInfo.introduction.map((info, index) => (
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
        <Title>{nft.upgradeInfo.title}</Title>
        <Description>{nft.upgradeInfo.description}</Description>
        {nft.upgrade === NFTUpgradeState.Upgrade ? (
          <Stack spacing={1.5}>
            <InfoButton color="#FF4125" onClick={() => alert('Up....')}>
              Start Staking Now
            </InfoButton>
            <InfoButton color="#A0A4B0" onClick={() => toggle(false)}>
              Cancel
            </InfoButton>
          </Stack>
        ) : nft.upgrade === NFTUpgradeState.CheckUpgradingStatus ? (
          <>
            <Stack spacing={1.5} direction="row">
              <CheckCard spacing={1.625}>
                <div>1</div>
                <CheckDescription>It has been staked for at least 90 days</CheckDescription>
                <CheckDescriptionDay>(24 days left)</CheckDescriptionDay>
              </CheckCard>
              <CheckCard spacing={1.625}>
                <CheckFail>
                  <CloseCheck
                    sx={{
                      fontSize: '50px',
                    }}
                  />
                </CheckFail>
                <CheckDescription>You have claimed the “xxx” Soulbound Badge in our Discord</CheckDescription>
              </CheckCard>
            </Stack>

            <Stack
              spacing={1.5}
              sx={{
                mt: 3,
              }}
            >
              <InfoButton color="#A0A4B0">Upgrade</InfoButton>
              <InfoButton color="#2A2A2A">Unstake</InfoButton>
              <InfoButton color="#2A2A2A">Cancel</InfoButton>
            </Stack>
          </>
        ) : null}
      </WrapperInfo>
    </Box>
  )
}

export default NFTInfo
