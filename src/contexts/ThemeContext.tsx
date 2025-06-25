'use client'

import { createContext, useContext } from 'react'

import { useTheme as useNextTheme } from 'next-themes'

type ThemeType = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleTheme: () => void
  mounted: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const currentTheme = (resolvedTheme as ThemeType) || 'light'

  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
  }

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: currentTheme, 
        setTheme: handleSetTheme, 
        toggleTheme: handleToggleTheme,
        mounted: true
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
