import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

import MDXComponents from '@/components/MDXComponents'

// rehype-pretty-code 配置
const options = {
  // 使用一个现代化的主题
  theme: 'one-dark-pro',
  // 添加行号
  lineNumbers: true,
  // 格式化选项
  grid: true,
  filterMetaString: (string: string) => string
}

export default function RenderMDX({ content }: { content: string }) {
  return (
    <article className="mdx-content">
      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, options]]
          }
        }}
      />
    </article>
  )
}
