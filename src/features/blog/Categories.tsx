import { tagsColors } from '@/utils/tagsColors'

import TagItem from './TagItem'

interface CategoriesProps {
  tags: string[]
}

export default function Categories({ tags }: CategoriesProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
      {tags.map(tag => {
        const tagColor = tagsColors[tag as keyof typeof tagsColors] || 'var(--accent-color)'
        return <TagItem key={tag} tag={tag} tagColor={tagColor} />
      })}
    </div>
  )
}
