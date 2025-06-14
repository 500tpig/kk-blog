import SearchResultHeader from '@/features/search/SearchResultHeader'
interface SearchPageProps {
  searchParams?: {
    q?: string
  }
}

export default async function page({ searchParams }: SearchPageProps) {
  const query = (await searchParams)?.q || ''
  return (
    <div className="prose dark:prose-invert w-full flex flex-col items-start">
      <div className="w-content-width mx-auto">
        <div className="my-15 py-7.5 rounded-xl bg-card-bg ">
          <SearchResultHeader query={query} />
          <div className="flex justify-center">
            <div className="mt-6 bg-[#3234400a] dark:bg-soft-white py-1 px-4 font-medium text-sm rounded-full">
              0 条结果
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
