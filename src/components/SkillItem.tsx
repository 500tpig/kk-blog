import { ReactNode } from 'react'

export default function SkillItem({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <div className="flex gap-[0.625rem] font-bold items-center" style={{ direction: 'ltr' }}>
      <div className="text-[1.875rem] text-[#A5B7CF75] flex items-center justify-center p-1">
        {icon}
      </div>
      <div
        className="bg-clip-text text-2xl"
        style={{
          backgroundImage: 'linear-gradient(90deg,#6C83A1 0%,#6C83A1B3 50%,#6C83A154 100%)',
          WebkitTextFillColor: '#fff0'
        }}
      >
        {name}
      </div>
    </div>
  )
}
