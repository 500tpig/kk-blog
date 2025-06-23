import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

const tagsColors = {
  JavaScript: '#f0db4f',
  React: '#58c4dc',
  Next: '#8256d5',
  Vue: '#41b883',
  浏览器: '#4a90e2',

  Tailwind: '#38b2ac',

  HTML: '#e44d26',
  CSS: '#264de4'
}

const postsDirectory = path.join(process.cwd(), 'posts')
const outputDirectory = path.join(process.cwd(), 'public')
const outputPath = path.join(outputDirectory, 'search-index.json')

// 递归函数，用于获取一个目录及其所有子目录下所有文件的路径
async function getAllFilePaths(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(entry => {
      const fullPath = path.join(directory, entry.name)
      return entry.isDirectory() ? getAllFilePaths(fullPath) : fullPath
    })
  )
  return Array.prototype.concat(...files)
}

async function generateIndex() {
  try {
    const filePaths = await getAllFilePaths(postsDirectory)

    const posts = await Promise.all(
      filePaths
        .filter(filePath => /\.(md|mdx)$/.test(filePath))
        .map(async filePath => {
          try {
            const fileContents = await fs.readFile(filePath, 'utf8')
            const { data, content } = matter(fileContents)

            const tagsArray = data.tags.split(',').map(t => t.trim())
            const primaryTag = tagsArray[0]

            const wordCount = content.split(/\s+/g).length
            const wordsPerMinute = 200
            const readingTime = Math.ceil(wordCount / wordsPerMinute)
            
            let slug
            if (data.slug) {
              slug = data.slug
            } else {
              const relativePath = path.relative(postsDirectory, filePath)
              slug = relativePath.replace(/\\/g, '/').replace(/\.(md|mdx)$/, '')
            }

            return {
              id: slug,
              slug: slug,
              title: data.title,
              color: tagsColors[primaryTag] || 'var(--accent-color)',
              content: '',
              metadata: {
                title: data.title,
                date: data.date,
                overview: data.overview,
                tags: data.tags,
                readingTime: readingTime
              }
            }
          } catch (e) {
            console.error(`❌ 解析文件时出错: ${filePath}`)
            console.error(e)
            // 返回 null，稍后过滤掉
            return null
          }
        })
    )

    // 过滤掉所有解析失败的项目
    const validPosts = posts.filter(post => post !== null)

    await fs.mkdir(outputDirectory, { recursive: true })
    await fs.writeFile(outputPath, JSON.stringify(validPosts, null, 2))

    console.log(`✅ 搜索索引生成完毕，共处理 ${validPosts.length} 篇文章。`)

  } catch (error) {
    console.error('❌ 生成搜索索引时发生严重错误:', error)
    process.exit(1) // 遇到严重错误时，终止进程
  }
}

generateIndex()
