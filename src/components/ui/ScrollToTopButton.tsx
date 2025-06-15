'use client'

import { useState, useEffect } from 'react'

interface ScrollToTopButtonProps {
  /**
   * 触发显示按钮的页面元素的 ID。
   */
  triggerElementId: string
  /**
   * 触发位置的额外垂直偏移量（像素）。
   * 正数：元素顶部滚过视口顶部 N 像素后触发。
   * 负数：元素顶部距离视口顶部 N 像素时触发。
   * @default 0
   */
  offsetTop?: number
}

export function ScrollToTopButton({ triggerElementId, offsetTop = 0 }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const triggerElement = document.getElementById(triggerElementId)
    if (!triggerElement) {
      console.warn(`[ScrollToTopButton] Trigger element with id "${triggerElementId}" not found.`)
      return
    }

    const handleScroll = () => {
      const triggerPoint = triggerElement.offsetTop + offsetTop
      if (window.scrollY > triggerPoint) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      const totalScrollableHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight

      if (totalScrollableHeight > 0) {
        const progress = (window.scrollY / totalScrollableHeight) * 100
        setScrollProgress(progress)
      } else {
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [triggerElementId, offsetTop])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={`fixed right-5 bottom-1/2 translate-y-1/2 z-50 
        flex items-center justify-center flex-col gap-4 
        transition-opacity duration-300 ease-in-out
        cursor-pointer
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      onClick={scrollToTop}
    >
      <div
        className="text-xs text-body-color transform rotate-180"
        style={{
          writingMode: 'vertical-rl'
        }}
      >
        SCROLL
      </div>
      <div className="w-0.5 h-[60px] bg-[#9090a842] relative">
        <div
          className="absolute top-0 left-0 w-full bg-black dark:bg-white rounded-full"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>
    </div>
  )
}
