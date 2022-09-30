import { BlindBoxPictures, BlindBoxVideo } from '../../constants'

const BlindBox = () => {
  return (
    <video
      className="h-full w-full"
      src={BlindBoxVideo}
      autoPlay
      loop
      disablePictureInPicture
      poster={BlindBoxPictures}
    ></video>
  )
}

export default BlindBox
