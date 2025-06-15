import { getBlogPosts } from '@/utils/getBlogPosts'

import BlogCardItem from '@/features/blog/BlogCardItem'

export default async function BlogCards() {
  const { posts } = await getBlogPosts()

  return (
    <div className="flex flex-col gap-10">
      {posts.map(post => (
        <BlogCardItem key={post.slug} post={post} />
      ))}
    </div>
  )
}
