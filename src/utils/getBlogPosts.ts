import { cache } from 'react'

import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'
import matter from 'gray-matter'

import { tagsColors } from './tagsColors'

export const getBlogPosts = cache(
  async (): Promise<{
    posts: ArticlePost[]
    postsByMonth: PostsByMonth
  }> => {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = await fs.promises.readdir(postsDirectory)

    // 1. 先解析所有文章，获取其元数据
    let posts = await Promise.all(
      filenames.map(async filename => {
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = await fs.promises.readFile(fullPath, 'utf8')

        const { data, content } = matter(fileContents)
        const wordCount = content.split(/\s+/g).length
        const wordsPerMinute = 200
        const readingTime = Math.ceil(wordCount / wordsPerMinute)

        return {
          id: filename,
          slug: filename.replace(/\.(mdx|md)$/, ''),
          title: data.title,
          content,
          color: tagsColors[data.tags.split(',')[0].trim() as keyof typeof tagsColors],
          metadata: {
            title: data.title,
            date: data.date,
            overview: data.overview,
            tags: data.tags,
            readingTime
          }
        }
      })
    )

    posts.sort((a, b) => {
      // 将日期字符串转换为 Date 对象进行比较
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    })

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
)
