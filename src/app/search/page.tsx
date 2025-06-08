// src/app/search/page.tsx
import { Suspense } from 'react'

import { Metadata } from 'next'

import SearchResults from '@/components/SearchResults'

interface SearchPageProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ''
  return {
    title: `搜索: ${query} - 博客`,
    description: `搜索"${query}"的结果`
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="flex gap-x-12.5 items-start w-content-width py-[50px] relative mx-auto">
      <div className="p-[10px] flex flex-col gap-y-5 flex-1">
        <h1 className="text-3xl font-semibold mb-6">{`搜索结果: "{query}"`}</h1>

        <Suspense fallback={<div className="text-center py-10">正在加载搜索结果...</div>}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
