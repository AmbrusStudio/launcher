import Logo1x from '../../../assets/images/brand/ambrus-studio-logo.png'
import Logo2x from '../../../assets/images/brand/ambrus-studio-logo@2x.png'
import Logo3x from '../../../assets/images/brand/ambrus-studio-logo@3x.png'

export function ImageAmbrusStudio() {
  const image = Logo1x
  const imageSet = `${Logo1x}, ${Logo2x} 2x, ${Logo3x} 3x`

  return (
    <img className="w-240px h-80px select-none" src={image} alt="Ambrus Studio Logo" srcSet={imageSet} loading="lazy" />
  )
}
