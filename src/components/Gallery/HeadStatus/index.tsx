import classNames from 'classnames'
import numbro from 'numbro'
import { FC } from 'react'

interface Props {
  readonly isFixed: boolean
  readonly count: number
  clearFilter: () => void
}

const HeadStatus: FC<Props> = ({ isFixed, count, clearFilter }) => {
  return (
    <div
      className={classNames('flex items-center justify-between sticky top-[120px] lg:top-[100px] z-1', {
        'bg-[#252525] py-3': isFixed,
      })}
    >
      <div
        className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer text-sm font-medium text-center leading-4.25 text-white"
        onClick={() => {
          clearFilter()
        }}
      >
        Reset Filters
      </div>
      <span className="text-sm font-medium leading-4.25 text-white">
        {numbro(count).format({ thousandSeparated: true })} items
      </span>
    </div>
  )
}

export default HeadStatus
