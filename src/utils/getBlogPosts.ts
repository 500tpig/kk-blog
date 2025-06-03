import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'
import matter from 'gray-matter'

import { ArticlePost, PostsByMonth } from '../../typings'

export async function getBlogPosts(): Promise<{
  posts: ArticlePost[]
  postsByMonth: PostsByMonth
}> {
  const postsDirectory = path.join(process.cwd(), 'posts')
  let filenames = await fs.promises.readdir(postsDirectory)
  filenames = filenames.reverse()

  const posts = await Promise.all(
    filenames.map(async filename => {
      // 读取文件
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.promises.readFile(fullPath, 'utf8')

      // 解析内容
      const { data, content } = matter(fileContents)
      // 记录月份
      //   const month = dayjs(data.date).format('YYYY-MM-DD').slice(0, 7)

      return {
        id: filename,
        slug: filename.replace(/\.(mdx|md)$/, ''),  // 移除 .mdx 或 .md 扩展名
        metadata: data,
        content
      }
    })
  )

  // 按月分组，得到时间线的数据
  const postsByMonth: PostsByMonth = posts.reduce((acc: PostsByMonth, post: ArticlePost) => {
    const month = dayjs(post.metadata.date).format('YYYY-MM-DD').slice(0, 7)
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(post)
    return acc
  }, {})

  return {
    posts,
    postsByMonth
  }
}
