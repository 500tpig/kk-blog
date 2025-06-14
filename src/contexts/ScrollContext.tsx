'use client'

import { createContext, useState, useEffect, useContext, ReactNode } from 'react'

// 定义滚动状态的接口
interface ScrollContextType {
  isScrolled: boolean
}

// 在这里统一定义滚动的阈值
const SCROLL_THRESHOLD = 400

// 创建 Context，初始值为 undefined
const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

/**
 * ScrollProvider 组件
 * 职责：监听滚动事件，管理 isScrolled 状态，并通过 Context 提供给所有子组件。
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    // 组件挂载时添加事件监听
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 初始化时执行一次，以应对刷新时页面不在顶部的情况
    handleScroll()

    // 组件卸载时清理监听器，防止内存泄漏
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // 空依赖数组确保此 effect 只运行一次

  return <ScrollContext.Provider value={{ isScrolled }}>{children}</ScrollContext.Provider>
}

/**
 * 自定义 Hook: useScroll
 * 职责：简化 Context 的消费，让其他组件能方便地获取 isScrolled 状态。
 */
export function useScroll() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error('useScroll 必须在 ScrollProvider 内部使用')
  }
  return context
}
