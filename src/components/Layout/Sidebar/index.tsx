import { classNames } from '../../../utils'
import { SideNav } from '../SideNav'

type PageSidebarProps = {
  className?: string
}

export function PageSidebar(props: PageSidebarProps) {
  const { className } = props
  return (
    <header id="sidebar" className={classNames('flex flex-col p-24px bg-grey-dark z-10', className)}>
      <SideNav />
    </header>
  )
}
