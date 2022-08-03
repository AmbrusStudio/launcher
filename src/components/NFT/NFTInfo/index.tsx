import 'react-circular-progressbar/dist/styles.css'

import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'

import { NFT, NFTUpgradeState } from '../../../types'
import CloseCheck from '../../Icon/CloseCheck'
import SuccessCheck from '../../Icon/SuccessCheck'
import ModalCustom from '../../ModalCustom'

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

const CheckSuccess = styled(Box)`
  width: 108px;
  height: 108px;
  background: #88a70d;
  border: 1px solid #4a4a4a;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`
const CircularProgressbarWrap = styled.div`
  width: 108px;
  height: 108px;
`
const ConfirmationDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #4a4a4a;
  padding: 0;
  margin: 0;
`

interface NFTInfoProps {
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const NFTInfo: FC<NFTInfoProps> = ({ nft, toggle }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const status = useMemo(() => {
    return nft.upgradeInfo.upgradingStatusInfo?.stakeStatus && nft.upgradeInfo.upgradingStatusInfo?.badgeStatus
  }, [nft])

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
        ) : nft.upgrade === NFTUpgradeState.CheckUpgradingStatus && nft.upgradeInfo.upgradingStatusInfo ? (
          <>
            <Stack spacing={1.5} direction="row">
              <CheckCard spacing={1.625}>
                <CircularProgressbarWrap>
                  <CircularProgressbarWithChildren
                    value={nft.upgradeInfo.upgradingStatusInfo.stakeValue}
                    strokeWidth={22}
                    styles={buildStyles({
                      strokeLinecap: 'butt',
                      pathColor: '#ff5925',
                    })}
                  >
                    {nft.upgradeInfo.upgradingStatusInfo.stakeStatus && (
                      <SuccessCheck
                        sx={{
                          fontSize: '36px',
                        }}
                      />
                    )}
                  </CircularProgressbarWithChildren>
                </CircularProgressbarWrap>

                <div>
                  <CheckDescription>{nft.upgradeInfo.upgradingStatusInfo.stakeDescription}</CheckDescription>
                  <CheckDescriptionDay>(24 days left)</CheckDescriptionDay>
                </div>
              </CheckCard>
              <CheckCard spacing={1.625}>
                {nft.upgradeInfo.upgradingStatusInfo.badgeStatus ? (
                  <CheckSuccess>
                    <SuccessCheck
                      sx={{
                        fontSize: '36px',
                      }}
                    />
                  </CheckSuccess>
                ) : (
                  <CheckFail>
                    <CloseCheck
                      sx={{
                        fontSize: '50px',
                      }}
                    />
                  </CheckFail>
                )}

                <CheckDescription>{nft.upgradeInfo.upgradingStatusInfo.badgeDescription}</CheckDescription>
              </CheckCard>
            </Stack>

            <Stack
              spacing={1.5}
              sx={{
                mt: 3,
              }}
            >
              <InfoButton
                color={status ? '#FF4125' : '#A0A4B0'}
                onClick={() => {
                  status && setVisibleUpgrade(true)
                }}
              >
                Upgrade
              </InfoButton>
              <InfoButton color="#2A2A2A" onClick={() => setVisibleUnstake(true)}>
                Unstake
              </InfoButton>
              <InfoButton color="#2A2A2A" onClick={() => toggle(false)}>
                Cancel
              </InfoButton>
            </Stack>
            <ModalCustom
              title={'Are you sure?'}
              visible={visibleUnstake}
              toggle={(value) => setVisibleUnstake(value)}
              close={false}
            >
              <Stack
                spacing={3}
                sx={{
                  p: 4.5,
                  overflow: 'auto',
                }}
              >
                <ConfirmationDescription>
                  Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the
                  future.
                </ConfirmationDescription>
                <InfoButton color="#2A2A2A">Yes, Reset upgrading status</InfoButton>
                <InfoButton color="#2A2A2A" onClick={() => setVisibleUnstake(false)}>
                  Cancel
                </InfoButton>
              </Stack>
            </ModalCustom>
            <ModalCustom
              title={'Upgrade your NFT?'}
              visible={visibleUpgrade}
              toggle={(value) => setVisibleUpgrade(value)}
            >
              <Stack
                spacing={3}
                sx={{
                  p: 4.5,
                  overflow: 'auto',
                }}
              >
                <ConfirmationDescription>
                  You’ll earn a lot more benefits after upgrading your NFT. You can only upgrade this NFT whilel it’s
                  still staked.
                </ConfirmationDescription>
                <InfoButton color="#FF4125">Upgrade and unstake</InfoButton>
                <InfoButton color="#2A2A2A" onClick={() => setVisibleUpgrade(false)}>
                  Cancel
                </InfoButton>
              </Stack>
            </ModalCustom>
          </>
        ) : null}
      </WrapperInfo>
    </Box>
  )
}

export default NFTInfo
