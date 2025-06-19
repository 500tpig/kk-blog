interface ProgressBarProps {
  value: number // 0~100
  color: string // 主色
  bgColor: string // 背景色
  height?: number | string // 可选，默认 8px
  className?: string
}

export default function ProgressBar({
  value,
  color,
  bgColor,
  height = 7,
  className = ''
}: ProgressBarProps) {
  return (
    <div
      className={`w-full rounded-full ${className}`}
      style={{
        background: bgColor,
        height
      }}
    >
      <div
        className="rounded-full transition-all duration-500"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: color,
          height: '100%'
        }}
      />
    </div>
  )
}
