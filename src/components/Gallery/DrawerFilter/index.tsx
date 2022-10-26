import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { useGalleryFilter } from '../../../hooks/useGalleryFilter'
import { Filter } from '../../../types/gallery'
import GalleryFilter from '../../Gallery/Filter'
import FilterSliderLineClear from '../../Icon/FilterSliderLineClear'

interface DrawerFilterProps {
  readonly visibleDrawer: boolean
  setVisibleDrawer: Dispatch<SetStateAction<boolean>>
  applyFilter: (filter: Filter[]) => void
}

const DrawerFilter: FC<DrawerFilterProps> = ({ visibleDrawer, setVisibleDrawer, applyFilter }) => {
  const { galleryFilterStatus, filter, setFilter, toggleFilterTab, toggleFilterTagCheckedChange } = useGalleryFilter()

  // https://mui.com/material-ui/react-drawer/#swipeable
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  // Watch visible, false initialization
  useEffect(() => {
    if (!visibleDrawer) {
      setTimeout(() => {
        setFilter(galleryFilterStatus)
      }, 300)
    }
  }, [visibleDrawer, galleryFilterStatus, setFilter])

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
          toggleFilterTab={toggleFilterTab}
          toggleFilterTagChecked={toggleFilterTagCheckedChange}
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
