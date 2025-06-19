'use client'
import ThemeToggle from '@/components/ThemeToggle'

import OffcanvasTrigger from './OffcanvasTrigger'

import { SearchModal } from '@/features/search'

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-4 h-8">
      <SearchModal />
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
      <OffcanvasTrigger />
    </div>
  )
}
