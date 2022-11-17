import { Stack } from '@mui/material'
import { FC } from 'react'

import { NFTE4CRanger } from '../../types'
import { getExplorerAddressLink, getRaribleLink } from '../../utils'

interface Props {
  readonly nft: NFTE4CRanger
}

const TokenLink: FC<Props> = ({ nft }) => {
  return (
    <Stack spacing={4.5} direction="row">
      <a
        className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
        href={getRaribleLink(nft.address, nft.status)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Rarible
      </a>
      <a
        className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
        href={getExplorerAddressLink(nft.address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Etherscan
      </a>
    </Stack>
  )
}

export default TokenLink
