import { Suspense } from 'react'

import { notFound } from 'next/navigation'
import Script from 'next/script'

import Loading from '@/components/ui/Loading'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

import { getBlogPost } from '@/utils/getBlogPost'
import { getBlogPosts } from '@/utils/getBlogPosts'

import { CategoriesData, PostContent, PostHeader, PostSidebar } from '@/features/blog'
import { RecentPostsData } from '@/features/blog/server'
import { slugify } from '@/lib/utils'

// 使用 Segment Config 设置缓存
export const dynamic = 'force-static'
export const revalidate = 3600 // 1小时重新验证一次

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) return { title: '文章未找到' }

  return {
    title: `${post.metadata.title} - KK博客`,
    description: post.metadata.overview,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.overview,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: ['KK'],
      tags: post.metadata.tags.split(',')
    }
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const { posts } = await getBlogPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

// 提取侧边栏组件
function Sidebar() {
  return (
    <div className="lg:col-span-4">
      <PostSidebar
        recentPostsSlot={
          <Suspense
            fallback={
              <div className="flex justify-center w-full">
                <Loading />
              </div>
            }
          >
            <RecentPostsData />
          </Suspense>
        }
        categoriesSlot={
          <Suspense
            fallback={
              <div className="flex justify-center w-full">
                <Loading />
              </div>
            }
          >
            <CategoriesData />
          </Suspense>
        }
      />
    </div>
  )
}

/**
 * 从 markdown 内容中提取标题信息
 * @param content markdown 内容
 * @returns 标题数组
 */
function extractHeadings(content: string): TableOfContentsType[] {
  const headingRegex = /^(#{1,3})\s+(.*)/gm
  let match
  const headings: TableOfContentsType[] = []
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    let text = match[2].trim()
    
    // 清理文本：移除 markdown 语法标记
    text = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除加粗标记
      .replace(/\*(.*?)\*/g, '$1')     // 移除斜体标记
      .replace(/`(.*?)`/g, '$1')       // 移除行内代码标记
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 移除链接，保留文本
      .trim()
    
    const id = slugify(text)
    
    if (id) {
      headings.push({ level, text, id })
    }
  }
  
  return headings
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const { content, metadata } = post
  const headings = extractHeadings(content)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': metadata.title,
    'datePublished': metadata.date,
    'author': {
      '@type': 'Person',
      'name': 'KK'
    },
    'description': metadata.overview,
    'keywords': metadata.tags
  }

  return (
    <>
      <main className="min-h-screen bg-body-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <PostHeader metadata={metadata} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              <div id="blog-content-area" className="lg:col-span-8">
                <Suspense
                  fallback={
                    <div className="flex justify-center w-full">
                      <Loading />
                    </div>
                  }
                >
                  <PostContent content={content} headings={headings} overview={metadata.overview} />
                </Suspense>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <ScrollToTopButton triggerElementId="blog-content-area" />
        </div>
      </main>
      <Script
        id={`structured-data-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
