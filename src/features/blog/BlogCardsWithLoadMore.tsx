'use client'

import { useState } from 'react'

import Loading from '@/components/ui/Loading'

import { BlogCardItem } from '@/features/blog'

interface BlogCardsWithLoadMoreProps {
  posts: ArticlePost[]
  initialCount?: number
}

export default function BlogCardsWithLoadMore({
  posts,
  initialCount = 3
}: BlogCardsWithLoadMoreProps) {
  const [displayCount, setDisplayCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const displayedPosts = posts.slice(0, displayCount)
  const hasMore = displayCount < posts.length

  const handleLoadMore = async () => {
    setIsLoading(true)

    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    setDisplayCount(prev => Math.min(prev + 3, posts.length))
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-10">
      {displayedPosts.map(post => (
        <BlogCardItem key={post.slug} post={post} />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-8">
          {isLoading ? (
            <Loading className="w-4 h-4 " />
          ) : (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium cursor-pointer"
            >
              加载更多
            </button>
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-body-color">
          <p>已显示全部文章</p>
        </div>
      )}
    </div>
  )
}
