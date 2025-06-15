// import { getBlogPosts } from '@/utils/getBlogPosts'

import SearchResultHeader from '@/features/search/SearchResultHeader'
type Params = Promise<{
  q?: string
}>

export default async function page({ searchParams }: { searchParams: Params }) {
  const query = (await searchParams)?.q || ''
  // const { posts } = await getBlogPosts()
  // const filteredPosts = posts.filter(post =>
  //   post.metadata.title.toLowerCase().includes(query.toLowerCase())
  // )
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
