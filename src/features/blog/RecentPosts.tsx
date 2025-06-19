import dayjs from 'dayjs'
import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from './TagItem'

interface RecentPostsProps {
  posts: ArticlePost[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {posts.map(post => {
          const tags = post.metadata.tags.split(',').map(t => t.trim())
          const tagColor = tagsColors[tags[0] as keyof typeof tagsColors] || 'var(--accent-color)'
          return (
            <li key={post.slug} className="flex gap-4 items-start">
              <div
                className="rounded-lg flex-shrink-0 text-center px-3 py-2 sm:px-4 sm:py-2.5"
                style={{ backgroundColor: `${tagColor}` }}
              >
                <div className="font-semibold text-white text-base sm:text-lg">
                  {post.metadata.date.split('-')[2]}
                </div>
                <div className="font-semibold text-white text-xs sm:text-sm">
                  {dayjs(post.metadata.date).format('MMM')}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="block text-sm sm:text-base font-semibold mb-2 hover:text-accent transition-colors"
                >
                  <span className="line-clamp-2">{post.metadata.title}</span>
                </Link>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => {
                    const color = tagsColors[tag as keyof typeof tagsColors]
                    return <TagItem key={tag} tag={tag} tagColor={color} />
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
