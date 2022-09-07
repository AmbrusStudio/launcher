import { AccountInfo } from '../Info'
import { AccountTitie } from '../Title'

type AccountTitleWithAccountInfoProps = {
  title?: string
  subtitle?: string
}

export function AccountTitleWithAccountInfo(props: AccountTitleWithAccountInfoProps) {
  const { title, subtitle } = props
  return (
    <div className="flex flex-row flex-nowrap items-center justify-between">
      <AccountTitie title={title} subtitle={subtitle} />
      <AccountInfo />
    </div>
  )
}
