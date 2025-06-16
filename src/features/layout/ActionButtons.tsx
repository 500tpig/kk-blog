'use client'

import ThemeToggle from '@/components/ThemeToggle'

import OffcanvasTrigger from './OffcanvasTrigger'

import { SearchModal } from '@/features/search'

export function ActionButtons() {
  return (
    <div className="flex items-center gap-4 h-8">
      <SearchModal />
      <ThemeToggle />
      <div className="lg:hidden">
        <OffcanvasTrigger />
      </div>
    </div>
  )
}
