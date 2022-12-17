import styled from '@emotion/styled'
import { FC } from 'react'

import { cleanupHTML } from '../../../utils'

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0;
  margin: 0;
`
const Description = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #ffffff;
  padding: 0;
  margin: 12px 0 auto 0;
  ul {
    margin-top: 0.75rem;
    margin-left: 1.5rem;
    list-style-type: disc;
  }
  a {
    text-decoration: underline;
  }
`

interface StakeInfoProps {
  readonly title: string
  readonly description: string
}

const StakeInfoDetail: FC<StakeInfoProps> = ({ title, description }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Description dangerouslySetInnerHTML={{ __html: cleanupHTML(description) }}></Description>
    </div>
  )
}

export default StakeInfoDetail
