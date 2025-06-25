import { Children, ReactNode } from 'react'

/**
 * 将字符串转换为 URL 友好的 "slug"
 * @param text 输入文本
 * @returns slug 化的字符串
 */
export const slugify = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return ''
  }
  
  return text
    .toLowerCase()
    .trim()
    // 移除特殊字符，但保留中文、英文、数字、空格和连字符
    .replace(/[^\u4e00-\u9fa5\w\s-]/g, '')
    // 将多个空格或下划线替换为单个连字符
    .replace(/[\s_-]+/g, '-')
    // 移除开头和结尾的连字符
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
  
  // 清理提取的文本，移除多余的空格
  return text.replace(/\s+/g, ' ').trim()
}