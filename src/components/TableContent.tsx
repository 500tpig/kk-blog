'use client'

import { MouseEvent, useState, useMemo, ReactNode } from 'react'

import DownOutlined from './icons/DownOutlined'

// 标题对象的类型接口保持不变
export interface Heading {
  level: number
  text: string
  id: string
}

// 为嵌套后的标题增加 children 属性
interface NestedHeading extends Heading {
  children: NestedHeading[]
}

interface TableContentProps {
  headings: Heading[]
}

export default function TableContent({ headings }: TableContentProps) {
  const [isOpen, setIsOpen] = useState(true)

  // 使用 useMemo 来转换数据结构，避免每次渲染都重新计算
  const nestedHeadings = useMemo(() => {
    const stack: NestedHeading[] = []
    const result: NestedHeading[] = []

    headings.forEach(heading => {
      const node: NestedHeading = { ...heading, children: [] }

      // 找到当前标题的父级
      while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        // 如果是顶层标题 (h2)
        result.push(node)
      } else {
        // 如果是子级标题 (h3, h4, ...)，添加到父级的 children 中
        stack[stack.length - 1].children.push(node)
      }

      stack.push(node)
    })

    return result
  }, [headings])

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

  // 递归渲染组件，用于生成嵌套列表
  const renderHeadings = (headings: NestedHeading[], parentNumbering = ''): ReactNode => {
    return (
      <ul className="space-y-2 flex flex-col">
        {headings.map((heading, index) => {
          const currentNumbering = parentNumbering
            ? `${parentNumbering}.${index + 1}`
            : `${index + 1}`

          // 使用正则表达式，去掉 heading.text 开头可能存在的 "1. " 或 "1、 " 等编号
          const cleanedText = heading.text.replace(/^\d+([.、]\s*|\s+)/, '')
          return (
            <li key={heading.id + heading.text} className="flex flex-col">
              <div className="flex">
                <span className="mr-2 font-semibold">{currentNumbering}.</span>
                <a
                  href={`#${heading.id}`}
                  onClick={e => handleLinkClick(e, heading.id)}
                  className="text-body-color hover:text-accent transition-colors block hover:underline"
                >
                  {cleanedText}
                </a>
              </div>
              {/* 如果有子项，则递归渲染 */}
              {heading.children.length > 0 && (
                <div className="pl-4 mt-2 flex flex-col">
                  {renderHeadings(heading.children, currentNumbering)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div
      className="mt-3.5 mb-7.5 dark:bg-body-bg bg-card-bg w-full rounded-b-xl"
      style={{ boxShadow: '0 2px 4px #0e0e131f' }}
    >
      <div
        className="flex items-center justify-between bg-accent p-4 py-3 cursor-pointer rounded-t-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-white text-lg font-semibold">目录</div>
        <DownOutlined
          className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? '' : '-rotate-90'}`}
        />
      </div>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5">{renderHeadings(nestedHeadings)}</div>
        </div>
      </div>
    </div>
  )
}
