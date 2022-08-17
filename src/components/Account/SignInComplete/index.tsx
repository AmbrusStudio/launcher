import { IconAccept } from '../../Icon'
import { AccountTips } from '../Tips'

export type AccountSignInCompleteProps = {
  brandName: string
}

export function AccountSignInComplete(props: AccountSignInCompleteProps) {
  const { brandName } = props
  return (
    <div className="flex flex-col flex-1 justify-center xl:justify-initial">
      <div className="mx-auto mb-48px">
        <IconAccept className="w-120px h-120px" />
      </div>
      <AccountTips className="text-center">
        <p>You have successfully signed in to {brandName}.</p>
      </AccountTips>
    </div>
  )
}
