import { Dispatch, FC, SetStateAction } from 'react'

import Search from '../Search'
import SearchActionButton from '../SearchActionButton'

interface SearchActionProps {
  readonly searchId: string
  readonly isFilter: boolean
  setSearchId: (value: string) => void
  clearFilter: () => void
  setVisibleDrawer: Dispatch<SetStateAction<boolean>>
}

const SearchAction: FC<SearchActionProps> = ({ searchId, isFilter, setSearchId, clearFilter, setVisibleDrawer }) => {
  return (
    <div className={'flex lg:hidden sticky top-[68px]  mb-3 z-1 bg-[#252525]'}>
      <SearchActionButton isFilter={isFilter} clearFilter={clearFilter} showFilter={() => setVisibleDrawer(true)} />
      <Search searchId={searchId} setSearchId={setSearchId} />
    </div>
  )
}

export default SearchAction
