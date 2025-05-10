'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type ThemeType = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleTheme: () => void
}>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {}
})

const getInitialTheme = (): ThemeType => {
  // 在服务器端始终返回亮色主题
  if (typeof window === 'undefined') return 'light'

  // 获取本地存储的主题设置
  const savedTheme = localStorage.getItem('theme') as ThemeType
  if (savedTheme) return savedTheme

  // 如果没有保存的主题，使用系统偏好
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light')

  // 在客户端挂载后设置实际的主题
  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // 保存主题偏好到 localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // 处理主题变化
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 自定义 hook 用于轻松访问主题
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
