import { Fragment } from 'react'

import { PageFooter } from './Footer'
import { PageHeader } from './Header'

type PageLayoutProps = {
  className?: string
}

export function PageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <Fragment>
      <PageHeader />
      <main id="main" className={className}>
        {children}
      </main>
      <PageFooter />
    </Fragment>
  )
}
