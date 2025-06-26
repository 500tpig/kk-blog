'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
}

export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const lastTouchDistanceRef = useRef<number | null>(null)

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  // 处理滚轮缩放（只在图片上生效）
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // 不使用preventDefault，避免被动事件错误
    // 而是直接处理缩放逻辑
    const delta = e.deltaY * -0.003
    setScale(prevScale => Math.min(Math.max(0.5, prevScale + delta), 3))
  }, [])

  // 阻止容器的默认滚轮行为
  useEffect(() => {
    const modalContainer = document.getElementById('image-modal-container')
    
    if (modalContainer) {
      const preventWheelScroll = (e: WheelEvent) => {
        e.preventDefault()
      }
      
      // 使用 { passive: false } 选项
      modalContainer.addEventListener('wheel', preventWheelScroll, { passive: false })
      
      return () => {
        modalContainer.removeEventListener('wheel', preventWheelScroll)
      }
    }
  }, [])

  // 处理拖拽 - 优化性能，使用ref避免重新创建函数
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === imageRef.current) {
      e.preventDefault()
      setIsDragging(true)
      isDraggingRef.current = true
      // 记录拖拽起始点
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    
    e.preventDefault()
    // 计算相对于拖拽起始点的偏移
    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y
    
    // 更新位置，避免累积误差
    setPosition(prevPosition => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY
    }))
    
    // 更新拖拽起始点为当前位置
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    isDraggingRef.current = false
  }, [])

  // 移动端触摸事件处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.target === imageRef.current) {
      // 不调用preventDefault，因为这是一个被动事件
      
      // 单指拖动
      if (e.touches.length === 1) {
        setIsDragging(true)
        isDraggingRef.current = true
        dragStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      } 
      // 双指缩放 - 记录初始距离
      else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const distance = Math.sqrt(dx * dx + dy * dy)
        lastTouchDistanceRef.current = distance
      }
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // 不调用preventDefault，因为这是一个被动事件
    
    // 单指拖动
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - dragStartRef.current.x
      const deltaY = e.touches[0].clientY - dragStartRef.current.y
      
      setPosition(prevPosition => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY
      }))
      
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    } 
    // 双指缩放
    else if (e.touches.length === 2 && lastTouchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // 计算缩放比例变化
      const scaleFactor = 0.01
      const deltaScale = (distance - lastTouchDistanceRef.current) * scaleFactor
      
      setScale(prevScale => Math.min(Math.max(0.5, prevScale + deltaScale), 3))
      
      lastTouchDistanceRef.current = distance
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    isDraggingRef.current = false
    lastTouchDistanceRef.current = null
  }, [])

  // 阻止容器的默认滚动行为
  useEffect(() => {
    // 添加非被动事件监听器来阻止滚动
    const modalContainer = document.getElementById('image-modal-container')
    
    if (modalContainer) {
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault()
      }
      
      // 使用 { passive: false } 选项
      modalContainer.addEventListener('touchmove', preventScroll, { passive: false })
      
      return () => {
        modalContainer.removeEventListener('touchmove', preventScroll)
      }
    }
  }, [])

  const modalContent = (
    <div 
      id="image-modal-container"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        aria-label="关闭图片"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* 缩放控制 */}
      <div className="absolute top-4 left-4 z-[10000] flex flex-col gap-2">
        <button
          onClick={useCallback(() => setScale(prev => Math.min(prev + 0.1, 3)), [])}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="放大"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button
          onClick={useCallback(() => setScale(prev => Math.max(prev - 0.1, 0.5)), [])}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="缩小"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button
          onClick={useCallback(() => {
            setScale(1)
            setPosition({ x: 0, y: 0 })
          }, [])}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors text-xs"
          aria-label="重置"
        >
          1:1
        </button>
      </div>

      {/* 图片容器 */}
      <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="text-white text-center">
            <p className="text-lg mb-2">图片加载失败</p>
            <p className="text-sm opacity-75">请检查图片链接是否正确</p>
            <p className="text-xs opacity-50 mt-2">图片路径: {src}</p>
          </div>
        ) : (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
            className={`w-auto h-auto max-w-full max-h-full object-contain ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              userSelect: 'none',
              pointerEvents: 'auto',
              minWidth: '300px',
              minHeight: '200px',
              touchAction: 'none' // 防止浏览器默认的触摸行为
            }}
            draggable={false}
          />
        )}
      </div>

      {/* 提示文本 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
        <p className="hidden md:block">滚轮缩放 • 拖拽移动 • ESC 或点击背景关闭</p>
        <p className="block md:hidden">双指缩放 • 单指移动 • 点击背景关闭</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
} 