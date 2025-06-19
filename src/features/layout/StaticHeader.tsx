'use client'

import Link from 'next/link'

import Icon from '@/components/icons/Icon'

import ActionButtons from './ActionButtons'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '#', label: '分类' },
  { href: '#', label: '关于' }
]

export default function StaticHeader() {
  return (
    <header
      className="flex h-19 w-full items-center justify-center bg-white dark:bg-card-bg px-4"
      style={{
        boxShadow: '0 2px 20px 0 rgba(14,14,19,.05)'
      }}
    >
      <div className="container mx-auto flex w-content-width items-center justify-between">
        <div className="flex-1 justify-start">
          <Link href="/">
            <Icon className="h-12 w-auto" />
          </Link>
        </div>
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex h-8 items-center justify-center gap-1 text-base">
            {navLinks.map(link => (
              <li key={link.label} className="menu-item relative flex h-full items-center">
                <Link href={link.href} className="transition px-3 relative z-10">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-1 justify-end">
          <ActionButtons />
        </div>
      </div>
    </header>
  )
}
