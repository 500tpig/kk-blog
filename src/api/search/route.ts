import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ posts: [] })
  }

  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const searchResults = await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      // 获取标签数组
      const tags = data.tags ? data.tags.split(',').map((t: string) => t.trim().toLowerCase()) : []

      // 检查标题、内容和标签是否包含搜索词
      const titleMatch = data.title.toLowerCase().includes(query)
      const contentMatch = content.toLowerCase().includes(query)
      const tagsMatch = tags.some((tag: string) => tag.includes(query))
      const overviewMatch = data.overview ? data.overview.toLowerCase().includes(query) : false

      // 如果任何一个匹配，返回文章信息
      if (titleMatch || contentMatch || tagsMatch || overviewMatch) {
        return {
          slug: filename.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          overview: data.overview,
          tags: tags,
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

  return NextResponse.json({ posts: filteredResults })
}
