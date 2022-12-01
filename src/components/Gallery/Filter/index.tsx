import classNames from 'classnames'
import numbro from 'numbro'
import { FC } from 'react'

import { Filter, FilterList } from '../../../types/gallery'
import FilterChecked from '../../Icon/FilterChecked'
import FilterClose from '../../Icon/FilterClose'
import FilterOpen from '../../Icon/FilterOpen'

interface GalleryFilterProps {
  readonly filter: Filter[]
  toggleFilterTab: (index: number) => void
  toggleFilterTagChecked: (parentIndex: number, childrenIndex: number) => void
}

const GalleryFilter: FC<GalleryFilterProps> = ({ filter, toggleFilterTab, toggleFilterTagChecked }) => {
  return (
    <ul className={classNames('select-none overflow-auto max-height-category filter-category-scrollbar')}>
      {filter.map((item, index) => (
        <li key={index}>
          <div
            className={classNames('border-b-1 border-[#465358] py-4 flex items-center justify-between', {
              'cursor-pointer': !!item.list.length,
            })}
            onClick={() => toggleFilterTab(index)}
          >
            <span className="text-sm leading-[17px] uppercase text-white">{item.label}</span>
            {!!item.list.length && (
              <>
                {item.isOpen ? (
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
          {item.isOpen && (
            <ul className="max-h-[252px] overflow-auto filter-category-scrollbar">
              {item.list.map((tab: FilterList, indexJ) => (
                <li
                  key={indexJ}
                  className="border-b-1 border-[#2A2A2A] bg-black flex items-center justify-between p-3 cursor-pointer"
                  onClick={() => {
                    toggleFilterTagChecked(index, indexJ)
                  }}
                >
                  <span className="text-sm leading-[17px]">
                    <span className="text-white">{tab.label}</span>
                    <span className="text-white/50 m-l-1">
                      ({numbro(tab.count).format({ thousandSeparated: true })})
                    </span>
                  </span>
                  {tab.isChecked && (
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
  )
}

export default GalleryFilter
