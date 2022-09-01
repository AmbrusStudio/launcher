import { classNames } from '../../../utils'

type AccountCardProps = {
  className?: string
  title?: string
}

export function AccountBlock(props: React.PropsWithChildren<AccountCardProps>) {
  const { className, children, title } = props
  return (
    <section className={classNames('flex flex-col', className)}>
      <div className="flex flex-col gap-24px">
        {title && <h3 className="font-bold text-24px leading-30px uppercase text-white center">{title}</h3>}
        {children}
      </div>
    </section>
  )
}
