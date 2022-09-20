import { Stack } from '@mui/material'
import { FC } from 'react'

import { confirmUpgradeData } from '../../../data'
import ModalCustom from '../../ModalCustom'

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
        <p className="m-0 p-0 font-normal text-base leading-[30px] not-italic text-[#4a4a4a]">
          {confirmUpgradeData.description}
        </p>
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
