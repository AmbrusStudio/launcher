import { Fragment } from 'react'

import { classNames } from '../../utils'
import { PageFooter } from './Footer'
import { PageHeader } from './Header'

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
      <div className="min-h-screen min-w-108px"></div>
      <div className={classNames('p-36px', className)}>{children}</div>
    </BasePageLayout>
  )
}
