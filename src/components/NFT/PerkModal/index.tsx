import { Stack } from '@mui/material'
import { FC } from 'react'

import { PERKS } from '../../../data'
import Modal from '../Modal'
import PerkItem from '../PerkItem'

interface PerkProps {
  readonly visible: boolean
  close: () => void
}

const Perk: FC<PerkProps> = ({ visible, close }) => {
  return (
    <Modal title={'Your Gifts'} visible={visible} close={close}>
      <Stack className="bg-white backdrop-blur-md p-6 h-full overflow-auto" spacing={2}>
        {PERKS.map((perk, index) => (
          <PerkItem perk={perk} key={index} />
        ))}
      </Stack>
    </Modal>
  )
}

export default Perk
