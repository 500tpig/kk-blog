import RenderMDX from '@/features/blog/RenderMDX'
import TableOfContents, { Heading } from '@/features/blog/TableOfContents'

interface PostContentProps {
  content: string
  headings: Heading[]
  overview: string
}

export function PostContent({ content, headings, overview }: PostContentProps) {
  return (
    <div className="p-2.5 pb-0 flex-1 min-w-0">
      <div className="p-7 rounded-xl bg-card-bg" style={{ boxShadow: '0 2px 20px #0e0e130d' }}>
        <div className="p-7">
          <div className="mb-6">
            <span className="text-sm">(AI总结)</span>
            <span> {overview}</span>
          </div>
          <TableOfContents headings={headings} />
          <RenderMDX content={content} />
        </div>
      </div>
    </div>
  )
}
