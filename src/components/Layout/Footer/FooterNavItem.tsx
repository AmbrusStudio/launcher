import styled from '@emotion/styled'

import { ExternalLink } from '../../Link'

type FooterNavItemProps = {
  to: string
  name: string
}

const NavItem = styled.div`
  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
  &:not(:last-of-type) {
    border-right: 1px solid #2a2a2a;
  }
`

export function FooterNavItem(props: FooterNavItemProps) {
  const { to, name } = props
  return (
    <NavItem className="footer-nav-item flex flex-row flex-nowrap box-content items-center h-12px xl:h-18px px-24px font-normal text-10px xl:text-14px text-grey-medium">
      <ExternalLink to={to} title={name} blank>
        {name}
      </ExternalLink>
    </NavItem>
  )
}
