import useUrlState from '@ahooksjs/use-url-state'
import { useScroll, useTimeout } from 'ahooks'
import { cloneDeep } from 'lodash'
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
import { TokenMetadata, Trait } from '../../types'
import { Filter, FilterList } from '../../types/gallery'
import { handleFilterFn } from '../../utils'

function Gallery() {
  const { galleryFilterStatus, filter, setFilter, toggleFilterTab, toggleFilterTagCheckedChange } = useGalleryFilter()
  const [state, setState] = useUrlState({ name: undefined })

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

  // Drawer has filter
  const isFilter = useMemo<boolean>(() => {
    const isChecked = (element: Filter) => (element.list as FilterList[]).find((i) => i.is_checked)

    return filter.some(isChecked)
  }, [filter])

  // Current gallery
  const currentGallery = useMemo<TokenMetadata[]>(() => {
    return handleFilterFn(filter, searchId, metadataAllEdition)
  }, [searchId, filter, metadataAllEdition])

  // Filter checked category
  const checkedFilterCategory = useMemo<string[]>(() => {
    const listChecked = (data: Filter[]): FilterList[][] =>
      data.map((i) => [...i.list.filter((j: FilterList) => j.is_checked)])

    const listFlat = (data: FilterList[][]): string[] => data.flatMap((i) => i.map((j) => j.label))

    return compose(listFlat, listChecked)(filter)
  }, [filter])

  // Clear filter
  const clearFilter = useCallback(() => {
    setFilter(galleryFilterStatus)
    setSearchId('')
  }, [setSearchId, galleryFilterStatus, setFilter])

  useTimeout(() => {
    const list = cloneDeep(filter)

    // Only supports Name
    if (state.name) {
      list.forEach((item, index) => {
        if (item.label === Trait.Name) {
          item.list.forEach((itemJ, indexJ) => {
            if (state.name.toLocaleLowerCase() === itemJ.label.toLocaleLowerCase()) {
              list[index].is_open = true
              list[index].list[indexJ].is_checked = true

              setFilter(list)
            }
          })
        }
      })
    }
  }, 3000)

  return (
    <PageLayout>
      <div className="max-w-[1312px] m-x-auto mt-[92px] lg:mt-[156px] xl:mt-[188px] px-6">
        <GalleryHead />

        <div className="my-3 lg:my-[48px] flex" ref={wrapperRef}>
          <div
            className={
              'hidden lg:block w-[300px] sticky top-[120px] lg:top-[68px] xl:top-[100px] shrink-0 max-height overflow-hidden'
            }
          >
            <div className={'flex m-b-3 lg:m-b-4.5'}>
              <Search searchId={searchId} setSearchId={setSearchId} />
            </div>
            <div className="hidden lg:block">
              <div className="border-y-2 border-rust py-4 text-xl font-bold leading-6 uppercase text-white">
                Filters
              </div>
              <GalleryFilter
                filter={filter}
                toggleFilterTab={toggleFilterTab}
                toggleFilterTagChecked={(parentIndex: number, childrenIndex: number) => {
                  toggleFilterTagCheckedChange(parentIndex, childrenIndex)

                  // Only supports Name
                  if (filter[parentIndex].label === Trait.Name) {
                    if (!filter[parentIndex].list[childrenIndex].is_checked) {
                      setState({ name: filter[parentIndex].list[childrenIndex].label.toLocaleLowerCase() })
                    } else {
                      setState({ name: undefined })
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="lg:ml-[36px] grow-1">
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
