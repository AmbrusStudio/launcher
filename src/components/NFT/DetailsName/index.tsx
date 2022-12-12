import { Stack } from '@mui/material'
import { FC } from 'react'

import { NFTE4CRanger } from '../../../types'
import { getSeries } from '../../../utils'

interface Props {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
}

const DetailsName: FC<Props> = ({ nft, tokenId }) => {
  return (
    <section>
      <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-rust break-all">
        E4C Rangers
      </span>
      <Stack spacing={2} direction="row">
        <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-white break-all">
          Series {getSeries(nft.trait)}
        </span>
        <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-white">
          #{tokenId}
        </span>
      </Stack>
    </section>
  )
}

export default DetailsName
