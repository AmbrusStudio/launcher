import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC } from 'react'

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
  readonly soulboundBadgeStatus: boolean
}

const CheckCardEarnAmount: FC<CheckCardProps> = ({ soulboundBadgeStatus }) => {
  return (
    <Card spacing={1.5} className="p-3 xl:p-6">
      <p className="text-base text-center text-white">Amount of $GDC you will earn</p>
      <p className="text-4xl font-bold text-center text-white">0</p>
    </Card>
  )
}

export default CheckCardEarnAmount
