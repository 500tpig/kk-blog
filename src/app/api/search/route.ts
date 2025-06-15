import fs from 'fs/promises'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'

// 路径指向构建后 public 目录中的索引文件
const indexPath = path.join(process.cwd(), 'public', 'search-index.json')
let posts: ArticlePost[] = []

// 使用一个简单的内存缓存来避免重复读取JSON文件（在单个函数生命周期内有效）
async function getPosts() {
  if (posts.length === 0) {
    try {
      const data = await fs.readFile(indexPath, 'utf-8')
      posts = JSON.parse(data)
    } catch (error) {
      console.error('Fatal: Could not load search index. Did the prebuild script run?', error)
      return [] // 如果索引不存在，返回空，避免API崩溃
    }
  }
  return posts
}

export async function GET(request: NextRequest) {
  const allPosts = await getPosts()
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ posts: [] })
  }

  // 在内存中进行光速过滤
  const searchResults = allPosts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(query)
    const overviewMatch = post.metadata.overview.toLowerCase().includes(query)
    const tagsMatch = post.metadata.tags
      .split(',')
      .some((tag: string) => tag.toLowerCase().includes(query))
    return titleMatch || overviewMatch || tagsMatch
  })

  return NextResponse.json({ posts: searchResults })
}
