import Link from 'next/link';

import { tagsColors } from '@/utils/tagsColors';

import TagItem from './TagItem';

interface CategoriesProps {
  tags: string[];
}

export default function Categories({ tags }: CategoriesProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {tags.map(tag => {
        const tagColor = tagsColors[tag as keyof typeof tagsColors] || 'var(--accent-color)';
        return (
          <Link 
            key={tag} 
            href={`/search?q=${tag}`}
            className="transform transition-transform hover:scale-105"
          >
            <TagItem tag={tag} tagColor={tagColor} />
          </Link>
        );
      })}
    </div>
  );
}