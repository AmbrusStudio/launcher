import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC } from 'react'

import { stakeAnnouncement, stakeToUpgrade } from '../../../data'
import NFTAnnouncement from '../NFTAnnouncement'

const WrapperInfo = styled.div`
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
  readonly stakeLoading: boolean
  toggle: (value: boolean) => void
  stake: () => void
}

const StakeInfo: FC<StakeInfoProps> = ({ stakeLoading, toggle, stake }) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="w-[53.5%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
        {stakeAnnouncement.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
        <Title>{stakeToUpgrade.title}</Title>
        <Description>{stakeToUpgrade.description}</Description>
        <Stack spacing={1.5} className="mt-6">
          <button
            disabled={stakeLoading}
            className={classNames('u-btn u-btn-primary', {
              loading: stakeLoading,
            })}
            onClick={() => stake()}
          >
            Start Staking Now
          </button>
          <button className="u-btn" onClick={() => toggle(false)}>
            Cancel
          </button>
        </Stack>
      </WrapperInfo>
    </div>
  )
}

export default StakeInfo
