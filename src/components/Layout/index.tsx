import { Fragment } from 'react'

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
