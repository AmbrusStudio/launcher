import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useContext } from 'react'

import { StakeCtx } from '../../../context'
import { NFTE4CRanger } from '../../../types'
import Announcements from '../Announcements'
import StakeInfoDetail from '../StakeInfoDetail'

const WrapperInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`

interface StakeInfoProps {
  readonly stakeLoading: boolean
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  stake: () => void
}

const StakeInfo: FC<StakeInfoProps> = ({ stakeLoading, nft, toggle, stake }) => {
  const stakeCtx = useContext(StakeCtx)

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="w-[47.6%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
        <Announcements address={nft.address} />
      </div>

      <WrapperInfo className="w-[52.4%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
        <StakeInfoDetail
          title={stakeCtx?.upgradeAnnouncement.title || ''}
          description={stakeCtx?.upgradeAnnouncement.description || ''}
        />
        <Stack spacing={1.5} className="mt-auto">
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
