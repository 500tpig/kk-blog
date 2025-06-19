import { BlogCardItem } from '@/features/blog'

interface SearchResultsListProps {
  results: ArticlePost[]
  query: string
}

export default function SearchResultsList({ results, query }: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">未能找到相关内容</h2>
        <p className="text-body-color">
          抱歉，我们没有找到与 “{query}” 相关的文章，请尝试其他关键词。
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 flex-1 p-2.5">
      {results.map(post => (
        <BlogCardItem key={post.slug} post={post} />
      ))}
    </div>
  )
}
