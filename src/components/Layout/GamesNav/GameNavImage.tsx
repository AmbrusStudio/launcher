import { classNames, getMainSiteLink } from '../../../utils'
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
        className={classNames(
          'box-border xl:h-360px border-2px border-grey-medium/20 rounded-4px',
          'bg-gradient-linear shape-[180deg] from-#3F3F3F to-#444444',
          'cursor-pointer select-none'
        )}
        src={img}
        alt={`${title} Image`}
      />
    </ExternalLink>
  )
}
