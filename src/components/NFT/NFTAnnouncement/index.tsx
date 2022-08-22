import styled from '@emotion/styled'
import { FC } from 'react'

import { NFTAnnouncementType } from '../../../types'

const InfoTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`

const InfoTieleFirst = styled(InfoTitle)`
  color: #eb466d;
`
const InfoTieleSecond = styled(InfoTitle)`
  color: #ffa800;
`

const InfoList = styled.ul`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  margin: 12px 0 0 24px;
  padding: 0;
`

interface NFTAnnouncementProps {
  readonly data: NFTAnnouncementType
}

const NFTAnnouncement: FC<NFTAnnouncementProps> = ({ data }) => {
  return (
    <div>
      <InfoTieleFirst>{data.first}</InfoTieleFirst>
      <InfoTieleSecond>{data.second}</InfoTieleSecond>
      <InfoList>
        {data?.list.map((item, indexJ) => (
          <li key={indexJ}>{item.text}</li>
        ))}
      </InfoList>
    </div>
  )
}

export default NFTAnnouncement
