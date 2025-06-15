'use client'

import { ReactNode } from 'react'

import Image from 'next/image'

import { useScroll } from '@/contexts/ScrollContext'

interface PostSidebarProps {
  recentPostsSlot: ReactNode
  categoriesSlot: ReactNode
}

export function PostSidebar({ recentPostsSlot, categoriesSlot }: PostSidebarProps) {
  const { isScrolled } = useScroll()

  return (
    <aside
      className={`p-2.5 pb-0 w-sidebar-width sticky transition-all duration-500 ease-in-out ${
        isScrolled ? 'top-[86px]' : 'top-[20px]'
      }`}
    >
      <div className="p-7 rounded-xl bg-card-bg" style={{ boxShadow: '0 2px 20px #0e0e130d' }}>
        <div className="flex justify-center w-full">
          <div className="rounded-full w-[7.5rem] h-[7.5rem] overflow-hidden relative border-4 border-[#C6D8FF99]">
            <Image src="/avatar.jpg" alt="avatar" fill className="object-cover" />
          </div>
        </div>
        <div className="text-center mt-2.5">
          <div className="text-base font-semibold">@ KK</div>
          <div className="text-sm text-body-color">
            <span>苦命前端开发</span>
          </div>
        </div>

        <div className="flex items-center mt-7">
          <div className="heading-divider"></div>
          <div className="ml-3 text-base font-semibold">最近博客</div>
        </div>
        {recentPostsSlot}

        <div className="flex items-center mt-7">
          <div className="heading-divider"></div>
          <div className="ml-3 text-base font-semibold">分类</div>
        </div>
        {categoriesSlot}
      </div>
    </aside>
  )
}
