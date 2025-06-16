'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

import Lenis from '@studio-freight/lenis'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * @name SmoothScrollProvider
 * @description 提供全局平滑滚动体验的 React 组件。
 * 已经过优化，会尊重用户的系统级“减弱动态效果”设置。
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 检查用户是否偏好“减弱动态效果”
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      // 如果用户开启了此选项，则不初始化 Lenis，使用原生滚动
      return
    }

    // 初始化 Lenis
    const lenis = new Lenis({
      lerp: 0.4, // 缓动因子，值越小滚动感觉越“粘”
      smoothWheel: true
    })
    lenisRef.current = lenis

    // 创建高效的动画循环以更新滚动位置
    const animate = (time: DOMHighResTimeStamp) => {
      lenis.raf(time)
      requestAnimationFrame(animate)
    }
    const rafId = requestAnimationFrame(animate)

    // 组件卸载时销毁 Lenis 实例，防止内存泄漏
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, []) // 空依赖数组确保此 Effect 仅在组件挂载时运行一次

  return <>{children}</>
}
