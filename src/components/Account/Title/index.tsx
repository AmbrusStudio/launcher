import { classNames } from '../../../utils'

type AccountTitieProps = {
  className?: string
  title?: string
  subtitle?: string
}

export function AccountTitie(props: AccountTitieProps) {
  const { className, title = 'Account', subtitle = 'Center' } = props
  return (
    <div className={classNames('flex flex-col', className)}>
      <h1 className="font-bold text-36px leading-44px uppercase mb-24px">
        <span className="text-white mr-8px">{title}</span>
        <span className="text-rust">{subtitle}</span>
      </h1>
      <div className="w-160px h-8px bg-gradient-linear shape-[90deg] from-rustDark to-rust" />
    </div>
  )
}
