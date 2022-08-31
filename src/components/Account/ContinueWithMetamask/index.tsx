import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'
import { IconMetamack } from '../../Icon'

type AccountContinueWithMetamaskProps = ReactButtonProps & {
  account?: string
}

export function AccountContinueWithMetamask(props: AccountContinueWithMetamaskProps) {
  const { className, account, ...others } = props
  const buttonText = account || 'Metamask'
  return (
    <Button variant="metamask" className={classNames('flex flex-row items-center relative', className)} {...others}>
      <IconMetamack className="absolute w-36px h-auto" />
      <span className="w-full hidden md:inline-block">Continue with {buttonText}</span>
      <span className="w-full md:hidden">{buttonText}</span>
    </Button>
  )
}
