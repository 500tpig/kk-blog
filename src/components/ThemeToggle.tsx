'use client'

import { MouseEvent as ReactMouseEvent } from 'react'

import Moon from './icons/Moon'
import Sun from './icons/Sun'
import Switch from './ui/Switch'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={(event: ReactMouseEvent<HTMLDivElement>) => toggleTheme(event)}
      leftIcon={<Sun className="text-[#ffb300]" />}
      rightIcon={<Moon className="text-[#1f2328]" />}
    />
  )
}
