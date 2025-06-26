interface HeroSectionProps {
  experienceYears: number
}

export default function HeroSection({ experienceYears }: HeroSectionProps) {
  return (
    <>
      <div className="mt-[3.75rem] w-[11rem] bg-card-bg px-[5px] py-1 rounded-full flex items-center justify-between text-xs">
        <div
          className="text-white text-sm px-4 rounded-full"
          style={{ background: 'linear-gradient(90deg,#9C69CA 0%,#FF7CAC 100%)' }}
        >
          工作经验
        </div>
        <div>{experienceYears}年经验</div>
      </div>
      <h2 className="text-4xl font-semibold">
        <span>这里是</span>
        <span className="bg-gradient-to-r from-[#4382D6] via-[#9C69CA] to-[#E64480] bg-clip-text text-transparent mx-2">
          想要退休的前端开发
        </span>
        <span>的小破站</span>
      </h2>
      <div className="text-[#6A6D85] text-base">
        为了记录和学习一些技术和知识，我创建了这个小破站，顺便搬一搬之前写的笔记。
      </div>
    </>
  )
}
