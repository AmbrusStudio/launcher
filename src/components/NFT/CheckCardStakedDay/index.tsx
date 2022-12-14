import { FC } from 'react'

interface Props {
  readonly soulboundBadgeStatus: boolean
}

const CheckCardStakedDay: FC<Props> = ({ soulboundBadgeStatus }) => {
  return (
    <div className="p-3 py-5 xl:px-6 xl:py-10 gap-3 bg-[#2a2a2a] flex flex-1 flex-col justify-center	items-center flex-grow-0 flex-shrink-1 text-white text-center">
      <p className="text-base">This NFT has been staked for Days</p>
      <p className="text-4xl font-bold">
        0 <span className="text-base font-normal">Days</span>
      </p>
    </div>
  )
}

export default CheckCardStakedDay
