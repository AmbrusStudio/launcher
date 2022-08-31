import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

import ModalCustom from '../../ModalCustom'

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

interface ConfirmUpgradeProps {
  readonly visible: boolean
  toggle: (value: boolean) => void
  unstake: () => void
}

const ConfirmUpgrade: FC<ConfirmUpgradeProps> = ({ visible, toggle, unstake }) => {
  return (
    <ModalCustom title={'Upgrade your NFT?'} visible={visible} toggle={(value) => toggle(value)}>
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
        <InfoButton color="#FF4125" onClick={() => unstake()}>
          Upgrade and unstake
        </InfoButton>
        <InfoButton color="#2A2A2A" onClick={() => toggle(false)}>
          Cancel
        </InfoButton>
      </Stack>
    </ModalCustom>
  )
}

export default ConfirmUpgrade
