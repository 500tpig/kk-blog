'use client'

import { ReactNode } from 'react'

import Image from 'next/image'

import { useScroll } from '@/contexts/ScrollContext'

interface PostSidebarProps {
  recentPostsSlot: ReactNode
  categoriesSlot: ReactNode
}

export default function PostSidebar({ recentPostsSlot, categoriesSlot }: PostSidebarProps) {
  const { isScrolled } = useScroll()

  return (
    <aside
      className={`w-full lg:sticky transition-all duration-500 ease-in-out ${
        isScrolled ? 'top-[86px]' : 'top-[20px]'
      }`}
    >
      <div className="bg-card-bg rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* 作者信息 */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#C6D8FF99]">
              <Image 
                src="/avatar.jpg" 
                alt="avatar" 
                fill 
                className="object-cover"
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>
            <div className="text-center mt-4">
              <div className="text-lg font-semibold">@ KK</div>
              <div className="text-sm text-body-color mt-1">
                <span>苦命前端开发</span>
              </div>
            </div>
          </div>

          {/* 最近博客 */}
          <div className="mt-8">
            <div className="flex items-center">
              <div className="heading-divider"></div>
              <div className="ml-3 text-lg font-semibold">最近博客</div>
            </div>
            <div className="mt-4">
              {recentPostsSlot}
            </div>
          </div>

          {/* 分类 */}
          <div className="mt-8">
            <div className="flex items-center">
              <div className="heading-divider"></div>
              <div className="ml-3 text-lg font-semibold">分类</div>
            </div>
            <div className="mt-4">
              {categoriesSlot}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
