import { Stack } from '@mui/material'
import { FC } from 'react'

import { confirmUnstakeData } from '../../../data'
import ModalCustom from '../../ModalCustom'

interface ConfirmUnstakeProps {
  readonly visible: boolean
  toggle: (value: boolean) => void
  confirm: () => void
}

const ConfirmUnstake: FC<ConfirmUnstakeProps> = ({ visible, toggle, confirm }) => {
  return (
    <ModalCustom title={'Are you sure?'} visible={visible} toggle={(value) => toggle(value)} close={false}>
      <Stack
        spacing={3}
        sx={{
          p: 4.5,
          overflow: 'auto',
        }}
      >
        <p className="m-0 p-0 font-normal text-base leading-[30px] not-italic text-[#4a4a4a]">
          {confirmUnstakeData.description}
        </p>
        <button className="u-btn" onClick={() => confirm()}>
          Yes, Reset upgrading status
        </button>
        <button className="u-btn" onClick={() => toggle(false)}>
          Cancel
        </button>
      </Stack>
    </ModalCustom>
  )
}

export default ConfirmUnstake
