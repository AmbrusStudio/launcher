import { FC } from 'react'

import { BlindBoxMode } from '../../constants'
import BlindBox from '../BlindBox'
import TokenImage from '../TokenImage'

interface TokenMediaProps {
  readonly src: string
}

const TokenMedia: FC<TokenMediaProps> = ({ src }) => {
  return <>{BlindBoxMode ? <BlindBox /> : <TokenImage src={src} />}</>
}

export default TokenMedia
