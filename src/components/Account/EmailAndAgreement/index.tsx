import { Button, Checkbox, Input } from '../../Forms'

export function AccountEmailAndAgreement() {
  return (
    <div className="flex flex-col gap-24px">
      <Input id="email" label="Email" placeholder="example@gmail.com" />
      <div className="flex flex-col gap-12px">
        <Checkbox id="agreement">
          Check this box after you read and agree to our <a href="#">Privacy Policy</a> and{' '}
          <a href="#">User Agreement</a>
        </Checkbox>
        <Checkbox id="newsletter">Check this box to subscribe to your newsletter</Checkbox>
      </div>
      <Button variant="primary">Next</Button>
    </div>
  )
}
