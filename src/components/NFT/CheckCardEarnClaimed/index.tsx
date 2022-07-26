import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { FC } from 'react'

import CloseCheck from '../../Icon/CloseCheck'
import SuccessCheck from '../../Icon/SuccessCheck'

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
  readonly soulboundBadgeStatus: boolean
}

const CheckCardEarnClaimed: FC<CheckCardProps> = ({ soulboundBadgeStatus }) => {
  return (
    <div className="p-3 py-5 xl:px-6 xl:py-10 gap-3 bg-[#2a2a2a] flex flex-1 flex-col justify-center	items-center text-white text-center">
      <p className="font-normal text-xs xl:text-4 leading-5 not-italic">Diamond Hand Badge</p>
      {soulboundBadgeStatus ? (
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
    </div>
  )
}

export default CheckCardEarnClaimed
