import { useQuery } from '../../../hooks'

export function SignUp() {
  const query = useQuery()
  console.log(query.get('session'))
  return (
    <main id="main">
      <div className="py-192px mx-auto">
        <div></div>
      </div>
    </main>
  )
}
