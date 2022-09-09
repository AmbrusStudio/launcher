import { FC } from 'react'

interface Props {
  readonly searchId: string
  setSearchId: (value: string) => void
}

const Search: FC<Props> = ({ searchId, setSearchId }) => {
  return (
    <div className="flex-1 p-4 lg:p-6 bg-black/20 flex items-center">
      <span className="text-base lg:text-4xl font-bold uppercase text-white leading-5 lg:leading-11">#</span>
      <input
        placeholder="ID"
        className="bg-transparent text-white outline-none ml-2 lg:ml-4 leading-5 lg:leading-11 uppercase font-bold not-italic text-base lg:text-4xl w-[100%]
              placeholder:uppercase placeholder:font-bold placeholder:not-italic placeholder:text-base lg:placeholder:text-4xl placeholder:opacity-20 placeholder:text-white"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
    </div>
  )
}

export default Search
