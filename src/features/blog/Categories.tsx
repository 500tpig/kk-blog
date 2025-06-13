import Link from 'next/link'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from './TagItem'

interface CategoriesProps {
  posts: ArticlePost[]
}

export function Categories({ posts }: CategoriesProps) {
  const allTags = posts.flatMap(post => post.metadata.tags.split(',').map(t => t.trim()))
  const uniqueTags = [...new Set(allTags)]

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {uniqueTags.map(tag => {
        const tagColor = tagsColors[tag as keyof typeof tagsColors] || 'var(--accent-color)'
        return (
          <Link key={tag} href={`/tags/${tag}`}>
            <TagItem key={tag} tag={tag} tagColor={tagColor} />
          </Link>
        )
      })}
    </div>
  )
}
