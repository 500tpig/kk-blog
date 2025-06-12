import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'

import MDXComponents from '@/components/MDXComponents'

export default function RenderMDX({ content }: { content: string }) {
  return (
    <article>
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism]
          }
        }}
      />
    </article>
  )
}
