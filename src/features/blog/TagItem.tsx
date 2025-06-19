import Link from 'next/link'

export default function TagItem({
  tag,
  tagColor,
  className = ''
}: {
  tag: string
  tagColor: string
  className?: string
}) {
  return (
    <Link href={`/search?q=${tag}`}>
      <div
        className={`flex items-center gap-0.5 relative group cursor-pointer transform transition-transform hover:scale-105 ${className}`}
        style={{ '--tag-color': tagColor } as React.CSSProperties}
      >
        <span className="text-sm font-medium text-[var(--tag-color)]">#</span>
        <span className="text-sm font-medium transition-all duration-300 group-hover:text-[var(--tag-color)]">
          {tag}
        </span>
        <div className="absolute -bottom-2 left-0 w-full h-px transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-bottom-[2px] bg-[var(--tag-color)]"></div>
      </div>
    </Link>
  )
}
