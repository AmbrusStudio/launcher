import styled from '@emotion/styled'

const Input = styled.input`
  &:focus-visible {
    outline: none;
  }
`

export function NewsletterSubscribe() {
  return (
    <div className="flex flex-col w-full">
      <form className="w-full">
        <label htmlFor="newsletter-email-input">
          <p className="hidden xl:block font-medium text-16px leading-28px text-white uppercase">Newsletter</p>
          <div className="flex flex-row flex-nowrap items-center">
            <Input
              className="flex flex-row flex-nowrap items-center w-full xl:min-w-258px px-16px py-10px font-normal text-14px leading-28px text-black bg-white placeholder:text-grey-light"
              type="email"
              name="newsletter-email"
              id="newsletter-email-input"
              placeholder="Your email"
            />
            <button className="flex flex-row flex-nowrap items-center px-16px py-10px font-semibold text-14px leading-28px text-white uppercase bg-rust">
              Subscribe
            </button>
          </div>
        </label>
      </form>
    </div>
  )
}
