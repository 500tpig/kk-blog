'use client'

import { useState } from 'react'

import styles from './Header.module.css' // 复用现有的汉堡包图标样式
import OffcanvasMenu from './OffcanvasMenu'

export default function OffcanvasTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      {/* 汉堡包图标触发器 */}
      <div
        className={`${styles['offcanvas-opener-wrapper']} flex items-center h-8 cursor-pointer`}
        onClick={handleOpen}
        aria-label="Open menu"
        role="button"
      >
        <span className={styles['offcanvas-opener']}>
          <span className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </span>
      </div>

      {/* 抽屉菜单实例 */}
      <OffcanvasMenu isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
