'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DownOutlined from '@/components/icons/DownOutlined'

import { sidebarNav } from '@/config/sidebarNav'

export default function TopicSidebar({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // 默认展开当前文章所在的栏目
    const activeSection = sidebarNav.find(section =>
      section.items.some(item => item.href === pathname)
    )
    return activeSection ? { [activeSection.title]: true } : {}
  })

  const toggleSection = (title: string) => {
    // 实现手风琴效果：只展开一个
    setOpenSections(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [title]: !prev[title]
    }))
  }

  return (
    <nav className="w-full flex flex-col">
      {sidebarNav.map(section => {
        const isOpen = !!openSections[section.title]
        const isSectionActive = section.items.some(item => item.href === pathname)

        return (
          <div key={section.title} className="py-1">
            {/* 可点击的栏目标题 */}
            <div
              className="flex items-center justify-between p-3 rounded-lg cursor-pointer group"
              onClick={() => toggleSection(section.title)}
            >
              <div
                className={`relative text-base font-medium transition-colors duration-300 group-hover:text-accent ${isSectionActive ? 'text-text-accent' : 'text-body-color'}`}
              >
                {section.title}
              </div>
              <DownOutlined
                className={`w-4 h-4 text-body-color transition-transform duration-300 group-hover:text-accent ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {/* 可折叠的动画容器 */}
            <div
              className={`
                grid transition-[grid-template-rows] duration-300 ease-in-out
                ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
              `}
            >
              <div className="overflow-hidden pl-3">
                <ul className="pt-2 pl-6 border-l border-[#ffffff52]">
                  {section.items.map(item => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href} className="h-10 flex items-center">
                        <Link
                          href={item.href}
                          className={`
                            block text-sm transition-colors duration-300 font-medium truncate
                            ${
                              isActive
                                ? 'font-semibold text-accent'
                                : 'text-body-color hover:text-accent'
                            }
                          `}
                          onClick={() => onClose()}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
