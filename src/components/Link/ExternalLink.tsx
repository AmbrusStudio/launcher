type ExternalLinkProps = {
  to: string
  blank?: boolean
  className?: string
  title?: string
}

export function ExternalLink(props: React.PropsWithChildren<ExternalLinkProps>) {
  const { children, className, to, blank, title } = props
  const target = blank ? '_blank' : undefined
  const rel = blank ? 'noopener' : undefined
  return (
    <a className={className} href={to} target={target} rel={rel} title={title}>
      {children}
    </a>
  )
}
