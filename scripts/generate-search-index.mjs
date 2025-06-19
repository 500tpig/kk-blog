import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

const tagsColors = {
  JavaScript: '#f7df1e',
  React: '#61dafb',
  Next: '#8b5cf6',
  Vue: '#41b883',

  // --- 工具与生态 ---
  Tailwind: '#38b2ac',
  Electron: '#47848f',
  Echarts: '#c23531',
  D3: '#f9a03c',

  // --- 基础 ---
  HTML: '#fc490b',
  CSS: '#1572b6'
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
