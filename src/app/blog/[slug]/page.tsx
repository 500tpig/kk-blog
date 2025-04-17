import ReactMarkdown from 'react-markdown'

import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import rehypeHighlight from 'rehype-highlight'

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)
  const slugs = filenames.map(filename => filename.replace(/\.md$/, ''))
  return slugs.map(slug => ({ slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const filePath = path.join(process.cwd(), 'posts', `${resolvedParams.slug}.md`)
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    return (
      <article className="prose prose-slate dark:prose-invert max-w-none container mx-auto px-4 py-8">
        <h1>{data.title}</h1>
        <p className="text-gray-500">{new Date(data.date).toLocaleDateString()}</p>
        <p className="text-gray-700">作者：{data.author}</p>
        <div className="prose prose-slate dark:prose-invert">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error reading file:', error) // 打印详细错误
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      notFound()
    } else {
      throw error
    }
  }
}
