import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

const tagsColors = {
  JavaScript: 'var(--color-tag-javascript)',
  React: 'var(--color-tag-react)',
  Next: 'var(--color-tag-next)',
  Vue: 'var(--color-tag-vue)',

  // --- 工具与生态 ---
  Tailwind: 'var(--color-tag-tailwind)',
  Electron: 'var(--color-tag-electron)',
  Echarts: 'var(--color-tag-echarts)',
  D3: 'var(--color-tag-d3)', // 将 D3.js 简化为 D3，如果需要可以改回

  // --- 基础 ---
  HTML: 'var(--color-tag-html)',
  CSS: 'var(--color-tag-css)'
}

const postsDirectory = path.join(process.cwd(), 'posts')
const outputDirectory = path.join(process.cwd(), 'public')
const outputPath = path.join(outputDirectory, 'search-index.json')

async function generateIndex() {
  // console.log('🚀 Starting search index generation...')

  try {
    const filenames = await fs.readdir(postsDirectory)
    const posts = await Promise.all(
      filenames
        .filter(filename => /\.(md|mdx)$/.test(filename))
        .map(async filename => {
          const filePath = path.join(postsDirectory, filename)
          const fileContents = await fs.readFile(filePath, 'utf8')
          const { data, content } = matter(fileContents)

          const tagsArray = data.tags.split(',').map(t => t.trim())
          const primaryTag = tagsArray[0]

          const wordCount = content.split(/\s+/g).length
          const wordsPerMinute = 200
          const readingTime = Math.ceil(wordCount / wordsPerMinute)

          return {
            id: filename,
            slug: filename.replace(/\.(md|mdx)$/, ''),
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
        })
    )

    await fs.mkdir(outputDirectory, { recursive: true })
    await fs.writeFile(outputPath, JSON.stringify(posts, null, 2))

    // console.log(`✅ Search index generated successfully with ${posts.length} posts.`)
  } catch (error) {
    console.error('❌ Error generating search index:', error)
  }
}

generateIndex()
