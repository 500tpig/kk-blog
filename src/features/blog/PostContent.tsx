import RenderMDX from '@/features/blog/RenderMDX'
import TableOfContents, { Heading } from '@/features/blog/TableOfContents'

interface PostContentProps {
  content: string
  headings: Heading[]
  overview: string
}

export function PostContent({ content, headings, overview }: PostContentProps) {
  return (
    <div className="w-full">
      <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="mb-6 text-sm sm:text-base">
            <span className="text-accent font-medium">(AI总结)</span>
            <span className="ml-2 text-body-color"> {overview}</span>
          </div>
          <TableOfContents headings={headings} />
          <div className="prose dark:prose-invert max-w-none mt-8">
            <RenderMDX content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}
