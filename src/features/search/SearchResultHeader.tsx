'use client'
import { useRouter } from 'next/navigation'

import { tagsColors } from '@/utils/tagsColors'

import SearchInput from './components/SearchInput'

const isTag = (tag: string) => {
  return Object.keys(tagsColors).findIndex(t => t === tag) !== -1
}

export default function SearchResultHeader({ query }: { query: string }) {
  const router = useRouter()
  const handleSearch = (query: string) => {
    router.push(`/search?q=${query}`)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-base sm:text-lg text-body-color">搜索结果</div>
      <div className="text-2xl sm:text-3xl flex gap-2.5 mt-1">
        {isTag(query) ? (
          <>
            <div className="text-accent">#</div>
            <div>{query}</div>
          </>
        ) : (
          <div>&quot;{query}&quot;</div>
        )}
      </div>
      <div className="w-full max-w-[40.625rem] mt-6 px-4 sm:px-0">
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  )
}
