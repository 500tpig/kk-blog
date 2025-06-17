import { notFound } from 'next/navigation'

import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

import { getBlogPosts } from '@/utils/getBlogPosts'

import { CategoriesData } from '@/features/blog/CategoriesData'
import { PostContent } from '@/features/blog/PostContent'
import { PostHeader } from '@/features/blog/PostHeader'
import { PostSidebar } from '@/features/blog/PostSidebar'
import { RecentPostsData } from '@/features/blog/RecentPostsData'
import { Heading } from '@/features/blog/TableOfContents'
import { slugify } from '@/lib/utils'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const { posts } = await getBlogPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const { posts } = await getBlogPosts()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  const { content, metadata } = post
  const headingRegex = /^(#{1,3})\s+(.*)/gm
  let match
  const headings: Heading[] = []
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugify(text)
    headings.push({ level, text, id })
  }

  return (
    <main className="min-h-screen bg-body-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <PostHeader metadata={metadata} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-8">
              <PostContent content={content} headings={headings} overview={metadata.overview} />
            </div>
            <div className="lg:col-span-4">
              <PostSidebar
                recentPostsSlot={<RecentPostsData />}
                categoriesSlot={<CategoriesData />}
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton triggerElementId="blog-content-area" />
    </main>
  )
}
