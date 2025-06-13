import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from './TagItem'

interface RecentPostsProps {
  posts: ArticlePost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  // 按日期降序排序并获取最新的5篇文章
  const recentPosts = posts
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 5)

  return (
    <div className="mt-4">
      <ul className="space-y-5">
        {recentPosts.map((post, index) => {
          const tagColor =
            tagsColors[post.metadata.tags as keyof typeof tagsColors] || 'var(--accent-color)'
          return (
            <li key={post.slug} className="flex gap-5 items-center">
              <div
                className="w-12.5 h-12.5 flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${tagColor}` }}
              >
                <span className="text-white">{index + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-body-color hover:text-accent transition-colors duration-300 text-sm hover:underline line-clamp-2 font-semibold"
                >
                  {post.metadata.title}
                </Link>
                <div className="flex items-center gap-2">
                  {post.metadata.tags.split(',').map((tag: string) => {
                    const tagColor = tagsColors[tag as keyof typeof tagsColors]
                    return <TagItem key={tag} tag={tag} tagColor={tagColor} />
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
