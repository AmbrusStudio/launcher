import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useState } from 'react'

import { ADDRESS_E4CRanger_Gold_Holder } from '../../../contracts'
import { stakeAnnouncement, statusCheckData } from '../../../data'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTE4CRanger } from '../../../types'
import CheckCard from '../CheckCard'
import ConfirmUnstake from '../ConfirmUnstake'
import ConfirmUpgrade from '../ConfirmUpgrade'
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

interface StatusCheckProps {
  readonly unstakeLoading: boolean
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheck: FC<StatusCheckProps> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(
    nft.tokenId,
    ADDRESS_E4CRanger_Gold_Holder
  )

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="w-[53.5%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
        {stakeAnnouncement.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
        <Title>{statusCheckData.title}</Title>
        <p className="font-normal text-base leading-[30px] text-white not-italic mt-3 mb-auto">
          {statusCheckData.description}
        </p>

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
