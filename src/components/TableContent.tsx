'use client'

import { MouseEvent, useState } from 'react'

import DownOutlined from './icons/DownOutlined' // 确保路径正确

// 定义标题对象的类型接口
export interface Heading {
  level: number
  text: string
  id: string
}

interface TableContentProps {
  headings: Heading[]
}

export default function TableContent({ headings }: TableContentProps) {
  const [isOpen, setIsOpen] = useState(true) // 状态来控制目录的展开和折叠

  // 如果没有标题，则不渲染组件
  if (headings.length === 0) {
    return null
  }

  // 点击链接时的平滑滚动处理函数
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // 预留 100px 的顶部空间
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div
      className="mt-3.5 mb-7.5 dark:bg-body-bg bg-card-bg rounded-xl w-full overflow-hidden"
      style={{
        boxShadow: '0 2px 4px #0e0e131f'
      }}
    >
      <div
        className="flex items-center justify-between bg-accent p-4 py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // 点击标题栏可以切换展开/折叠状态
      >
        <div className="text-white text-lg font-semibold">目录</div>
        <DownOutlined
          className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? '' : '-rotate-90'}`}
        />
      </div>

      {/* 根据 isOpen 状态来决定是否渲染目录内容 */}
      {isOpen && (
        <div className="p-5">
          <ul className="space-y-2">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={e => handleLinkClick(e, id)}
                  className={`
                    text-body-color hover:text-accent transition-colors block
                    ${level === 3 ? 'pl-4' : ''}
                    ${level === 2 ? 'font-semibold' : ''}
                  `}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
