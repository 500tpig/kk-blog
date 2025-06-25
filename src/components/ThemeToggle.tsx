'use client'

import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon, Switch } from '@/components'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 客户端挂载后才渲染，防止水合不一致
  useEffect(() => {
    setMounted(true)
  }, [])

  // 在挂载前不渲染任何内容，避免 SSR 和客户端不一致
  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse" />
    )
  }

  const handleToggle = () => {
    toggleTheme()
  }

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={handleToggle}
      leftIcon={<SunIcon className="text-yellow-500" />}
      rightIcon={<MoonIcon className="text-slate-700" />}
    />
  )
}
