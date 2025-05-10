'use client'

import { MouseEvent as ReactMouseEvent } from 'react'

import Moon from './icons/Moon'
import Sun from './icons/Sun'
import Switch from './ui/Switch'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

  // 切换动画
  async function toggleDark(event: ReactMouseEvent<HTMLDivElement>) {
    const { clientX: x, clientY: y } = event
    const isDark = theme === 'dark'
    const willDark = !isDark

    if (!enableTransitions()) {
      toggleTheme()
      return
    }

    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]

    const transition = document.startViewTransition(() => {
      toggleTheme()
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: willDark ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: willDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  }

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleDark}
      leftIcon={<Sun className="text-[#ffb300]" />}
      rightIcon={<Moon className="text-[#1f2328]" />}
    />
  )
}
