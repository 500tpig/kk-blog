import React from 'react'

export default function CrossLine({ onClick, text, className }: { onClick: () => void, text?: string, className?: string }) {
  return (
    <div
      className={`cross-line-wrapper ${className}`}
      onClick={onClick}
    >
      <span className="cross-line top-left"></span>
      <span className="cross-line top-right"></span>
      <span className="cross-line bottom-left"></span>
      <span className="cross-line bottom-right"></span>
      {
        text && <span className="close-text">{text}</span>
      }
    </div>
  )
}
