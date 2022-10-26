import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import { classNames } from '../../utils'
import { PageFooter } from './Footer'
import { PageHeader } from './Header'
import { PageSidebar } from './Sidebar'

type PageLayoutProps = {
  className?: string
}

export function BasePageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <main id="main" className={className}>
      {children}
    </main>
  )
}

export function PageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  const location = useLocation()

  return (
    <Fragment>
      <PageHeader />
      <BasePageLayout className={className}>{children}</BasePageLayout>

      {/* gallery page hide footer */}
      {location.pathname !== '/gallery' && <PageFooter />}
    </Fragment>
  )
}

export function AccountCenterPageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <BasePageLayout className="flex flex-row flex-nowrap">
      <PageSidebar className="fixed h-screen min-w-108px" />
      <div className={classNames('ml-108px p-36px w-full max-w-1332px', className)}>{children}</div>
    </BasePageLayout>
  )
}
