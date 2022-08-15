import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { cloneDeep } from 'lodash'
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import GalleryFilter from '../../../components/Gallery/Filter'
import FilterSliderLineClear from '../../../components/Icon/FilterSliderLineClear'
import { GALLERYS_FILTERS_STATUS } from '../../../data'
import { Filter } from '../../../types/gallery'
import { ToggleFilterCheckedFn } from '../../../utils'

interface DrawerFilterProps {
  readonly visibleDrawer: boolean
  setVisibleDrawer: Dispatch<SetStateAction<boolean>>
  applyFilter: (filter: Filter[]) => void
}

const DrawerFilter: FC<DrawerFilterProps> = ({ visibleDrawer, setVisibleDrawer, applyFilter }) => {
  // Filter
  const [filter, setFilter] = useState<Filter[]>(GALLERYS_FILTERS_STATUS)

  // https://mui.com/material-ui/react-drawer/#swipeable
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  // Toggle Filter children tab
  const toggleFilterTab = useCallback(
    (index: number) => {
      if (!filter[index].list.length) {
        return
      }
      const list = cloneDeep(filter)
      list[index].is_open = !list[index].is_open
      setFilter(list)
    },
    [filter]
  )

  // Toggle filter children tag checked
  const ToggleFilterTagChecked = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = ToggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
    },
    [filter]
  )

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
      <div className="w-[348px] p-x-6 p-t-[45px] p-b-[129px] overflow-auto">
        <div className="flex">
          <div className="flex-1 border-y-2 border-rust p-y-3 text-xl font-bold leading-6 uppercase text-white">
            Filters
          </div>
          <div
            className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center ml-6"
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
          toggleFilterTab={toggleFilterTab}
          ToggleFilterTagChecked={ToggleFilterTagChecked}
        />
        <button
          className="p-y-5 bg-[#ff4125] leading-5 uppercase text-white text-base font-semibold absolute bottom-6 left-6 right-6"
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
