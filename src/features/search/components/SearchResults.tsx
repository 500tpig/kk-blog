// src/components/SearchResults.tsx
import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from '@/features/blog/TagItem'

interface SearchResultsProps {
  query: string
}

export default async function SearchResults({ query }: SearchResultsProps) {
  if (!query) {
    return <div>请输入搜索关键词</div>
  }

  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const searchResults = await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      // 获取标签数组
      const tags = data.tags ? data.tags.split(',').map((t: string) => t.trim()) : []

      // 检查标题、内容和标签是否包含搜索词
      const lowercaseQuery = query.toLowerCase()
      const titleMatch = data.title.toLowerCase().includes(lowercaseQuery)
      const contentMatch = content.toLowerCase().includes(lowercaseQuery)
      const tagsMatch = tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
      const overviewMatch = data.overview
        ? data.overview.toLowerCase().includes(lowercaseQuery)
        : false

      // 如果任何一个匹配，返回文章信息
      if (titleMatch || contentMatch || tagsMatch || overviewMatch) {
        // 获取第一个标签作为主标签
        const primaryTag = tags[0]

        return {
          slug: filename.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          overview: data.overview,
          tags: tags,
          color: tagsColors[primaryTag as keyof typeof tagsColors],
          matchType: {
            title: titleMatch,
            content: contentMatch,
            tags: tagsMatch,
            overview: overviewMatch
          }
        }
      }

      return null
    })
  )

  // 过滤掉不匹配的结果
  const filteredResults = searchResults.filter(Boolean)

  if (filteredResults.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl mb-2">没有找到相关文章</h2>
        <p className="text-gray-600">尝试使用不同的关键词搜索</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="text-gray-600">找到 {filteredResults.length} 篇相关文章</p>

      {filteredResults.map((post: any) => (
        <article
          key={post.slug}
          style={{
            borderLeftWidth: '5px',
            borderLeftColor: post.color,
            boxShadow: '0 2px 20px rgba(14, 14, 19, 0.05)'
          }}
          className="w-full flex flex-col justify-between p-5 transition rounded-xl bg-card-bg"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <div className="flex-1">
              <Link href={`/blog/${post.slug}`} className="block pb-3 group">
                <h3 className="text-2xl font-bold text-headings-color group-hover:text-accent-color transition-colors">
                  {post.matchType.title ? (
                    <span className="heading-title bg-yellow-100">{post.title}</span>
                  ) : (
                    <span className="heading-title">{post.title}</span>
                  )}
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
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <p className="mt-2 text-body-color line-clamp-3 leading-relaxed">
                {post.matchType.overview ? (
                  <span className="bg-yellow-100">{post.overview}</span>
                ) : (
                  post.overview
                )}
              </p>

              {post.matchType.content && (
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">匹配内容</span>
                </p>
              )}
            </div>
            <div className="w-full md:w-36 flex-shrink-0">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-36" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-divider flex flex-wrap gap-2">
            {post.tags.map((tag: string) => {
              const tagColor = tagsColors[tag as keyof typeof tagsColors]
              const isHighlighted =
                post.matchType.tags && tag.toLowerCase().includes(query.toLowerCase())

              return (
                <TagItem
                  key={tag}
                  tag={tag}
                  tagColor={tagColor}
                  className={isHighlighted ? 'ring-2 ring-yellow-300' : ''}
                />
              )
            })}
          </div>
        </article>
      ))}
    </div>
  )
}
