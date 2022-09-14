import { FC } from 'react'

import FilterSliderClose from '../../Icon/FilterSliderClose'
import FilterSliderLine from '../../Icon/FilterSliderLine'

interface Props {
  readonly isFilter: boolean
  clearFilter: () => void
  showFilter: () => void
}

const SearchActionButton: FC<Props> = ({ isFilter, clearFilter, showFilter }) => {
  return (
    <>
      {isFilter ? (
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
          onClick={() => showFilter()}
        >
          <FilterSliderLine
            className="text-black"
            sx={{
              fontSize: '24px',
            }}
          />
        </div>
      )}
    </>
  )
}

export default SearchActionButton
