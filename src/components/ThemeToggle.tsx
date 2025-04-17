'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className="p-2 rounded border">
      {theme === 'dark' ? '🌙 暗黑' : '☀️ 明亮'}
    </button>
  )
}
