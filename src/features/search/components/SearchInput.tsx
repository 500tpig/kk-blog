'use client'
import { useState } from 'react'

import Search from '@/components/icons/Search'

export default function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="w-full relative">
      <input
        className="w-full py-3.5 pl-5 pr-12 m-0 border border-[#d9dfe7] bg-white text-body-color text-sm dark:bg-[#2a3036] dark:border-[#3f454b] rounded-full box-border focus:border-[#84858a] outline-none transition duration-300"
        placeholder=""
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <button
        className="w-10 h-10 absolute right-1 top-[50%] -translate-y-1/2 py-0 bg-accent flex items-center justify-center rounded-full"
        onClick={handleSearch}
      >
        <Search className="w-6 cursor-pointer text-white" />
      </button>
    </div>
  )
}
