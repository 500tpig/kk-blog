import Link from 'next/link'

import Icon from '@/components/icons/Icon'
import ThemeToggle from '@/components/ThemeToggle'

import styles from './Header.module.css'

import { SearchModal } from '@/features/search'

export default function Header() {
  return (
    <header
      className="w-full h-19 transition-colors flex items-center justify-center bg-white dark:bg-card-bg"
      style={{
        boxShadow: '0 2px 20px 0 rgba(14,14,19,0.051)'
      }}
    >
      <div className="container mx-auto flex justify-between w-content-width">
        {/* 左侧 Logo */}
        <Link href="/">
          <Icon className="h-12" />
        </Link>
        <div className="flex-1 flex items-center justify-end gap-5">
          {/* <ul className="gap-1 text-base text-headings-color-light flex h-8 flex-1 justify-end mr-5">
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
          </ul> */}
          {/* 右侧功能区 */}
          <div className="flex items-center gap-4 h-8">
            <SearchModal />
            <ThemeToggle />
            <button className="block lg:hidden p-2">
              <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
            </button>
          </div>

          <div
            className={`${styles['offcanvas-opener-wrapper']} flex items-center h-8 cursor-pointer`}
          >
            <span className={styles['offcanvas-opener']}>
              <span className={styles.hamburger}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
