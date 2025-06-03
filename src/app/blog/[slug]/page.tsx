import { notFound } from 'next/navigation' // 导入 notFound
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'

import MDXComponents from '@/components/MDXComponents'

import { getBlogPosts } from '@/utils/getBlogPosts'

// (推荐) 生成静态参数，有助于 SEO 和构建时优化
export async function generateStaticParams() {
  const { posts } = await getBlogPosts()
  return posts.map(post => ({
    slug: post.slug // 使用不带扩展名的 slug
  }))
}
export default async function page({ params }: { params: { slug: string } }) {
  const { posts } = await getBlogPosts()
  const routeSlug = params.slug // 这是从 URL 来的 slug，例如 "my-first-post"

  // 使用新的 slug 字段进行匹配
  const post = posts.find(p => p.slug === routeSlug)
  if (!post) {
    notFound() // 如果文章未找到，则显示 404 页面
  }

  const { content, metadata } = post
  return (
    <article id={`article`}>
      <h1>{metadata.title}</h1>
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism]
          }
        }}
      />
    </article>
  )
}
