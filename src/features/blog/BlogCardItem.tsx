import Image from 'next/image'
import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import { ClockIcon } from '@/components'
import { TagItem } from '@/features/blog'

// 获取 tagsColors 的所有键作为有效标签类型
type ValidTag = keyof typeof tagsColors

// 检查标签是否有效
function isValidTag(tag: string): tag is ValidTag {
  return tag in tagsColors
}

export default function BlogCardItem({ post }: { post: ArticlePost }) {
  // 获取第一个标签的颜色作为边框颜色
  const firstTag = post.metadata.tags.split(',')[0].trim()
  const borderColor = isValidTag(firstTag) ? tagsColors[firstTag] : '#ff5671'

  return (
    <article
      key={post.slug}
      style={{
        borderLeftWidth: '5px',
        borderLeftColor: borderColor,
        boxShadow: '0 2px 20px rgba(14, 14, 19, 0.05)'
      }}
      className="w-full flex flex-col justify-between p-5 transition rounded-xl bg-card-bg"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="flex-1">
          <Link href={`/blog/${post.slug}`} className="block pb-3 group">
            <h3 className="text-2xl font-bold text-headings-color group-hover:text-accent-color transition-colors">
              <span className="heading-title">{post.title}</span>
            </h3>
          </Link>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center">
              <Image
                src="/avatar.jpg"
                alt="Author avatar"
                width={40}
                height={40}
                className="rounded-full mr-2.5 w-10 h-10 object-cover border-2 border-white shadow-sm"
              />
              <div className="text-sm text-body-color">
                <span className="mr-1.5">By</span>
                <span className="font-medium">kk</span>
              </div>
            </div>
            <div className="text-sm text-body-color">
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <p className="mt-2 text-body-color line-clamp-3 leading-relaxed">
            {post.metadata.overview}
          </p>
        </div>
        <div className="w-full md:w-36 flex-shrink-0">
          {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-36" /> */}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-dashed border-divider flex justify-between">
        <div className="flex flex-wrap gap-2">
          {post.metadata.tags.split(',').map((tag: string) => {
            const trimmedTag = tag.trim()
            const tagColor = isValidTag(trimmedTag) ? tagsColors[trimmedTag] : '#ff5671'
            return <TagItem key={tag} tag={trimmedTag} tagColor={tagColor} />
          })}
        </div>
        {post.metadata.readingTime && (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <ClockIcon />
            <div>{post.metadata.readingTime} Min Read</div>
          </div>
        )}
      </div>
    </article>
  )
}
