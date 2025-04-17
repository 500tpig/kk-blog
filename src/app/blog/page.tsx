import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import Link from 'next/link'

export default async function Blog() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)
  const posts = await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data } = matter(fileContent)
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date
      }
    })
  )
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">博客</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug} className="mb-2">
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
