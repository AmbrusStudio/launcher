import { Fragment } from 'react'

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
  return (
    <Fragment>
      <PageHeader />
      <BasePageLayout className={className}>{children}</BasePageLayout>
      <PageFooter />
    </Fragment>
  )
}

export function AccountCenterPageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <BasePageLayout className="grid grid-cols-[auto_1fr]">
      <PageSidebar className="fixed h-screen min-w-108px" />
      <div className={classNames('ml-108px p-36px max-w-1332px xl:w-1332px', className)}>{children}</div>
    </BasePageLayout>
  )
}
