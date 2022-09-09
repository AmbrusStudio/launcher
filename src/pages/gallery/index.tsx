import { useScroll } from 'ahooks'
import classNames from 'classnames'
import numbro from 'numbro'
import { useCallback, useMemo, useRef, useState } from 'react'
import { compose } from 'redux'

import logo from '../../assets/images/logo.png'
import DrawerFilter from '../../components/Gallery/DrawerFilter'
import GalleryFilter from '../../components/Gallery/Filter'
import GalleryWrapper from '../../components/Gallery/GalleryWrapper'
import GalleryWrapperFilter from '../../components/Gallery/GalleryWrapperFilter'
import ModalGalleryInfo from '../../components/Gallery/ModalGalleryInfo'
import FilterSliderClose from '../../components/Icon/FilterSliderClose'
import FilterSliderLine from '../../components/Icon/FilterSliderLine'
import Opensea from '../../components/Icon/Opensea'
import { PageLayout } from '../../components/Layout'
import { GALLERY_INFO, GALLERYS_FILTERS_STATUS } from '../../data'
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

  const headRef = useRef<HTMLDivElement>(null)
  const scroll = useScroll(document)

  const isFixedHead = useMemo(() => {
    // console.log('headRef', headRef?.current?.offsetTop)
    // console.log('headRef current', headRef?.current)
    // console.log('scroll', scroll)
    return scroll && headRef?.current ? scroll.top >= headRef.current?.offsetTop - 100 : false
  }, [headRef, scroll])

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
        <div className="flex justify-between">
          <img src={logo} className="hidden lg:block w-[60px] h-[60px] mr-3 mt-[9px]" />
          <div>
            <p className="text-[32px] lg:text-[64px] leading-[39px] lg:leading-[78px] font-bold uppercase text-white">
              {GALLERY_INFO.title}
            </p>
            <p className="text-[32px] lg:text-[64px] leading-[39px] lg:leading-[78px] font-bold uppercase text-rust">
              {GALLERY_INFO.description}
            </p>
          </div>
          <a
            href={GALLERY_INFO.opensea_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto mt-[3.75px] block w-[52.5px] h-[52.5px]"
          >
            <Opensea
              sx={{
                fontSize: {
                  xs: '31.5px',
                  lg: '52.5px',
                },
              }}
            />
          </a>
        </div>

        <div className="flex flex-col lg:flex-row justify-between my-3 lg:my-[48px]" ref={headRef}>
          <div
            className={classNames('lg:w-[300px] lg:shrink-0 m-r-9 absolute', {
              'fixed top-[100px] z-1': isFixedHead,
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
              <div className="flex-1 p-4 lg:p-6 bg-black/20 flex items-center">
                <span className="text-base lg:text-4xl font-bold uppercase text-white leading-5 lg:leading-11">#</span>
                <input
                  placeholder="ID"
                  className="bg-transparent text-white outline-none ml-2 lg:ml-4 leading-5 lg:leading-11 uppercase font-bold not-italic text-base lg:text-4xl w-[100%]
              placeholder:uppercase placeholder:font-bold placeholder:not-italic placeholder:text-base lg:placeholder:text-4xl placeholder:opacity-20 placeholder:text-white"
                  value={searchId}
                  onChange={(e) => {
                    setSearchId(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="border-y-2 border-rust p-y-4 text-xl font-bold leading-6 uppercase text-white">
                Filters
              </div>
              <GalleryFilter
                filter={filter}
                toggleFilterTab={toggleFilterTab}
                toggleFilterTagChecked={toggleFilterTagCheckedChange}
              />
            </div>
          </div>
          <div className="w-full ml-[336px]">
            <div
              className={classNames('flex items-center justify-between sticky top-[100px] z-1', {
                'bg-[#252525]': isFixedHead,
              })}
            >
              <div
                className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer"
                onClick={() => {
                  clearFilter()
                }}
              >
                <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
              </div>
              <p className="text-sm font-medium leading-4.25 text-white">
                {numbro(currentGallery.length).format({ thousandSeparated: true })} items
              </p>
            </div>

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
