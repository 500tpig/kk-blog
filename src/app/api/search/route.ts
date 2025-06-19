import fs from 'fs/promises'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'

import { tagsColors } from '@/utils/tagsColors'

// 路径指向构建后 public 目录中的索引文件
const indexPath = path.join(process.cwd(), 'public', 'search-index.json')
let posts: ArticlePost[] = []

// 使用一个简单的内存缓存来避免重复读取JSON文件
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
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type') || 'all' // 新增搜索类型参数

  if (!query) {
    return NextResponse.json({ posts: [] })
  }

  // 检查是否是标签搜索（完全匹配 tagsColors 中的 key）
  const isTagSearch = Object.keys(tagsColors).some(
    tag => tag.toLowerCase() === query.toLowerCase()
  )

  // 根据搜索类型和查询条件过滤文章
  const searchResults = allPosts.filter(post => {
    // 如果是标签搜索或指定了标签类型搜索
    if (isTagSearch || type === 'tag') {
      return post.metadata.tags
        .split(',')
        .some((tag: string) => tag.trim().toLowerCase() === query.toLowerCase())
    }
    
    // 如果指定了标题搜索
    if (type === 'title') {
      return post.title.toLowerCase().includes(query)
    }

    // 如果指定了内容搜索
    if (type === 'content') {
      return post.metadata.overview.toLowerCase().includes(query)
    }

    // 默认搜索（all）- 但排除标签模糊匹配
    return (
      post.title.toLowerCase().includes(query) ||
      post.metadata.overview.toLowerCase().includes(query)
    )
  })

  return NextResponse.json({ posts: searchResults })
}
