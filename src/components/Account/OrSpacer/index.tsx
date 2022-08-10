import styled from '@emotion/styled'

const Container = styled.div`
  grid-template-columns: auto 7ch auto;
`

export function AccountORSpacer() {
  return (
    <Container className="grid items-center">
      <div className="w-full h-2px bg-grey-medium" />
      <div className="font-bold text-16px leading-20px text-grey-medium text-center uppercase">OR</div>
      <div className="w-full h-2px bg-grey-medium" />
    </Container>
  )
}
