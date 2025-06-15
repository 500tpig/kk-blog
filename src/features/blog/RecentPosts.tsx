import dayjs from 'dayjs'
import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from './TagItem'

interface RecentPostsProps {
  posts: ArticlePost[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="mt-5">
      <ul className="space-y-5">
        {posts.map(post => {
          const tags = post.metadata.tags.split(',').map(t => t.trim())
          const tagColor = tagsColors[tags[0] as keyof typeof tagsColors] || 'var(--accent-color)'
          return (
            <li key={post.slug} className="flex gap-5 items-center">
              <div
                className="rounded-lg flex-shrink-0 text-center px-4 py-2"
                style={{ backgroundColor: `${tagColor}` }}
              >
                <div className="font-semibold text-white text-lg">
                  {post.metadata.date.split('-')[2]}
                </div>
                <div className="font-semibold text-white text-sm">
                  {dayjs(post.metadata.date).format('MMM')}
                </div>
              </div>
              <div className="h-16 flex flex-col justify-between">
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold">
                  <span className="heading-title">{post.metadata.title}</span>
                </Link>
                <div className="flex items-center gap-2">
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
