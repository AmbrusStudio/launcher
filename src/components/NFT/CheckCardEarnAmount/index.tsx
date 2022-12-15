import { FC } from 'react'

interface CheckCardProps {
  readonly amount: string
}

const CheckCardEarnAmount: FC<CheckCardProps> = ({ amount }) => {
  return (
    <div className="p-3 py-5 xl:px-6 xl:py-10 gap-3 bg-[#2a2a2a] flex flex-1 flex-col justify-center	items-center text-white text-center">
      <p className="text-4 leading-5">Amount of $GDC you will earn</p>
      <div>
        <span className="text-4xl font-bold leading-44px">{amount}</span>
      </div>
    </div>
  )
}

export default CheckCardEarnAmount
