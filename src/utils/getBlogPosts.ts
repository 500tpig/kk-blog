import { cache } from 'react'

import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs'
import matter from 'gray-matter'

import { tagsColors } from './tagsColors'

const postsDirectory = path.join(process.cwd(), 'posts')

// 递归函数，用于获取一个目录及其所有子目录下所有文件的路径
async function getAllFilePaths(directory: string): Promise<string[]> {
  const entries = await fs.promises.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(entry => {
      const fullPath = path.join(directory, entry.name)
      // 如果是目录，则递归调用，否则直接返回路径
      return entry.isDirectory() ? getAllFilePaths(fullPath) : fullPath
    })
  )

  // 将嵌套数组展平为一维数组
  return Array.prototype.concat(...files)
}

export const getBlogPosts = cache(
  async (): Promise<{
    posts: ArticlePost[]
    postsByMonth: PostsByMonth
  }> => {
    // 使用新的递归函数获取所有文章的文件路径
    const filePaths = await getAllFilePaths(postsDirectory)

    // 1. 解析所有文章，获取其元数据
    let posts = await Promise.all(
      filePaths
        .filter(filePath => /\.(mdx|md)$/.test(filePath)) // 确保只处理 markdown 文件
        .map(async fullPath => {
          const fileContents = await fs.promises.readFile(fullPath, 'utf8')

          const { data, content } = matter(fileContents)
          const wordCount = content.split(/\s+/g).length
          const wordsPerMinute = 200
          const readingTime = Math.ceil(wordCount / wordsPerMinute)

          // 优先使用 frontmatter 中的 slug，否则根据文件路径自动生成
          let slug: string
          if (data.slug) {
            slug = data.slug
          } else {
            const relativePath = path.relative(postsDirectory, fullPath)
            slug = relativePath.replace(/\\/g, '/').replace(/\.(mdx|md)$/, '')
          }
          return {
            id: slug, // slug 作为唯一 ID
            slug,
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
