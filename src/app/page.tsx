import Divider from '@/components/ui/Divider'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

import { BlogCards } from '@/features/blog/server'
import { HeroSection } from '@/features/home'
import { PersonalServices } from '@/features/home'
import { SkillsMarquee } from '@/features/home'
import { Sidebar } from '@/features/layout'

export default function page() {
  const years = new Date().getFullYear() - 2021

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-12.5 items-start w-content-width py-[20px] lg:py-[50px] relative mx-auto px-2.5 lg:px-0">
        <Sidebar />

        <div className="p-2.5 lg:p-[10px] flex flex-col gap-y-5 flex-1 w-full overflow-hidden">
          <HeroSection experienceYears={years} />
          <Divider className="my-8 lg:my-11" />
          <div id="my-skills-section" className="flex items-center">
            <div className="heading-divider"></div>
            <h3 className="ml-3 text-lg lg:text-xl">My Skills</h3>
          </div>
          <PersonalServices />
          <SkillsMarquee />
          <Divider className="my-8 lg:my-11" />

          <div className="flex items-center">
            <div className="heading-divider"></div>
            <h3 className="ml-3 text-lg lg:text-xl">My Blogs</h3>
          </div>
          <BlogCards />
        </div>
      </div>

      {/* 桌面端 "回到顶部" 按钮，移动端隐藏 */}
      <div className="hidden lg:flex">
        <ScrollToTopButton triggerElementId="my-skills-section" />
      </div>
    </>
  )
}
