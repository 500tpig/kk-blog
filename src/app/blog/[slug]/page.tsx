import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'

import MDXComponents from '@/components/MDXComponents'

import { getBlogPosts } from '@/utils/getBlogPosts'

export default async function page({ params }: { params: { slug: string } }) {
  const { posts } = await getBlogPosts()
  const { slug } = await params
  const postIndex = posts.findIndex(post => post.id === slug)
  const post = posts[postIndex]
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
