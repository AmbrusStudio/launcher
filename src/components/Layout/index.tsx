import React from 'react'
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
    <React.Fragment>
      <PageHeader />
      <BasePageLayout className={className}>{children}</BasePageLayout>
      {/* gallery page hide footer */}
      {location.pathname !== '/gallery' && <PageFooter />}
    </React.Fragment>
  )
}

export function AccountCenterPageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <React.Fragment>
      <PageSidebar />
      <BasePageLayout className={classNames('lg:ml-108px p-24px lg:p-36px w-full max-w-1332px', className)}>
        {children}
      </BasePageLayout>
    </React.Fragment>
  )
}
