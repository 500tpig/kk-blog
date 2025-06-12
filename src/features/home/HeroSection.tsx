interface HeroSectionProps {
  experienceYears: number
}

export function HeroSection({ experienceYears }: HeroSectionProps) {
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
        <span className="bg-gradient-to-r from-[#4382D6] via-[#9C69CA] to-[#E64480] bg-clip-text text-transparent mr-2">
          Creative & Curious Person
        </span>
        <span>who has a lot of Experience</span>
      </h2>
      <div className="text-[#6A6D85] text-base">
        With many years in web development, I acquired extensive experience working on projects
        across multiple industries and technologies. Let me show you my best creations.
      </div>
    </>
  )
}
