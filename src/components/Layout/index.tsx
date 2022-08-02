import { Fragment } from 'react'

import { PageFooter } from './Footer'

type PageLayoutProps = {
  className?: string
}

export function PageLayout(props: React.PropsWithChildren<PageLayoutProps>) {
  const { className, children } = props
  return (
    <Fragment>
      <main id="main" className={className}>
        {children}
      </main>
      <PageFooter />
    </Fragment>
  )
}
