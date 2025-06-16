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
    // console.log('Fetching and processing all blog posts...') // 可以加这行来验证函数是否被重复执行
    const postsDirectory = path.join(process.cwd(), 'posts')
    let filenames = await fs.promises.readdir(postsDirectory)
    filenames = filenames.reverse()

    const posts = await Promise.all(
      filenames.map(async filename => {
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = await fs.promises.readFile(fullPath, 'utf8')

        const { data, content } = matter(fileContents)
        const wordCount = content.split(/\s+/g).length
        const wordsPerMinute = 200
        const readingTime = Math.ceil(wordCount / wordsPerMinute)

        // 确保返回的数据结构符合 ArticlePost 类型
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
)
