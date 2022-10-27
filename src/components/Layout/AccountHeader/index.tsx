import { AccountInfo } from './AccountInfo'
import { AccountTitie } from './AccountTitie'

type AccountHeaderProps = {
  title: string
  subtitle: string
  sessionExpiredNavigateTo: string
}

export function AccountHeader(props: AccountHeaderProps) {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-between">
      <AccountTitie title={props.title} subtitle={props.subtitle} />
      <AccountInfo sessionExpiredNavigateTo={props.sessionExpiredNavigateTo} />
    </div>
  )
}
