import { Stack } from '@mui/material'
import { FC } from 'react'

import { PERKS } from '../../../data'
import ModalCustom from '../../ModalCustom'
import PerkItem from '../PerkItem'

interface PerkProps {
  readonly visible: boolean
  close: (value: boolean) => void
}

const Perk: FC<PerkProps> = ({ visible, close }) => {
  return (
    <ModalCustom title={'Your Gifts'} visible={visible} toggle={close}>
      <Stack
        spacing={2}
        sx={{
          p: 3,
          overflow: 'auto',
          maxHeight: '680px',
        }}
      >
        {PERKS.map((perk, index) => (
          <PerkItem perk={perk} key={index} />
        ))}
      </Stack>
    </ModalCustom>
  )
}

export default Perk
