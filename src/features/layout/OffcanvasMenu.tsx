'use client'

import { Fragment } from 'react'

import Icon from '@/components/icons/Icon'
import CrossLine from '@/components/ui/CrossLine'

import TopicSidebar from './TopicSidebar'

// 定义组件的 props 类型
interface OffcanvasMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function OffcanvasMenu({ isOpen, onClose }: OffcanvasMenuProps) {
  return (
    <Fragment>
      {/* 遮罩层 */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-[#18181eb3] backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* 抽屉面板 */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-85 bg-card-bg shadow-xl z-50 px-4 py-12
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* 抽屉头部 */}
        <header className="flex-shrink-0">
          <CrossLine
            onClick={() => {
              onClose()
            }}
            className="absolute top-4 right-4 w-7.5 h-7.5"
          />
          <Icon className="w-50" />
        </header>

        {/* 抽屉主体内容 (可滚动的导航) */}
        <div className="flex-grow overflow-y-auto pt-12.5">
          <TopicSidebar onClose={onClose} />
        </div>
      </aside>
    </Fragment>
  )
}
