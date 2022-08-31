import { classNames } from '../../../utils'

type AccountCardProps = {
  className?: string
  title?: string
}

export function AccountCard(props: React.PropsWithChildren<AccountCardProps>) {
  const { className, children, title } = props
  return (
    <section className={classNames('flex flex-col p-36px bg-card', className)}>
      {title && <h3 className="font-bold text-24px leading-30px uppercase text-white">{title}</h3>}
      {children}
    </section>
  )
}
