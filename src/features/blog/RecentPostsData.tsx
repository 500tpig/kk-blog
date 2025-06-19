import { getBlogPosts } from '@/utils/getBlogPosts'

import RecentPosts from './RecentPosts'

// 使用 Segment Config 设置缓存
export const dynamic = 'force-static'
export const revalidate = 3600 // 1小时重新验证一次

export default async function RecentPostsData() {
  const { posts } = await getBlogPosts()
  // 直接截取前4篇最新的文章即可
  const recentPosts = posts.slice(0, 4)
  
  return <RecentPosts posts={recentPosts} />
}
