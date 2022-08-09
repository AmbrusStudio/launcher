import { AccountEmailAndAgreement, AccountPopup } from '../../../components/Account'
import { useQuery } from '../../../hooks'

export function SignUp() {
  const query = useQuery()
  console.log(query.get('session'))
  return (
    <main id="main">
      <div className="py-192px mx-auto max-w-600px">
        <AccountPopup title="Sign Up">
          <AccountEmailAndAgreement />
        </AccountPopup>
      </div>
    </main>
  )
}
