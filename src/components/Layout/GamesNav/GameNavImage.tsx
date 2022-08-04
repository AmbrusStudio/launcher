import { getMainSiteLink } from '../../../utils'
import { ExternalLink } from '../../Link'

type GameNavImageProps = {
  img: string
  to: string
  title: string
}

export function GameNavImage(props: GameNavImageProps) {
  const { img, to, title } = props
  return (
    <ExternalLink to={getMainSiteLink(to)} title={title}>
      <img
        className="box-border xl:h-360px bg-game-nav-img border-2px border-grey-medium/20 rounded-4px cursor-pointer select-none"
        src={img}
        alt={`${title} Image`}
      />
    </ExternalLink>
  )
}
