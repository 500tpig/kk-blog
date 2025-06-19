import { cache } from 'react'

import { getBlogPosts } from './getBlogPosts'

export const getBlogPost = cache(async (slug: string) => {
  const { posts } = await getBlogPosts()
  return posts.find(p => p.slug === slug)
}) 