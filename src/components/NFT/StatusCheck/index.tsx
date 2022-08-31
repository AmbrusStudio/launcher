import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'

import { stakeAnnouncement, statusCheckData } from '../../../data'
import { NFTE4CRanger } from '../../../types'
import CheckCard from '../CheckCard'
import ConfirmUnstake from '../ConfirmUnstake'
import ConfirmUpgrade from '../ConfirmUpgrade'
import NFTAnnouncement from '../NFTAnnouncement'

const InfoButton = styled.button<{ color: string }>`
  background: ${(p) => p.color || '#ff4125'};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
`

const ConfirmationDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #4a4a4a;
  padding: 0;
  margin: 0;
`
const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
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
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheck: FC<StatusCheckProps> = ({ nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const status = useMemo(() => {
    // return nft.upgradeInfo.upgradingStatusInfo?.stakeStatus && nft.upgradeInfo.upgradingStatusInfo?.badgeStatus
    return true
  }, [nft])

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="lg:w-[600px] lg:h-[600px] overflow-auto bg-white p-6 grid gap-y-20.5">
        {stakeAnnouncement.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo>
        <Title>{statusCheckData.title}</Title>
        <p className="font-normal text-base leading-[30px] text-white not-italic mt-3 mb-auto">
          {statusCheckData.description}
        </p>

        <CheckCard nft={nft} />

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
            })}
            disabled={!status}
            onClick={() => {
              status && setVisibleUpgrade(true)
            }}
          >
            Upgrade
          </button>
          <button className="u-btn" color="#2A2A2A" onClick={() => setVisibleUnstake(true)}>
            Unstake
          </button>
          <button className="u-btn" color="#2A2A2A" onClick={() => toggle(false)}>
            Cancel
          </button>
        </Stack>

        <ConfirmUnstake visible={visibleUnstake} toggle={setVisibleUnstake} unstake={unstake} />
        <ConfirmUpgrade visible={visibleUpgrade} toggle={setVisibleUpgrade} unstake={unstake} />
      </WrapperInfo>
    </div>
  )
}

export default StatusCheck
