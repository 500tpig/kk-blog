import { Children, ReactNode } from 'react'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 将字符串转换为 URL 友好的 "slug"
 * @param text 输入文本
 * @returns slug 化的字符串
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 从 React 子节点中递归提取纯文本内容
 * @param children React 子节点
 * @returns 纯文本字符串
 */
export const getTextFromChildren = (children: ReactNode): string => {
  let text = ''
  Children.forEach(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += child
    } else if (child && typeof child === 'object' && 'props' in child && child.props) {
      // @ts-expect-error
      text += getTextFromChildren(child.props.children)
    }
  })
  return text
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
