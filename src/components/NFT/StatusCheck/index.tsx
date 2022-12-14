import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useContext, useState } from 'react'

import { StakeCtx } from '../../../context'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTE4CRanger } from '../../../types'
import { getHolderByAddress } from '../../../utils'
import Announcements from '../Announcements'
import CheckCard from '../CheckCard'
import ConfirmUnstake from '../ConfirmUnstake'
import ConfirmUpgrade from '../ConfirmUpgrade'
import StakeInfoDetail from '../StakeInfoDetail'

const WrapperInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`

interface Props {
  readonly unstakeLoading: boolean
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheck: FC<Props> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(
    nft.tokenId,
    getHolderByAddress(nft.address),
    nft.status,
    nft.address
  )

  const stakeCtx = useContext(StakeCtx)

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="w-[53.5%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
        <Announcements address={'0xabd0857baad28f6c7c3814e9e70e4eb54566f3ae'} />
      </div>
      <WrapperInfo className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
        <StakeInfoDetail
          title={stakeCtx?.checkAnnouncement.title || ''}
          description={stakeCtx?.checkAnnouncement.description || ''}
        />

        <CheckCard
          duration={duration}
          timeLeft={timeLeft}
          stakedPercentage={stakedPercentage}
          timeStatus={timeStatus}
          soulboundBadgeStatus={soulboundBadgeStatus}
        />

        <Stack
          spacing={1.5}
          sx={{
            mt: 3,
          }}
        >
          <button
            className={classNames('u-btn', {
              'u-btn-primary': status,
              'u-btn-disabled': !status,
              loading: unstakeLoading,
            })}
            disabled={!status || unstakeLoading}
            onClick={() => setVisibleUpgrade(true)}
          >
            Upgrade
          </button>
          <button
            disabled={unstakeLoading}
            className={classNames('u-btn', {
              loading: unstakeLoading,
            })}
            onClick={() => setVisibleUnstake(true)}
          >
            Unstake
          </button>
          <button className="u-btn" onClick={() => toggle(false)}>
            Cancel
          </button>
        </Stack>

        <ConfirmUnstake
          visible={visibleUnstake}
          toggle={setVisibleUnstake}
          confirm={() => {
            setVisibleUnstake(false)
            unstake()
          }}
        />
        <ConfirmUpgrade
          visible={visibleUpgrade}
          toggle={setVisibleUpgrade}
          confirm={() => {
            setVisibleUpgrade(false)
            unstake()
          }}
        />
      </WrapperInfo>
    </div>
  )
}

export default StatusCheck
