'use client'

import Link from 'next/link'

import GithubIcon from '@/components/icons/GithubIcon'
import Icon from '@/components/icons/Icon'
import QQIcon from '@/components/icons/QQIcon'
import WeChatIcon from '@/components/icons/WeChatIcon'

import { ActionButtons } from './ActionButtons'

import { useScroll } from '@/contexts/ScrollContext'

export default function StickyHeader() {
  const { isScrolled } = useScroll()

  const socialLinks = [
    { href: 'https://github.com/your-profile', icon: <GithubIcon className="w-5" /> },
    { href: '#', icon: <QQIcon className="w-5" /> },
    { href: '#', icon: <WeChatIcon className="w-5" /> }
  ]

  return (
    <header
      className={`w-full h-19 transition-all duration-600 dark:bg-[#272C31] bg-white fixed left-0 z-50 flex items-center justify-center ${
        isScrolled ? 'top-0' : 'top-[-200px]'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center w-content-width">
        <div className="flex justify-center items-center gap-2.5">
          {socialLinks.map((item, index) => (
            <div
              key={index}
              className="p-2 dark:border-soft-white cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              {item.icon}
            </div>
          ))}
        </div>
        {/* 左侧 Logo */}
        <Link href="/">
          <Icon className="h-12" />
        </Link>
        <ActionButtons />
      </div>
    </header>
  )
}
