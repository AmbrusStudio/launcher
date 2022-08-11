import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconMetamack } from '../../Icon'

type AccountContinueWithMetamaskProps = ReactButtonProps

export function AccountContinueWithMetamask(props: AccountContinueWithMetamaskProps) {
  const { className, ...others } = props
  return (
    <button
      className={classNames(
        'flex flex-row items-center box-border uppercase w-full px-24px py-20px relative',
        'font-semibold text-16px leading-20px text-center text-black bg-white',
        'hover:bg-metamask hover:text-white',
        'disabled:bg-grey-medium disabled:text-white',
        'disabled:hover:bg-grey-medium disabled:hover:text-white',
        'disabled:cursor-not-allowed',
        className
      )}
      {...others}
    >
      <IconMetamack className="absolute w-36px h-auto" />
      <span className="w-full">Continue with Metamask</span>
    </button>
  )
}