import { cloneDeep } from 'lodash'
import numbro from 'numbro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { compose } from 'redux'

import logo from '../../assets/images/logo.png'
import DrawerFilter from '../../components/Gallery/DrawerFilter'
import GalleryFilter from '../../components/Gallery/Filter'
import GalleryItem from '../../components/Gallery/GalleryItem'
import ModalGalleryInfo from '../../components/Gallery/ModalGalleryInfo'
import FilterSliderClose from '../../components/Icon/FilterSliderClose'
import FilterSliderLine from '../../components/Icon/FilterSliderLine'
import Opensea from '../../components/Icon/Opensea'
import { PageLayout } from '../../components/Layout'
import { GALLERY_INFO, GALLERYS, GALLERYS_FILTERS_STATUS } from '../../data'
import { Filter, FilterList, GALLERY } from '../../types/gallery'
import { ToggleFilterCheckedFn } from '../../utils'

function Gallery() {
  // Filter
  const [filter, setFilter] = useState<Filter[]>(GALLERYS_FILTERS_STATUS)
  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState<GALLERY[]>([])
  // Search by ID
  const [searchId, setSearchId] = useState<string>('')
  // NFT modal
  const [visibleNFT, setVisibleNFT] = useState<boolean>(false)
  // NFT current
  const [currentNFTInfo, setCurrentNFTInfo] = useState<GALLERY>()
  // Gallery Filter Drawer
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false)

  // Drawer has filter
  const hasFilter = useMemo(() => {
    const isChecked = (element: Filter) => (element.list as FilterList[]).find((i) => i.is_checked)

    return filter.some(isChecked)
  }, [filter])

  // Current gallery data
  const currentGallery = useMemo(() => {
    if (searchId) {
      return galleryFilter.length ? galleryFilter : []
    } else {
      return galleryFilter.length ? galleryFilter : GALLERYS
    }
  }, [searchId, galleryFilter])

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

  // Handle filter
  const handleFilter = useCallback(
    (filter: Filter[]) => {
      const filterFlat = (list: Filter[]) => list.flatMap((item) => item.list)
      const filterChecked = (list: FilterList[]) => list.filter((item) => item.is_checked)
      const filterExtract = (list: FilterList[]) => list.map((item) => item.label)

      // search
      const gallery = searchId ? GALLERYS.filter((item) => String(item.id).includes(searchId)) : GALLERYS

      // filter
      const filterResult = compose(filterExtract, filterChecked, filterFlat)(filter)

      // checked
      const result = filterResult.length
        ? gallery.filter((item) => item.trait.find((i) => filterResult.includes(i.value)))
        : gallery

      setGalleryFilter(result)
    },
    [searchId]
  )

  // Toggle filter children tag checked - change
  const ToggleFilterTagCheckedChange = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = ToggleFilterCheckedFn(filter, parentIndex, childrenIndex)
      setFilter(list)
      handleFilter(list)
    },
    [filter, handleFilter]
  )

  // Clear filter
  const ClearFilter = useCallback(() => {
    setGalleryFilter([])
    setFilter(GALLERYS_FILTERS_STATUS)
    setSearchId('')
  }, [])

  // Watch searchId change
  useEffect(() => {
    handleFilter(filter)
  }, [handleFilter, filter])

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

        <div className="flex flex-col lg:flex-row justify-between my-3 lg:my-[48px]">
          <div className="lg:w-[300px] lg:shrink-0 m-r-9">
            <div className="flex m-b-6 lg:m-b-4.5">
              {hasFilter ? (
                <div className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center mr-3 lg:hidden">
                  <FilterSliderClose
                    className="text-black"
                    onClick={() => ClearFilter()}
                    sx={{
                      fontSize: '26.87px',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[52px] h-[52px] rounded bg-white flex items-center justify-center mr-3 lg:hidden"
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
                ToggleFilterTagChecked={ToggleFilterTagCheckedChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center	justify-between">
              <div
                className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden lg:flex items-center justify-center cursor-pointer"
                onClick={() => {
                  ClearFilter()
                }}
              >
                <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
              </div>
              <p className="text-sm font-medium leading-4.25 text-white">
                {numbro(currentGallery.length).format({ thousandSeparated: true })} items
              </p>
            </div>
            {
              <div className="xl:w-[928px] mt-3 lg:mt-6">
                {!!currentGallery.length && (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {currentGallery.map((gallery, index) => (
                      <GalleryItem
                        key={index}
                        data={gallery}
                        onClick={() => {
                          setCurrentNFTInfo(currentGallery[index])
                          setVisibleNFT(true)
                        }}
                      />
                    ))}
                  </div>
                )}
                {!currentGallery.length && <div className="text-lg py-6 text-center text-white">No Item</div>}
              </div>
            }
          </div>
        </div>
      </div>

      <ModalGalleryInfo visible={visibleNFT} setVisible={setVisibleNFT} currentNFTInfo={currentNFTInfo} />
      <DrawerFilter
        visibleDrawer={visibleDrawer}
        setVisibleDrawer={setVisibleDrawer}
        applyFilter={(value) => {
          handleFilter(value)
          setFilter(value)
          setVisibleDrawer(false)
        }}
      />
    </PageLayout>
  )
}

export default Gallery
