import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useContext } from 'react'

import { StakeCtx } from '../../../context'

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
const Description = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #ffffff;
  padding: 0;
  margin: 12px 0 auto 0;
  ul {
    margin-top: 0.75rem;
    margin-left: 1.5rem;
    list-style-type: disc;
  }
`

interface StakeInfoProps {
  readonly stakeLoading: boolean
  readonly address: string
  toggle: (value: boolean) => void
  stake: () => void
}

const StakeInfoDetail: FC<StakeInfoProps> = ({ stakeLoading, address, toggle, stake }) => {
  const stakeCtx = useContext(StakeCtx)

  return (
    <WrapperInfo className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
      <Title>{stakeCtx?.upgradeAnnouncement.title}</Title>
      <Description dangerouslySetInnerHTML={{ __html: stakeCtx?.upgradeAnnouncement.description || '' }}></Description>
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
  )
}

export default StakeInfoDetail
