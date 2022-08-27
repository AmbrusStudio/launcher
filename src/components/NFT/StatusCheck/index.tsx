import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'

import { NFT } from '../../../types'
import ModalCustom from '../../ModalCustom'
import CheckCard from '../CheckCard'

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

interface StatusCheckProps {
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const StatusCheck: FC<StatusCheckProps> = ({ nft, toggle }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const status = useMemo(() => {
    return nft.upgradeInfo.upgradingStatusInfo?.stakeStatus && nft.upgradeInfo.upgradingStatusInfo?.badgeStatus
  }, [nft])

  return (
    <>
      <p className="font-normal text-base leading-[30px] text-white not-italic mt-3 mb-auto">
        You can upgrade this NFT when:
      </p>

      <div className="mt-6">
        <CheckCard nft={nft} />
      </div>

      <Stack
        spacing={1.5}
        sx={{
          mt: 3,
        }}
      >
        <InfoButton
          color={status ? '#FF4125' : '#A0A4B0'}
          onClick={() => {
            status && setVisibleUpgrade(true)
          }}
        >
          Upgrade
        </InfoButton>
        <InfoButton color="#2A2A2A" onClick={() => setVisibleUnstake(true)}>
          Unstake
        </InfoButton>
        <InfoButton color="#2A2A2A" onClick={() => toggle(false)}>
          Cancel
        </InfoButton>
      </Stack>
      <ModalCustom
        title={'Are you sure?'}
        visible={visibleUnstake}
        toggle={(value) => setVisibleUnstake(value)}
        close={false}
      >
        <Stack
          spacing={3}
          sx={{
            p: 4.5,
            overflow: 'auto',
          }}
        >
          <ConfirmationDescription>
            Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the future.
          </ConfirmationDescription>
          <InfoButton color="#2A2A2A">Yes, Reset upgrading status</InfoButton>
          <InfoButton color="#2A2A2A" onClick={() => setVisibleUnstake(false)}>
            Cancel
          </InfoButton>
        </Stack>
      </ModalCustom>
      <ModalCustom title={'Upgrade your NFT?'} visible={visibleUpgrade} toggle={(value) => setVisibleUpgrade(value)}>
        <Stack
          spacing={3}
          sx={{
            p: 4.5,
            overflow: 'auto',
          }}
        >
          <ConfirmationDescription>
            You’ll earn a lot more benefits after upgrading your NFT. You can only upgrade this NFT whilel it’s still
            staked.
          </ConfirmationDescription>
          <InfoButton color="#FF4125">Upgrade and unstake</InfoButton>
          <InfoButton color="#2A2A2A" onClick={() => setVisibleUpgrade(false)}>
            Cancel
          </InfoButton>
        </Stack>
      </ModalCustom>
    </>
  )
}

export default StatusCheck
