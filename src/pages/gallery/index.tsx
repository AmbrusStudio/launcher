import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import logo from '../../assets/images/logo.png'
import FilterChecked from '../../components/Icon/FilterChecked'
import FilterClose from '../../components/Icon/FilterClose'
import FilterOpen from '../../components/Icon/FilterOpen'
import Opensea from '../../components/Icon/Opensea'
import { PageLayout } from '../../components/Layout'
import { GALLERYS, GALLERYS_FILTERS } from '../../data'
import { GALLERY_FILTER, GALLERY_FILTER_LIST } from '../../types/gallery'

type FilterList = GALLERY_FILTER_LIST & {
  is_checked: boolean
}

type Filter = GALLERY_FILTER & {
  status: boolean
  list: FilterList[]
}

function Gallery() {
  // Filter
  const [filter, setFilter] = useState<Filter[]>([])

  // Toggle Filter children tab
  const toggleFilterTab = useCallback(
    (index: number) => {
      if (!filter[index].list.length) {
        return
      }
      const list = cloneDeep(filter)
      list[index].status = !list[index].status
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

  // initialization filter status
  useEffect(() => {
    const filterList: Filter[] = GALLERYS_FILTERS.map((i) => ({
      ...i,
      status: false,
      list: i.list.map((j) => ({
        ...j,
        is_checked: false,
      })),
    }))
    setFilter(filterList)
  }, [])

  return (
    <PageLayout>
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

      <div className="flex justify-between mt-[48px]">
        <div className="w-[300px]">
          <div className="w-[300px] h-[92px]  bg-black/20 flex items-center">
            <span className="text-4xl font-bold text-left uppercase text-white">#</span>
            {/* <p className="opacity-20 text-4xl font-bold text-left uppercase text-white">ID</p> */}
            <input placeholder="ID" className="bg-transparent outline-none" />
          </div>
          <div className="w-[300px] h-[60px]">
            <div className="border-y-2 border-rust p-y-4 text-xl font-bold text-left uppercase text-white">Filters</div>
          </div>
          <ul>
            {filter.map((item, index) => (
              <li key={index}>
                <div
                  className={`h-[50px] border-b-1 border-[#465358] flex items-center justify-between${
                    item.list.length && ' ' + 'cursor-pointer'
                  }`}
                  onClick={() => toggleFilterTab(index)}
                >
                  <p className="text-sm text-left uppercase text-white">{item.label}</p>
                  {!!item.list.length && (
                    <>
                      {item.status ? (
                        <FilterClose
                          sx={{
                            fontSize: '12px',
                            lineHeight: '14px',
                          }}
                        />
                      ) : (
                        <FilterOpen
                          sx={{
                            fontSize: '12px',
                            lineHeight: '14px',
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
                {item.status && (
                  <ul>
                    {item.list.map((tab: FilterList, indexJ) => (
                      <li
                        key={indexJ}
                        className="w-[300px] h-[42px] border-b-1 border-[#2A2A2A] bg-black flex items-center justify-between p-3 cursor-pointer"
                        onClick={() => ToggleFilterTagChecked(index, indexJ)}
                      >
                        <span>
                          <span className="text-sm text-white">{tab.label}</span>
                          <span className="text-sm text-white/50">({tab.count})</span>
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
              <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
            </div>
            <p className="text-sm font-medium leading-4.25 text-white">7,777 items</p>
          </div>
          <div>
            <div className="flex items-center	justify-between">
              <div className="w-[120px] h-8 rounded-2xl bg-white/10 flex items-center justify-center">
                <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
              </div>
              <p className="text-sm font-medium leading-4.25 text-white">7,777 items</p>
            </div>
            <div className="w-[928px] grid grid-cols-4 gap-3 mt-6">
              {GALLERYS.map((gallery, index) => (
                <div key={index} className="w-[223px] h-[223px] rounded overflow-hidden relative">
                  <img src={gallery.image} className="w-[100%] h-[100%] object-cover" />
                  <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
                    #{gallery.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Gallery
