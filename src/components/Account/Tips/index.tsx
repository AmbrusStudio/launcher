import styled from '@emotion/styled'

import { classNames } from '../../../utils'

const Tips = styled.div`
  p:not(:last-of-type) {
    margin-bottom: 20px;
  }
  a {
    color: #ff4125;
    text-decoration: underline;
  }
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
`

type AccountTipsProps = { className?: string }

export function AccountTips(props: React.PropsWithChildren<AccountTipsProps>) {
  const { className, children } = props
  return <Tips className={classNames('font-medium text-16px leading-30px text-tips', className)}>{children}</Tips>
}
