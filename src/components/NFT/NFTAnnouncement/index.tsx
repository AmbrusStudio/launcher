import styled from '@emotion/styled'
import { FC } from 'react'

import { StakeAnnouncement } from '../../../types'
import { cleanupHTML } from '../../../utils'

const StyledList = styled.li`
  a {
    text-decoration: underline;
  }
  strong {
    font-weight: bold;
  }
`

interface NFTAnnouncementProps {
  readonly data: StakeAnnouncement
}

const NFTAnnouncement: FC<NFTAnnouncementProps> = ({ data }) => {
  return (
    <div>
      <h3 className="font-bold text-base xl:text-2xl leading-5 xl:leading-[29px] m-0 p-0 not-italic uppercase text-[#EB466D]">
        {data.title}
      </h3>
      <h3 className="font-bold text-base xl:text-2xl leading-5 xl:leading-[29px] m-0 p-0 not-italic uppercase text-[#FFA800]">
        {data.description}
      </h3>
      <ul className="font-normal text-sm xl:text-base leading-6 xl:leading-[30px] mr-0 mb-0 mt-3 ml-6 p-0 text-black not-italic list-disc">
        {data.list.map((item, index) => (
          <StyledList key={index} dangerouslySetInnerHTML={{ __html: cleanupHTML(item.text) }} />
        ))}
      </ul>
    </div>
  )
}

export default NFTAnnouncement
