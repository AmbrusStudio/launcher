import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC, useMemo } from 'react'
import Progressbar from 'react-js-progressbar'

import { NFTE4CRanger } from '../../../types'
import CloseCheck from '../../Icon/CloseCheck'
import SuccessCheck from '../../Icon/SuccessCheck'

const Card = styled(Stack)`
  background: #2a2a2a;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

interface CheckCardProps {
  readonly nft: NFTE4CRanger
}

const CheckCard: FC<CheckCardProps> = ({ nft }) => {
  const upgradeDuration = 60 // 60s
  const totalStakingTime = 0 // 60s
  const soulboundBadge = useMemo(() => false, [])

  return (
    <>
      {true && (
        <Stack spacing={1.5} direction="row">
          <Card spacing={1.5} className="p-3 xl:p-6">
            <div className="w-[108px] h-[108px] relative">
              <Progressbar
                input={upgradeDuration}
                pathWidth={44}
                pathColor={['#FF5925', '#FF00F5']} // use an array for gradient color.
                trailWidth={44}
                trailColor="rgba(255, 255, 255, 0.2)"
                customText=""
                pathLinecap="butt"
                animation={{
                  duration: 0,
                }}
              ></Progressbar>
              {false && (
                <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center text-white">
                  <SuccessCheck
                    sx={{
                      fontSize: '36px',
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <p className="font-normal text-xs xl:text-base leading-5 text-center text-white not-italic">
                It has been staked for at least 90 days
              </p>
              <p className="font-normal text-xs leading-5 text-center text-rust not-italic">(24 days left)</p>
            </div>
          </Card>
          <Card spacing={1.5} className="p-3 xl:p-6">
            {soulboundBadge ? (
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

            <p className="font-normal text-xs xl:text-base leading-5 text-center text-white not-italic">
              You have claimed the “xxx” Soulbound Badge in our Discord
            </p>
          </Card>
        </Stack>
      )}
    </>
  )
}

export default CheckCard
