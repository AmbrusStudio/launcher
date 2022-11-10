import { Stack } from '@mui/material'
import classNames from 'classnames'
import numbro from 'numbro'
import { Dispatch, FC, RefObject, SetStateAction, useMemo } from 'react'

import { Position } from '../../../utils/scroll'

interface Props {
  readonly count: number
  readonly scroll: Position | undefined
  readonly wrapperRef: RefObject<HTMLDivElement>
  readonly pureGold: boolean
  clearFilter: () => void
  setPureGold: Dispatch<SetStateAction<boolean>>
}

const HeadStatus: FC<Props> = ({ scroll, wrapperRef, count, pureGold, setPureGold, clearFilter }) => {
  const isFixed = useMemo(() => {
    const headerDom = document.querySelector<HTMLDivElement>('#header')
    const headerHeight = headerDom?.offsetHeight || 100
    const mql = window.matchMedia('(min-width: 1024px)')
    // 12 mobile
    // 24 pc
    const padding = mql.matches ? 24 : 12
    return scroll && wrapperRef?.current ? scroll.top >= wrapperRef.current.offsetTop - headerHeight + padding : false
  }, [scroll, wrapperRef])

  return (
    <div
      className={classNames(
        'flex items-center justify-between sticky top-[120px] lg:top-[68px] xl:top-[100px] py-3 z-1',
        {
          'bg-[#252525]': isFixed,
        }
      )}
    >
      {
        <Stack spacing={3} direction="row">
          <div
            className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer text-sm font-medium text-center leading-[17px] text-white select-none"
            onClick={() => {
              clearFilter()
            }}
          >
            Reset Filters
          </div>
          <div
            className={classNames(
              'p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer text-sm font-bold text-center leading-[17px] text-white select-none uppercase',
              {
                'bg-gradient-linear-[(90deg,_#E4AA15_0%,_#F0C75D_100%)] text-black': pureGold,
              }
            )}
            onClick={() => setPureGold(!pureGold)}
          >
            Pure Gold
          </div>
        </Stack>
      }

      <span className="text-sm font-medium leading-4.25 text-white">
        {numbro(count).format({ thousandSeparated: true })} items
      </span>
    </div>
  )
}

export default HeadStatus
