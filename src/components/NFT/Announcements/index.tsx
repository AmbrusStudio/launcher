import { FC } from 'react'

import { getStakeAnnouncement } from '../../../utils'
import NFTAnnouncement from '../NFTAnnouncement'

interface AnnouncementsProps {
  readonly address: string
}

const Announcements: FC<AnnouncementsProps> = ({ address }) => {
  return (
    <>
      {getStakeAnnouncement(address).map((item, index) => (
        <NFTAnnouncement data={item} key={index} />
      ))}
    </>
  )
}

export default Announcements
