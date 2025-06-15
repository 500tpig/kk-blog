import { CategoriesData } from '@/features/blog/CategoriesData'
import { PostSidebar } from '@/features/blog/PostSidebar'
import { RecentPostsData } from '@/features/blog/RecentPostsData'
import SearchResultHeader from '@/features/search/SearchResultHeader'
import { SearchResultsList } from '@/features/search/SearchResultsList'

type Params = Promise<{
  q?: string
}>

// 定义 API 响应的类型
interface ApiResponse {
  posts: ArticlePost[]
}

// 帮助函数：用于安全地 fetch 数据
async function fetchSearchResults(query: string): Promise<ArticlePost[]> {
  if (!query) {
    return []
  }
  try {
    // 重要：使用绝对 URL 或配置环境变量以在服务器端 fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store' // 确保每次搜索都获取最新结果
    })

    if (!response.ok) {
      console.error('Search API fetch failed:', response.statusText)
      return []
    }

    const data: ApiResponse = await response.json()
    return data.posts
  } catch (error) {
    console.error('An error occurred during search fetch:', error)
    return []
  }
}

export default async function Page({ searchParams }: { searchParams: Params }) {
  const query = (await searchParams)?.q || ''
  const results = await fetchSearchResults(query)
  const resultCount = results.length
  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="w-content-width max-w-full mx-auto">
        <div className="my-15 py-7.5 rounded-xl bg-card-bg">
          <SearchResultHeader query={query} />
          <div className="flex justify-center">
            <div className="mt-6 bg-[#3234400a] dark:bg-soft-white py-1 px-4 font-medium text-sm rounded-full">
              {resultCount} 条结果
            </div>
          </div>
        </div>

        {/* 搜索结果列表 */}
        <div className="mt-10">
          <div className="w-content-width max-w-full mx-auto flex gap-7.5">
            <SearchResultsList results={results} query={query} />
            <PostSidebar recentPostsSlot={<RecentPostsData />} categoriesSlot={<CategoriesData />} />
          </div>
        </div>
      </div>
    </div>
  )
}
