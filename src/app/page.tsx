import Divider from '@/components/ui/Divider'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

import BlogCards from '@/features/blog/BlogCards'
import { HeroSection } from '@/features/home/HeroSection'
import { PersonalServices } from '@/features/home/PersonalServices'
import { SkillsMarquee } from '@/features/home/SkillsMarquee'
import Sidebar from '@/features/layout/Sidebar'
export default function page() {
  const years = new Date().getFullYear() - 2021 + 1

  return (
    <>
      <div className="flex gap-x-12.5 items-start w-content-width py-[50px] relative mx-auto">
        <Sidebar />

        <div className="p-[10px] flex flex-col gap-y-5 flex-1 overflow-x-hidden">
          <HeroSection experienceYears={years} />
          <Divider className="my-11" />
          <div id="my-skills-section" className="flex items-center">
            <div className="heading-divider"></div>
            <h3 className="ml-3 text-xl">My Skills</h3>
          </div>
          <PersonalServices />
          <SkillsMarquee />
          <Divider className="my-11" />

          <div className="flex items-center">
            <div className="heading-divider"></div>
            <h3 className="ml-3 text-xl">My Blogs</h3>
          </div>
          <div>
            <BlogCards />
          </div>
        </div>
      </div>
      <ScrollToTopButton triggerElementId="my-skills-section" />
    </>
  )
}
