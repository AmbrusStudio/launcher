import { FC } from 'react'

interface CheckCardProps {
  readonly soulboundBadgeStatus: boolean
}

const CheckCardEarnAmount: FC<CheckCardProps> = ({ soulboundBadgeStatus }) => {
  return (
    <div className="p-3 py-5 xl:px-6 xl:py-10 gap-3 bg-[#2a2a2a] flex flex-1 flex-col justify-center	items-center flex-grow-0 flex-shrink-1 text-white text-center">
      <p className="text-base">Amount of $GDC you will earn</p>
      <p className="text-4xl font-bold">0</p>
    </div>
  )
}

export default CheckCardEarnAmount
