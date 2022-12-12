import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'
import Progressbar from 'react-js-progressbar'

import { formatSeconds } from '../../../utils'
import SuccessCheck from '../../Icon/SuccessCheck'

const Card = styled(Stack)`
  background: #2a2a2a;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface Props {
  readonly duration: string
  readonly timeLeft: string
  readonly stakedPercentage: number
  readonly timeStatus: boolean
}

const CheckCardCountdown: FC<Props> = ({ duration, timeLeft, stakedPercentage, timeStatus }) => {
  return (
    <Card spacing={1.5} className="p-3 xl:p-6">
      <div className="w-[108px] h-[108px] relative">
        <Progressbar
          input={stakedPercentage}
          pathWidth={44}
          pathColor={['#FF5925', '#FF00F5']}
          trailWidth={44}
          trailColor="rgba(255, 255, 255, 0.2)"
          customText=""
          pathLinecap="butt"
          animation={{
            duration: 0,
          }}
        ></Progressbar>
        {timeStatus && (
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
          It has been staked for at least 35 days
        </p>
        <p className="font-normal text-xs leading-5 text-center text-rust not-italic">
          ({formatSeconds(timeLeft) || '0 second'} left)
        </p>
      </div>
    </Card>
  )
}

export default CheckCardCountdown
