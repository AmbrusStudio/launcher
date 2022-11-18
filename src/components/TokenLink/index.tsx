import { Stack } from '@mui/material'
import { FC } from 'react'

import { MetadataStatus } from '../../types'
import { getExplorerAddressLink, getRaribleLink } from '../../utils'

interface Props {
  readonly address: string
  readonly status: MetadataStatus
}

const TokenLink: FC<Props> = ({ address, status }) => {
  return (
    <Stack spacing={4.5} direction="row">
      <a
        className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
        href={getRaribleLink(address, status)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Rarible
      </a>
      <a
        className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
        href={getExplorerAddressLink(address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Etherscan
      </a>
    </Stack>
  )
}

export default TokenLink
