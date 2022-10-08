import { FC } from 'react'

interface TokenImageProps {
  readonly src: string
}

const TokenImage: FC<TokenImageProps> = ({ src }) => {
  return <img className="w-full h-full" src={src} alt="Asset Image" loading="lazy" />
}

export default TokenImage
