import { classNames } from '../../../utils'

type AccountTitieProps = {
  className?: string
  title: string
  subtitle: string
}

export function AccountTitie(props: AccountTitieProps) {
  const { className, title, subtitle } = props
  return (
    <div className={classNames('flex flex-col gap-24px', className)}>
      <h1 className="font-bold uppercase text-20px leading-24px md:text-32px md:leading-40px lg:text-36px lg:leading-44px">
        <span className="text-white mr-8px">{title}</span>
        <span className="text-rust">{subtitle}</span>
      </h1>
      <div className="hidden md:block w-160px h-8px bg-gradient-linear shape-[90deg] from-rustDark to-rust" />
    </div>
  )
}
