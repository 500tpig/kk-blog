import { tagsColors } from '@/utils/tagsColors'

import Categories from './Categories'

export default async function CategoriesData() {
  const uniqueTags = Object.keys(tagsColors)
  return <Categories tags={uniqueTags} />
}
