import { FC } from 'react'

import { TraitItem } from '../../types'
import { BlindBoxMode } from '../../utils/bindbox'
import BlindBox from '../BlindBox'
import TokenImage from '../TokenImage'

interface TokenMediaProps {
  readonly src: string
  readonly trait: TraitItem[]
}

const TokenMedia: FC<TokenMediaProps> = ({ src, trait }) => {
  return <>{BlindBoxMode(trait) ? <BlindBox trait={trait} /> : <TokenImage src={src} />}</>
}

export default TokenMedia
