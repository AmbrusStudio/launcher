import { useScroll } from 'ahooks'
import classNames from 'classnames'
import { useCallback, useMemo, useRef, useState } from 'react'
import { compose } from 'redux'

import DrawerFilter from '../../components/Gallery/DrawerFilter'
import GalleryFilter from '../../components/Gallery/Filter'
import GalleryHead from '../../components/Gallery/GalleryHead'
import GalleryWrapper from '../../components/Gallery/GalleryWrapper'
import GalleryWrapperFilter from '../../components/Gallery/GalleryWrapperFilter'
import HeadStatus from '../../components/Gallery/HeadStatus'
import ModalGalleryInfo from '../../components/Gallery/ModalGalleryInfo'
import Search from '../../components/Gallery/Search'
import FilterSliderClose from '../../components/Icon/FilterSliderClose'
import FilterSliderLine from '../../components/Icon/FilterSliderLine'
import { PageLayout } from '../../components/Layout'
import { GALLERYS_FILTERS_STATUS } from '../../data'
import { useNumStrState } from '../../hooks/useNumStrState'
import { Metadata } from '../../types'
import { Filter, FilterList } from '../../types/gallery'
import { handleFilterFn, toggleFilterCheckedFn, toggleFilterOpenFn } from '../../utils'

function Gallery() {
  // Filter
  const [filter, setFilter] = useState<Filter[]>(GALLERYS_FILTERS_STATUS)
  // NFT modal
  const [visibleNFT, setVisibleNFT] = useState<boolean>(false)
  // NFT current
  const [currentNFTInfo, setCurrentNFTInfo] = useState<Metadata>()
  // Gallery Filter Drawer
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false)
  // Search by ID
  const [searchId, setSearchId] = useNumStrState()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const scroll = useScroll(document)

  const isFixed = useMemo(() => {
    return scroll && wrapperRef?.current ? scroll.top >= wrapperRef.current?.offsetTop - 100 : false
  }, [wrapperRef, scroll])

  // Drawer has filter
  const hasFilter = useMemo<boolean>(() => {
    const isChecked = (element: Filter) => (element.list as FilterList[]).find((i) => i.is_checked)

    return filter.some(isChecked)
  }, [filter])

  // Current gallery
  const currentGallery = useMemo<Metadata[]>(() => {
    return handleFilterFn(filter, searchId)
  }, [searchId, filter])

  // Filter checked category
  const checkedFilterCategory = useMemo<string[]>(() => {
    const listChecked = (data: Filter[]): FilterList[][] =>
      data.map((i) => [...i.list.filter((j: FilterList) => j.is_checked)])

    const listFlat = (data: FilterList[][]): string[] => data.flatMap((i) => i.map((j) => j.label))

    return compose(listFlat, listChecked)(filter)
  }, [filter])

  // Toggle Filter children open
  const toggleFilterTab = useCallback(
    (index: number) => {
      const list = toggleFilterOpenFn(filter, index)
      list && setFilter(list)
    },
    [filter]
  )

  // Toggle filter children tag checked - change
  const toggleFilterTagCheckedChange = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = toggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
    },
    [filter]
  )

  // Clear filter
  const clearFilter = useCallback(() => {
    setFilter(GALLERYS_FILTERS_STATUS)
    setSearchId('')
  }, [setSearchId])

  return (
    <PageLayout>
      <div className="max-w-[1312px] m-x-auto mt-[68px] lg:mt-[98px] xl:mt-[188px] p-6">
        <GalleryHead />

        <div className="flex flex-col lg:flex-row justify-between my-3 lg:my-[48px]" ref={wrapperRef}>
          <div
            className={classNames('lg:w-[300px] lg:shrink-0 m-r-9 absolute', {
              'fixed top-[100px] z-1': isFixed,
              'max-height overflow-hidden': true,
            })}
          >
            <div className="flex m-b-6 lg:m-b-4.5">
              {hasFilter ? (
                <div
                  className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center mr-3 cursor-pointer lg:hidden"
                  onClick={() => clearFilter()}
                >
                  <FilterSliderClose
                    className="text-black"
                    sx={{
                      fontSize: '26.87px',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center mr-3 cursor-pointer lg:hidden"
                  onClick={() => setVisibleDrawer(true)}
                >
                  <FilterSliderLine
                    className="text-black"
                    sx={{
                      fontSize: '24px',
                    }}
                  />
                </div>
              )}
              <Search searchId={searchId} setSearchId={setSearchId} />
            </div>
            <div className="hidden lg:block">
              <div className="border-y-2 border-rust py-4 text-xl font-bold leading-6 uppercase text-white">
                Filters
              </div>
              <GalleryFilter
                filter={filter}
                isFixed={isFixed}
                toggleFilterTab={toggleFilterTab}
                toggleFilterTagChecked={toggleFilterTagCheckedChange}
              />
            </div>
          </div>
          <div className="w-full ml-[336px]">
            <HeadStatus isFixed={isFixed} count={currentGallery.length} clearFilter={clearFilter} />

            {checkedFilterCategory.length || searchId ? (
              <GalleryWrapperFilter
                allToken={currentGallery}
                setCurrentNFTInfo={setCurrentNFTInfo}
                setVisibleNFT={setVisibleNFT}
              />
            ) : (
              <GalleryWrapper
                allToken={currentGallery}
                setCurrentNFTInfo={setCurrentNFTInfo}
                setVisibleNFT={setVisibleNFT}
              />
            )}
          </div>
        </div>
      </div>

      {currentNFTInfo && <ModalGalleryInfo visible={visibleNFT} setVisible={setVisibleNFT} metadata={currentNFTInfo} />}
      <DrawerFilter
        isFixed={isFixed}
        visibleDrawer={visibleDrawer}
        setVisibleDrawer={setVisibleDrawer}
        applyFilter={(value) => {
          setFilter(value)
          setVisibleDrawer(false)
        }}
      />
    </PageLayout>
  )
}

export default Gallery
