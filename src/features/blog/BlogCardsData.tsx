import { getBlogPosts } from '@/utils/getBlogPosts'

import BlogCardsWithLoadMore from './BlogCardsWithLoadMore'

export default async function BlogCardsData() {
  const { posts } = await getBlogPosts()
  
  return <BlogCardsWithLoadMore posts={posts} initialCount={10} />
} 