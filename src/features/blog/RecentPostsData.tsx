import { getBlogPosts } from '@/utils/getBlogPosts'

import { RecentPosts } from './RecentPosts'

export async function RecentPostsData() {
  const { posts } = await getBlogPosts()

  const recentPosts = posts
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 4)

  return <RecentPosts posts={recentPosts} />
}
