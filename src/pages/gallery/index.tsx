import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { cloneDeep } from 'lodash'
import numbro from 'numbro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { compose } from 'redux'

import logo from '../../assets/images/logo.png'
import FilterChecked from '../../components/Icon/FilterChecked'
import FilterClose from '../../components/Icon/FilterClose'
import FilterOpen from '../../components/Icon/FilterOpen'
import FilterSliderLine from '../../components/Icon/FilterSliderLine'
import Opensea from '../../components/Icon/Opensea'
import ModalGallery from '../../components/ModalGallery'
import { GALLERY_INFO, GALLERYS, GALLERYS_FILTERS } from '../../data'
import { GALLERY, GALLERY_FILTER, GALLERY_FILTER_LIST } from '../../types/gallery'

type FilterList = GALLERY_FILTER_LIST & {
  is_checked: boolean
}

type Filter = GALLERY_FILTER & {
  is_open: boolean
  list: FilterList[]
}

function Gallery() {
  // Filter
  const [filter, setFilter] = useState<Filter[]>([])
  // gallery filter
  const [galleryFilter, setGalleryFilter] = useState<GALLERY[]>([])
  // search by ID
  const [searchId, setSearchId] = useState<string>('')
  // NFT modal
  const [visibleNFT, setVisibleNFT] = useState<boolean>(false)
  // NFT current
  const [currentNFTInfo, setCurrentNFTInfo] = useState<GALLERY>()

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

  // Toggle FIlter children tag checked
  const ToggleFilterTagChecked = useCallback(
    (parentIndex: number, childrenIndex: number) => {
      const list = cloneDeep(filter)
      list[parentIndex].list[childrenIndex].is_checked = !list[parentIndex].list[childrenIndex].is_checked
      setFilter(list)
    },
    [filter]
  )

  // Handle filter
  const handleFilter = useCallback(() => {
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
  }, [filter, searchId])

  // initialization filter status
  const initFilterStatus = useCallback(() => {
    const filterList: Filter[] = GALLERYS_FILTERS.map((i) => ({
      ...i,
      is_open: false,
      list: i.list.map((j) => ({
        ...j,
        is_checked: false,
      })),
    }))
    setFilter(filterList)
  }, [])

  const currentGallery = useMemo(() => {
    if (searchId) {
      return galleryFilter.length ? galleryFilter : []
    } else {
      return galleryFilter.length ? galleryFilter : GALLERYS
    }
  }, [searchId, galleryFilter])

  // initialization filter status
  useEffect(() => {
    initFilterStatus()
  }, [initFilterStatus])

  useEffect(() => {
    handleFilter()
  }, [handleFilter])

  return (
    <>
      <div className="max-w-[1312px] m-x-auto mt-[68px] xl:mt-[188px] p-6">
        <div className="flex justify-between">
          <img src={logo} className="hidden xl:block w-[60px] h-[60px] mr-3 mt-[9px]" />
          <div>
            <p className="text-[32px] xl:text-[64px] leading-[39px] xl:leading-[78px] font-bold uppercase text-white">
              {GALLERY_INFO.title}
            </p>
            <p className="text-[32px] xl:text-[64px] leading-[39px] xl:leading-[78px] font-bold uppercase text-rust">
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

        <div className="flex flex-col xl:flex-row justify-between my-3 xl:my-[48px]">
          <div className="xl:w-[300px]">
            <div>
              <div className="w-[52px] h-[52px] rounded bg-white hidden">
                <FilterSliderLine className="text-black" />
              </div>
              <div className="p-6 m-b-4.5 bg-black/20 flex items-center">
                <span className="text-4xl font-bold uppercase text-white leading-11">#</span>
                <input
                  placeholder="ID"
                  className="bg-transparent text-white outline-none ml-4 leading-11 uppercase font-bold not-italic text-4xl w-[100%]
              placeholder:uppercase placeholder:font-bold placeholder:not-italic placeholder:text-4xl placeholder:opacity-20 placeholder:text-white"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
            </div>
            <div className="border-y-2 border-rust p-y-4 text-xl font-bold leading-6 uppercase text-white">Filters</div>
            <ul className="select-none">
              {filter.map((item, index) => (
                <li key={index}>
                  <div
                    className={`border-b-1 border-[#465358] p-y-4 flex items-center justify-between${
                      item.list.length && ' ' + 'cursor-pointer'
                    }`}
                    onClick={() => toggleFilterTab(index)}
                  >
                    <span className="text-sm leading-[17px] uppercase text-white">{item.label}</span>
                    {!!item.list.length && (
                      <>
                        {item.is_open ? (
                          <FilterClose
                            sx={{
                              fontSize: '12px',
                            }}
                          />
                        ) : (
                          <FilterOpen
                            sx={{
                              fontSize: '12px',
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                  {item.is_open && (
                    <ul>
                      {item.list.map((tab: FilterList, indexJ) => (
                        <li
                          key={indexJ}
                          className="border-b-1 border-[#2A2A2A] bg-black flex items-center justify-between p-3 cursor-pointer"
                          onClick={() => {
                            ToggleFilterTagChecked(index, indexJ)
                          }}
                        >
                          <span className="text-sm leading-[17px]">
                            <span className="text-white">{tab.label}</span>
                            <span className="text-white/50 m-l-1">
                              ({numbro(tab.count).format({ thousandSeparated: true })})
                            </span>
                          </span>
                          {tab.is_checked && (
                            <FilterChecked
                              className="text-rust"
                              sx={{
                                fontSize: '12px',
                                lineHeight: '14px',
                              }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center	justify-between">
              <div
                className="p-x-4 p-y-2 rounded-2xl bg-white/10 hidden xl:flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setGalleryFilter([])
                  initFilterStatus()
                  setSearchId('')
                }}
              >
                <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
              </div>
              <p className="text-sm font-medium leading-4.25 text-white">
                {numbro(currentGallery.length).format({ thousandSeparated: true })} items
              </p>
            </div>
            {
              <div className="xl:w-[928px] mt-3 xl:mt-6">
                {!!currentGallery.length && (
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                    {currentGallery.map((gallery, index) => (
                      <div
                        key={index}
                        className="w-[100%] h-[100%] rounded overflow-hidden relative cursor-pointer"
                        onClick={() => {
                          setCurrentNFTInfo(currentGallery[index])
                          setVisibleNFT(true)
                        }}
                      >
                        <img src={gallery.image} className="w-[100%] h-[100%] object-cover" />
                        <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
                          #{gallery.id}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {!currentGallery.length && <div className="text-lg py-6 text-center text-white">No Item</div>}
              </div>
            }
          </div>
        </div>
      </div>
      <ModalGallery
        title="E4C Rangers"
        id={currentNFTInfo?.id}
        visible={visibleNFT}
        toggle={(value) => setVisibleNFT(value)}
      >
        <Box
          className="flex"
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="lg:w-[600px] lg:h-[600px] overflow-hidden border-4 border-white">
            <img
              className="h-full object-cover w-full"
              src="https://ambrus.s3.amazonaws.com/1657877346203_0.92_206.jpg"
              alt="logo"
            />
          </div>
          <div className="flex flex-col flex-grow p-9 text-white">
            <div className="grid grid-cols-2 gap-6">
              {currentNFTInfo?.trait.map((j, index: number) => (
                <section key={index}>
                  <p className="font-normal text-xs leading-[15px] m-0 p-0 not-italic uppercase text-[#a0a4b0]">
                    {j.key}
                  </p>
                  <p className="font-bold text-base leading-5 mx-0 mb-0 mt-1 p-0 text-[#2A2A2A] not-italic">
                    {j.value}
                  </p>
                </section>
              ))}
            </div>

            <Stack className="mt-auto" spacing={4.5} direction="row">
              <a
                className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
                href={currentNFTInfo?.opensea_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Opensea
              </a>
              <a
                className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
                href={currentNFTInfo?.looksrare_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Looksrare
              </a>
              <a
                className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
                href={currentNFTInfo?.etherscan_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Etherscan
              </a>
            </Stack>
          </div>
        </Box>
      </ModalGallery>
    </>
  )
}

export default Gallery
