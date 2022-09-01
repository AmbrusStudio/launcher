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
        <ConfirmationDescription>
          Once unstaked, the upgrading status of this NFT will be reset. You can still upgrade this NFT in the future.
        </ConfirmationDescription>
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
