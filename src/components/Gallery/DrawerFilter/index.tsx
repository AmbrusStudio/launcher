import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'

import { GALLERYS_FILTERS_STATUS } from '../../../data'
import { Filter } from '../../../types/gallery'
import { toggleFilterCheckedFn, toggleFilterOpenFn } from '../../../utils'
import GalleryFilter from '../../Gallery/Filter'
import FilterSliderLineClear from '../../Icon/FilterSliderLineClear'

interface DrawerFilterProps {
  readonly visibleDrawer: boolean
  readonly isFixed: boolean
  setVisibleDrawer: Dispatch<SetStateAction<boolean>>
  applyFilter: (filter: Filter[]) => void
}

const DrawerFilter: FC<DrawerFilterProps> = ({ visibleDrawer, isFixed, setVisibleDrawer, applyFilter }) => {
  // Filter
  const [filter, setFilter] = useState<Filter[]>(GALLERYS_FILTERS_STATUS)

  // https://mui.com/material-ui/react-drawer/#swipeable
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  // Toggle Filter children tab
  const toggleFilterTab = useCallback(
    (index: number) => {
      const list = toggleFilterOpenFn(filter, index)
      list && setFilter(list)
    },
    [filter]
  )

  // Toggle filter children tag checked
  const toggleFilterTagChecked = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = toggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
    },
    [filter]
  )

  // Watch visible, false initialization
  useEffect(() => {
    if (!visibleDrawer) {
      setTimeout(() => {
        setFilter(GALLERYS_FILTERS_STATUS)
      }, 300)
    }
  }, [visibleDrawer])

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={visibleDrawer}
      onClose={() => setVisibleDrawer(false)}
      onOpen={() => setVisibleDrawer(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      sx={{
        '.MuiPaper-root': {
          background: 'rgba(42, 42, 42, 0.8)',
          boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
        },
        '.MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <div className="w-[348px] h-full p-x-6 pt-[45px] pb-6 overflow-hidden">
        <div className="flex">
          <div className="flex-1 border-y-2 border-rust p-y-3 text-xl font-bold leading-6 uppercase text-white">
            Filters
          </div>
          <div
            className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center ml-6 cursor-pointer"
            onClick={() => setVisibleDrawer(false)}
          >
            <FilterSliderLineClear
              className="text-black"
              sx={{
                fontSize: '19.4px',
              }}
            />
          </div>
        </div>
        <GalleryFilter
          filter={filter}
          isFixed={isFixed}
          toggleFilterTab={toggleFilterTab}
          toggleFilterTagChecked={toggleFilterTagChecked}
        />
        <button
          className="u-btn u-btn-primary !w-auto absolute bottom-6 left-6 right-6"
          onClick={() => {
            applyFilter(filter)
          }}
        >
          Apply filters
        </button>
      </div>
    </SwipeableDrawer>
  )
}

export default DrawerFilter
