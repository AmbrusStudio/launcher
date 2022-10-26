import { Stack } from '@mui/material'
import classNames from 'classnames'
import numbro from 'numbro'
import { FC, RefObject, useMemo } from 'react'

import { Position } from '../../../utils/scroll'

interface Props {
  readonly count: number
  readonly scroll: Position | undefined
  readonly wrapperRef: RefObject<HTMLDivElement>
  clearFilter: () => void
}

const HeadStatus: FC<Props> = ({ scroll, wrapperRef, count, clearFilter }) => {
  const isFixed = useMemo(() => {
    const headerDom = document.querySelector<HTMLDivElement>('#header')
    const headerHeight = headerDom?.offsetHeight || 100
    const mql = window.matchMedia('(min-width: 1024px)')
    // 12 mobile
    // 24 pc
    const padding = mql.matches ? 24 : 12
    return scroll && wrapperRef?.current ? scroll.top >= wrapperRef.current?.offsetTop - headerHeight + padding : false
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
            className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer text-sm font-medium text-center leading-4.25 text-white"
            onClick={() => {
              clearFilter()
            }}
          >
            Reset Filters
          </div>
          <div className="p-x-4 p-y-2 rounded-2xl bg-#FFB600 hidden items-center justify-center cursor-pointer text-sm font-medium text-center leading-4.25 text-white">
            PURE GOLD
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
