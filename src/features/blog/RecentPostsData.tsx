import { getBlogPosts } from '@/utils/getBlogPosts'

import RecentPosts from './RecentPosts'

export default async function RecentPostsData() {
  const { posts } = await getBlogPosts()
  // 直接截取前4篇最新的文章即可
  const recentPosts = posts.slice(0, 4)
  return <RecentPosts posts={recentPosts} />
}
