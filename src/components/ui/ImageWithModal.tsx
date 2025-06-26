'use client'

import { useState, useEffect } from 'react'

import { ImageModal } from './ImageModal'

interface ImageWithModalProps {
  src?: string
  alt?: string
  className?: string
  'data-allow-zoom'?: boolean
  [key: string]: any
}

// 反转义Tailwind类中的冒号
function unescapeClassName(className: string): string {
  return className
    .replace(/\\:/g, ':')   // 反转义冒号
    .replace(/\\\//g, '/')  // 反转义斜杠
    .replace(/\\\[/g, '[')  // 反转义左方括号
    .replace(/\\\]/g, ']')  // 反转义右方括号
}

export function ImageWithModal({ 
  src = '', 
  alt = '', 
  className = '',
  'data-allow-zoom': allowZoom = true,
  ...props 
}: ImageWithModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 处理可能被转义的类名
  const unescapedClassName = unescapeClassName(className)

  const handleImageClick = () => {
    if (mounted && allowZoom) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={unescapedClassName}
        onClick={allowZoom ? handleImageClick : undefined}
        title={allowZoom && mounted ? '点击查看大图' : alt}
        {...props}
      />
      
      {/* 模态框 */}
      {mounted && isModalOpen && allowZoom && (
        <ImageModal
          src={src}
          alt={alt}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
} 