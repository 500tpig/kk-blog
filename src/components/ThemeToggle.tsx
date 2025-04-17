'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

  // 切换动画
  async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
    const isDark = theme === 'dark'

    if (!enableTransitions()) {
      toggleTheme()
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
    ]

    await document.startViewTransition(async () => {
      toggleTheme()
    }).ready

    document.documentElement.animate(
      { clipPath: !isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${!isDark ? 'old' : 'new'}(root)`
      }
    )
  }

  return (
    <button onClick={e => toggleDark(e.nativeEvent)} className="p-2 rounded border">
      {theme === 'dark' ? '🌙 暗黑' : '☀️ 明亮'}
    </button>
  )
}
