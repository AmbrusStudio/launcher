import { ExternalLink } from '../../Link'

type SocialNavItemProps = {
  to: string
  img: string
  title: string
}

export function SocialNavItem(props: SocialNavItemProps) {
  const { to, img, title } = props
  return (
    <ExternalLink to={to} title={title} blank>
      <div className="bg-transparent cursor-pointer">
        <img className="w-24px h-24px select-none" src={img} alt={`${title} Icon`} loading="lazy" />
      </div>
    </ExternalLink>
  )
}
