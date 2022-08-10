import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { compose } from 'redux'

import logo from '../../assets/images/logo.png'
import FilterChecked from '../../components/Icon/FilterChecked'
import FilterClose from '../../components/Icon/FilterClose'
import FilterOpen from '../../components/Icon/FilterOpen'
import Opensea from '../../components/Icon/Opensea'
import { GALLERYS, GALLERYS_FILTERS } from '../../data'
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
      ? gallery.filter((item) => item.property.find((i) => filterResult.includes(i.value)))
      : gallery

    setGalleryFilter(result)
  }, [filter, searchId])

  const currentGallery = useMemo(() => {
    if (searchId) {
      return galleryFilter.length ? galleryFilter : []
    } else {
      return galleryFilter.length ? galleryFilter : GALLERYS
    }
  }, [searchId, galleryFilter])

  // initialization filter status
  useEffect(() => {
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

  useEffect(() => {
    handleFilter()
  }, [handleFilter])

  return (
    <div className="max-w-[1264px] m-x-auto mt-[188px]">
      <div className="flex justify-between">
        <img src={logo} className="w-[60px] h-[60px] mr-3 mt-[9px]" />
        <div>
          <p className="text-[64px] leading-[78px] font-bold uppercase text-white">E4C Rangers</p>
          <p className="text-[64px] leading-[78px] font-bold uppercase text-rust">Gallery</p>
        </div>
        <Opensea
          className="ml-auto mt-[3.75px]"
          sx={{
            fontSize: '52.5px',
          }}
        />
      </div>

      <div className="flex justify-between my-[48px]">
        <div className="w-[300px]">
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
                          <span className="text-white/50 m-l-1">({tab.count})</span>
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
            <div className="w-[120px] h-8 rounded-2xl bg-white/10 flex items-center justify-center">
              <p
                className="text-sm font-medium text-center leading-4.25 text-white cursor-pointer"
                onClick={() => {
                  setGalleryFilter([])
                  setSearchId('')
                }}
              >
                Reset Filters
              </p>
            </div>
            <p className="text-sm font-medium leading-4.25 text-white">
              {galleryFilter.length || GALLERYS.length} items
            </p>
          </div>
          {
            <div className="w-[928px] mt-6">
              {!!currentGallery.length && (
                <div className="grid grid-cols-4 gap-3">
                  {currentGallery.map((gallery, index) => (
                    <div key={index} className="w-[223px] h-[223px] rounded overflow-hidden relative">
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
  )
}

export default Gallery
