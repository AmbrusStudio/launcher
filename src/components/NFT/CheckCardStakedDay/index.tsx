import { FC } from 'react'

interface Props {
  readonly soulboundBadgeStatus: boolean
}

const CheckCardStakedDay: FC<Props> = ({ soulboundBadgeStatus }) => {
  return (
    <div className="p-3 py-5 xl:px-6 xl:py-10 gap-3 bg-[#2a2a2a] flex flex-1 flex-col justify-center	items-center text-white text-center">
      <p className="text-4 leading-5">This NFT has been staked for Days</p>
      <div>
        <span className="text-4xl font-bold leading-44px">0</span>
        <span className="text-base font-normal ml-3 leading-5">Days</span>
      </div>
    </div>
  )
}

export default CheckCardStakedDay
