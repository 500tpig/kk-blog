import { ReactNode, MouseEvent as ReactMouseEvent } from 'react'

interface SwitchProps {
  checked?: boolean
  onChange?: (event: ReactMouseEvent<HTMLDivElement>) => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export default function Switch({
  checked = false,
  onChange = () => {},
  leftIcon,
  rightIcon,
  className = ''
}: SwitchProps) {
  return (
    <div 
      className={`w-12 h-[22px] rounded-full bg-[#9fa8b52e] relative ${className}`}
      onClick={onChange}
    >
      <div
        className={`
          absolute h-[22px] w-[22px] top-1/2 -translate-y-1/2
          p-[5px] bg-white rounded-full flex justify-center items-center
          leading-none text-[13px] shadow-[0_0_8px_#2f313930]
          transition-all duration-400
          ${checked ? 'left-[calc(100%-22px)]' : 'left-0'}
        `}
        style={{
          transitionTimingFunction: 'cubic-bezier(.01,.68,.42,1.36)'
        }}
      >
        {checked ? rightIcon : leftIcon}
      </div>
    </div>
  )
}
