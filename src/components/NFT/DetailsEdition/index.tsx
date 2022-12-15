import Skeleton from '@mui/material/Skeleton'
import { FC, useMemo } from 'react'

import { NFTE4CRanger, TraitEdition } from '../../../types'
import { getEdition, getTraitEdition } from '../../../utils'
import NFTTag from '../NFTTag'

interface Props {
  readonly nft: NFTE4CRanger
}

const DetailsEdition: FC<Props> = ({ nft }) => {
  const edition = useMemo<TraitEdition | undefined>(() => getTraitEdition(nft), [nft])

  return (
    <>
      {nft.upgraded === undefined ? (
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: '#454545' }}
          className="w-[100px] lg:w[140px] !h-[40px] !lg:h-[58px]"
        />
      ) : (
        <NFTTag content={getEdition(nft.upgraded, nft.address)} edition={edition} />
      )}
    </>
  )
}

export default DetailsEdition
