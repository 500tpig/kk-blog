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
    <>
      <div className="prose dark:prose-invert w-full flex flex-col items-start px-4 lg:px-0">
        <div className="w-content-width mx-auto max-w-full">
          <PostHeader metadata={metadata} />
          <div
            id="blog-content-area"
            className="flex flex-col lg:flex-row gap-7 w-full items-start"
          >
            <PostContent content={content} headings={headings} overview={metadata.overview} />
            <PostSidebar
              recentPostsSlot={<RecentPostsData />}
              categoriesSlot={<CategoriesData />}
            />
          </div>
        </div>
      </div>

      <ScrollToTopButton triggerElementId="blog-content-area" />
    </>
  )
}
