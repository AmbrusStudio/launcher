import styled from '@emotion/styled'

import { classNames, cleanupHTML, getMainSiteLink } from '../../../utils'
import { ExternalLink } from '../../Link'

type GameNavButtonProps = {
  to: string
  name: string
  active?: boolean
  soon?: boolean
  onMouseOver?: React.MouseEventHandler<HTMLParagraphElement>
}

const NavContent = styled.p`
  & span {
    margin-left: 10px;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: #ff4125;
  }
`

export function GameNavButton(props: GameNavButtonProps) {
  const { to, name, active, soon, onMouseOver } = props
  const href = soon ? undefined : getMainSiteLink(to)
  return (
    <ExternalLink to={href} title={name}>
      <NavContent
        className={classNames(
          'game-nav-button flex flex-row flex-nowrap items-center xl:px-24px rounded-8px font-bold text-20px leading-60px text-white text-left uppercase cursor-pointer hover:bg-black-bg',
          active && '!bg-black-bg'
        )}
        dangerouslySetInnerHTML={{ __html: cleanupHTML(name) }}
        onMouseOver={onMouseOver}
      />
    </ExternalLink>
  )
}
