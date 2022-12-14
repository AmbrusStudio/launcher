import { FC } from 'react'

import CheckCardEarnAmount from '../CheckCardEarnAmount'
import CheckCardEarnClaimed from '../CheckCardEarnClaimed'
import CheckCardStakedDay from '../CheckCardStakedDay'

interface Props {
  readonly duration: string
  readonly timeLeft: string
  readonly stakedPercentage: number
  readonly timeStatus: boolean
  readonly soulboundBadgeStatus: boolean
}

const CheckCardEarn: FC<Props> = ({ duration, timeLeft, stakedPercentage, timeStatus, soulboundBadgeStatus }) => {
  return (
    <div className="flex flex-row gap-2.5">
      <CheckCardStakedDay timeLeft={timeLeft} />
      <CheckCardEarnAmount amount={'0'} />
      <CheckCardEarnClaimed soulboundBadgeStatus={soulboundBadgeStatus} />
    </div>
  )
}

export default CheckCardEarn
