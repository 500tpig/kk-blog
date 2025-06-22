'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

import Cookies from 'js-cookie'

type ThemeType = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleTheme: (event?: React.MouseEvent<HTMLDivElement>) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 这个辅助函数用于从 cookie 中安全地获取初始主题
export const getThemeFromCookie = (): ThemeType => {
  if (typeof window === 'undefined') {
    return 'light' // 服务器端默认值
  }
  const cookieTheme = Cookies.get('theme') as ThemeType
  return cookieTheme && ['light', 'dark'].includes(cookieTheme) ? cookieTheme : 'light'
}

export function ThemeProvider({
  children,
  initialTheme
}: {
  children: React.ReactNode
  initialTheme: ThemeType
}) {
  const [theme, setThemeState] = useState<ThemeType>(initialTheme)

  // 监听 initialTheme 的变化，确保来自服务器的值能够同步到 state
  useEffect(() => {
    setThemeState(initialTheme)
  }, [initialTheme])

  // 设置主题，并将其保存到 cookie
  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme)
    document.documentElement.dataset.theme = newTheme
    Cookies.set('theme', newTheme, { expires: 365, path: '/' })
  }, [])

  // 切换主题，并应用平滑过渡动画
  const toggleTheme = useCallback(
    (event?: React.MouseEvent<HTMLDivElement>) => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    },
    [theme, setTheme]
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 自定义 hook 保持不变
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
