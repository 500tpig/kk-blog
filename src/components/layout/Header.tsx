import Link from 'next/link'

import Search from '@/components/icons/Search'
import ThemeToggle from '@/components/ThemeToggle'

import Icon from '../icons/Icon'

export default function Header() {
  return (
    <header
      className="w-full h-19 transition-colors flex items-center justify-center bg-headings-color"
      style={{
        boxShadow: '0 2px 20px 0 rgba(14,14,19,0.051)'
      }}
    >
      <div className="container mx-auto flex justify-between">
        {/* 左侧 Logo */}
        <Link href="/">
          <Icon className="h-12" />
        </Link>
        <div className="flex-1 flex items-center">
          <ul className="gap-1 text-base text-headings-color-light flex h-8 flex-1 justify-end mr-5">
            <li className="menu-item relative h-full flex items-center">
              <Link href="/" className="hover:text-primary-500 transition px-3 relative z-10">
                首页
              </Link>
            </li>
            <li className="menu-item relative h-full flex items-center">
              <Link href="#" className="hover:text-primary-500 transition px-3 relative z-10">
                分类
              </Link>
            </li>
            <li className="menu-item relative h-full flex items-center">
              <Link href="#" className="hover:text-primary-500 transition px-3 relative z-10">
                关于
              </Link>
            </li>
          </ul>
          {/* 右侧功能区 */}
          <div className="flex items-center gap-4 h-8">
            <Search className="w-6" />
            <ThemeToggle />
            <button className="block lg:hidden p-2">
              <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
