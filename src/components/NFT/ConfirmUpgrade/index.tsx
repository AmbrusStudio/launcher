import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

import ModalCustom from '../../ModalCustom'

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
  confirm: () => void
}

const ConfirmUpgrade: FC<ConfirmUpgradeProps> = ({ visible, toggle, confirm }) => {
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
        <button className="u-btn u-btn-primary" onClick={() => confirm()}>
          Upgrade and unstake
        </button>
        <button className="u-btn" onClick={() => toggle(false)}>
          Cancel
        </button>
      </Stack>
    </ModalCustom>
  )
}

export default ConfirmUpgrade
