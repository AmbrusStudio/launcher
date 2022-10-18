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
import SearchAction from '../../components/Gallery/SearchAction'
import { PageLayout } from '../../components/Layout'
import { useGalleryFilter } from '../../hooks/useGalleryFilter'
import { useMetadata } from '../../hooks/useMetadata'
import { useNumStrState } from '../../hooks/useNumStrState'
import { TokenMetadata } from '../../types'
import { Filter, FilterList } from '../../types/gallery'
import { handleFilterFn, toggleFilterCheckedFn, toggleFilterOpenFn } from '../../utils'

function Gallery() {
  const { galleryFilterStatus, filter, setFilter } = useGalleryFilter()

  // NFT modal
  const [visibleNFT, setVisibleNFT] = useState<boolean>(false)
  // NFT current
  const [currentNFTInfo, setCurrentNFTInfo] = useState<TokenMetadata>()
  // Gallery Filter Drawer
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false)
  // Search by ID
  const [searchId, setSearchId] = useNumStrState()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const scroll = useScroll(document)

  const { metadataAllEdition } = useMetadata()

  const isFixed = useMemo(() => {
    const headerDom = document.querySelector<HTMLDivElement>('#header')
    const headerHeight = headerDom?.offsetHeight || 100
    return scroll && wrapperRef?.current ? scroll.top >= wrapperRef.current?.offsetTop - headerHeight : false
  }, [wrapperRef, scroll])

  // Drawer has filter
  const isFilter = useMemo<boolean>(() => {
    const isChecked = (element: Filter) => (element.list as FilterList[]).find((i) => i.is_checked)

    return filter.some(isChecked)
  }, [filter])

  // Current gallery
  const currentGallery = useMemo<TokenMetadata[]>(() => {
    return handleFilterFn(filter, searchId, metadataAllEdition)
  }, [searchId, filter, metadataAllEdition])

  console.log('currentGallery', currentGallery)

  // Filter checked category
  const checkedFilterCategory = useMemo<string[]>(() => {
    const listChecked = (data: Filter[]): FilterList[][] =>
      data.map((i) => [...i.list.filter((j: FilterList) => j.is_checked)])

    const listFlat = (data: FilterList[][]): string[] => data.flatMap((i) => i.map((j) => j.label))

    compose(listFlat, listChecked)(filter)

    return []
  }, [filter])

  // Toggle Filter children open
  const toggleFilterTab = useCallback(
    (index: number) => {
      const list = toggleFilterOpenFn(filter, index)
      list && setFilter(list)
    },
    [filter, setFilter]
  )

  // Toggle filter children tag checked - change
  const toggleFilterTagCheckedChange = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = toggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
    },
    [filter, setFilter]
  )

  // Clear filter
  const clearFilter = useCallback(() => {
    setFilter(galleryFilterStatus)
    setSearchId('')
  }, [setSearchId, galleryFilterStatus, setFilter])

  return (
    <PageLayout>
      <div className="max-w-[1312px] m-x-auto mt-[92px] lg:mt-[156px] xl:mt-[188px] px-6">
        <GalleryHead />

        <div className="my-3 lg:my-[48px]" ref={wrapperRef}>
          <div
            className={classNames('hidden lg:block absolute w-[300px] max-height overflow-hidden', {
              'fixed lg:top-[68px] xl:top-[100px]': isFixed,
            })}
          >
            <div className={'flex m-b-3 lg:m-b-4.5'}>
              <Search searchId={searchId} setSearchId={setSearchId} />
            </div>
            <div className="hidden lg:block">
              <div className="border-y-2 border-rust py-4 text-xl font-bold leading-6 uppercase text-white">
                Filters
              </div>
              <div className={classNames({ 'bg-[#252525]': isFixed })}>
                <GalleryFilter
                  filter={filter}
                  isFixed={isFixed}
                  toggleFilterTab={toggleFilterTab}
                  toggleFilterTagChecked={toggleFilterTagCheckedChange}
                />
              </div>
            </div>
          </div>
          <div className="lg:ml-[336px]">
            <SearchAction
              searchId={searchId}
              isFilter={isFilter}
              setSearchId={setSearchId}
              clearFilter={clearFilter}
              setVisibleDrawer={setVisibleDrawer}
            />

            <HeadStatus
              scroll={scroll}
              wrapperRef={wrapperRef}
              count={currentGallery.length}
              clearFilter={clearFilter}
            />

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
