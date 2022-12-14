import { Stack } from '@mui/material'
import { FC } from 'react'

import CheckCardClaimed from '../CheckCardClaimed'
import CheckCardCountdown from '../CheckCardCountdown'

interface CheckCardProps {
  readonly duration: string
  readonly timeLeft: string
  readonly stakedPercentage: number
  readonly timeStatus: boolean
  readonly soulboundBadgeStatus: boolean
}

const CheckCard: FC<CheckCardProps> = ({ duration, timeLeft, stakedPercentage, timeStatus, soulboundBadgeStatus }) => {
  return (
    <Stack spacing={1.5} direction="row">
      <CheckCardCountdown
        duration={duration}
        timeLeft={timeLeft}
        stakedPercentage={stakedPercentage}
        timeStatus={timeStatus}
      />
      <CheckCardClaimed soulboundBadgeStatus={soulboundBadgeStatus} />
    </Stack>
  )
}

export default CheckCard
