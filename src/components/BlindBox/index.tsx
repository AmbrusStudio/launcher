import { FC } from 'react'

import { TraitItem } from '../../types'
import { BlindBoxPictures, BlindBoxVideo } from '../../utils/bindbox'

interface Props {
  readonly trait: TraitItem[]
}

const BlindBox: FC<Props> = ({ trait }) => {
  return (
    <video
      className="h-full w-full"
      src={BlindBoxVideo(trait)}
      autoPlay
      loop
      disablePictureInPicture
      poster={BlindBoxPictures(trait)}
      playsInline
      // eslint-disable-next-line react/no-unknown-property
      webkit-playsinline=""
    ></video>
  )
}

export default BlindBox
