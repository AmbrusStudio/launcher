import { useHeaderLinks } from '../../../hooks'
import { classNames } from '../../../utils'
import { SocialNavItem } from './SocialNavItem'

type SocialNavProps = {
  className?: string
}

export function SocialNav(props: SocialNavProps) {
  const { links } = useHeaderLinks()

  if (!links) return null
  return (
    <nav
      className={classNames('flex flex-row flex-nowrap items-center gap-24px text-white', props.className)}
      title="Social Nav"
    >
      {links.map((header) => (
        <SocialNavItem to={header.url} img={header.img} key={header.url} title="Social Link" />
      ))}
    </nav>
  )
}
