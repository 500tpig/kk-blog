'use client'

import { MouseEvent as ReactMouseEvent } from 'react'

import { MoonIcon, SunIcon, Switch } from '@/components'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={(event: ReactMouseEvent<HTMLDivElement>) => toggleTheme(event)}
      leftIcon={<SunIcon className="text-yellow-500" />}
      rightIcon={<MoonIcon className="text-slate-700 dark:text-slate-300" />}
    />
  )
}
