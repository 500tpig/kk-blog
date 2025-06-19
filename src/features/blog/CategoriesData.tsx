import { tagsColors } from '@/utils/tagsColors'

import Categories from './Categories'

// 使用 Segment Config 设置缓存
export const dynamic = 'force-static'
export const revalidate = 3600 // 1小时重新验证一次

export default async function CategoriesData() {
  const uniqueTags = Object.keys(tagsColors)
  return <Categories tags={uniqueTags} />
}
