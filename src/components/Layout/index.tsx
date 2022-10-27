import React from 'react'
import { useLocation } from 'react-router-dom'

import { classNames } from '../../utils'
import { AccountHeader } from './AccountHeader'
import { PageFooter } from './PageFooter'
import { PageHeader } from './PageHeader'
import { PageSidebar } from './PageSidebar'

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

type AccountCenterPageLayoutProps = PageLayoutProps & {
  title?: string
  subtitle?: string
  sessionExpiredNavigateTo?: string
}

export function AccountCenterPageLayout(props: React.PropsWithChildren<AccountCenterPageLayoutProps>) {
  const { title = 'Account', subtitle = 'Center', sessionExpiredNavigateTo = '/account/signup' } = props
  return (
    <React.Fragment>
      <PageSidebar />
      <AccountHeader title={title} subtitle={subtitle} sessionExpiredNavigateTo={sessionExpiredNavigateTo} />
      <BasePageLayout
        className={classNames('lg:ml-108px w-full max-w-1332px px-24px lg:px-36px py-24px lg:py-36px', props.className)}
      >
        {props.children}
      </BasePageLayout>
    </React.Fragment>
  )
}
