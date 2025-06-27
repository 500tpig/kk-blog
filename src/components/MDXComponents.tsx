import { JSX, ReactNode } from 'react'

import { ImageWithModal } from '@/components/ui/ImageWithModal'

import { slugify, getTextFromChildren } from '@/lib/utils'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className: string
  children: ReactNode
}

const Heading: React.FC<HeadingProps> = ({ level, className, children }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const textContent = getTextFromChildren(children)
  const headingId = slugify(textContent)

  // 确保 ID 存在
  if (!headingId) {
    return <HeadingTag className={className}>{children}</HeadingTag>
  }

  return (
    <HeadingTag id={headingId} className={className}>
      {children}
    </HeadingTag>
  )
}

// 定义图片属性接口
interface ImageProps {
  src?: string
  alt?: string
  className?: string
  [key: string]: any
}

// 为图片解析可能的样式参数
function parseImgProps(props: ImageProps): ImageProps {
  // 如果没有alt属性，直接返回原始props
  if (!props.alt) return props
  
  // 分割alt文本，检查是否包含样式参数
  const parts = props.alt.split('|')
  if (parts.length <= 1) return props // 没有样式参数
  
  // 提取实际描述和样式参数
  const actualAlt = parts[0]
  const styleParams = parts.slice(1)
  
  // 常用样式映射
  const styleMap: Record<string, string> = {
    'full': 'w-full',
    'center': 'mx-auto',
    'shadow-lg': 'shadow-lg',
    'border': 'border border-gray-200 dark:border-gray-700',
    'w-full': 'w-full',
    'lg:w-1/2': 'lg:w-1/2',
    'lg:w-1/3': 'lg:w-1/3',
    'lg:w-2/3': 'lg:w-2/3',
    'lg:w-3/4': 'lg:w-3/4',
    'lg:w-3/5': 'lg:w-3/5',
    'max-w-3xl': 'max-w-3xl',
    'max-w-4xl': 'max-w-4xl',
    'max-w-5xl': 'max-w-5xl',
    'w-64': 'w-64',
    'w-96': 'w-96',
    'w-32': 'w-32'
  }
  
  // 收集样式类
  const classNames: string[] = []
  let allowZoom = true
  
  // 处理样式参数
  styleParams.forEach((param: string) => {
    const trimmed = param.trim()
    const lowerTrimmed = trimmed.toLowerCase()
    
    if (lowerTrimmed === 'no-zoom') {
      allowZoom = false
    } else if (styleMap[trimmed]) {
      // 直接映射已知的样式关键词，保持原始大小写
      classNames.push(styleMap[trimmed])
    } else if (trimmed) {
      // 处理可能包含冒号的Tailwind类
      // 直接添加原始类名，不做任何转义处理
      classNames.push(trimmed)
    }
  })
  
  // 默认添加样式
  if (!classNames.includes('mx-auto')) {
    classNames.push('mx-auto')
  }
  
  // 默认添加圆角
  classNames.push('rounded')
  classNames.push('cursor-pointer')
  
  // 返回处理后的props
  return {
    ...props,
    alt: actualAlt,
    // 这里直接设置所有需要的样式类名
    className: classNames.join(' '),
    'data-allow-zoom': allowZoom
  }
}

interface MDXComponentsProps {
  [key: string]: React.FC<any>
}

const MDXComponents: MDXComponentsProps = {
  h1: props => <Heading level={1} className="text-4xl font-bold mt-6 mb-4" {...props} />,
  h2: props => (
    <Heading
      level={2}
      className="text-3xl font-semibold mt-6 mb-4 border-b-2 border-gray-200 pb-2"
      {...props}
    />
  ),
  h3: props => <Heading level={3} className="text-2xl font-semibold mt-6 mb-4" {...props} />,
  h4: props => <Heading level={4} className="text-xl font-semibold mt-6 mb-4" {...props} />,
  h5: props => <Heading level={5} className="text-lg font-semibold mt-6 mb-4" {...props} />,
  h6: props => <Heading level={6} className="text-base font-semibold mt-6 mb-4" {...props} />,
  hr: props => <hr className="border-t border-gray-600 my-6" {...props} />,
  p: props => <p className="mt-4 mb-4" {...props} />,
  a: props => (
    <a className="link-underline" target="_blank" rel="noopener noreferrer nofollow" {...props} />
  ),
  ul: props => <ul className="list-disc pl-5 mt-0 mb-4" {...props} />,
  ol: props => <ol className="list-decimal pl-5 mt-0 mb-4" {...props} />,
  li: props => <li className="mb-2" {...props} />,
  code: props => <code {...props} />,
  pre: props => {
    if (props['data-language'] === 'mermaid') return <></>
    return <pre className="relative" {...props} />
  },
  blockquote: props => (
    <blockquote
      className="px-4 sm:pl-6 my-4 italic py-3
               rounded-r-lg
               border-l-4
               bg-slate-100 dark:bg-[#363B40]
               border-accent"
      {...props}
    />
  ),
  // 修改img组件，在这里直接处理样式参数
  img: props => {
    const processedProps = parseImgProps(props)
    return <ImageWithModal {...processedProps} />
  },
  strong: props => <strong className="font-bold" {...props} />,
  table: props => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: props => <tr className="border-b border-gray-200 dark:border-gray-700" {...props} />,
  th: props => (
    <th
      className="px-4 py-3 font-semibold text-left text-gray-900 dark:text-gray-100 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: props => (
    <td
      className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  )
}

export default MDXComponents
