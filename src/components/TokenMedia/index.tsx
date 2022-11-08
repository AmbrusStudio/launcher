import { FC } from 'react'

import { TraitItem } from '../../types'
import { TokenMediaMode } from '../../types/tokenMedia'
import { BlindBoxMode, BlindBoxPictures } from '../../utils/bindbox'
import BlindBox from '../BlindBox'
import TokenImage from '../TokenImage'

interface TokenMediaProps {
  readonly src: string
  readonly trait: TraitItem[]
  readonly mode?: TokenMediaMode
}

const TokenMedia: FC<TokenMediaProps> = ({ src, trait, mode = TokenMediaMode.Full }) => {
  return (
    <>
      {BlindBoxMode(trait) ? (
        mode === TokenMediaMode.Full ? (
          <BlindBox trait={trait} />
        ) : (
          <TokenImage src={BlindBoxPictures(trait)} />
        )
      ) : (
        <TokenImage src={src} />
      )}
    </>
  )
}

export default TokenMedia
