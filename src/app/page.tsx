import BlogCards from '@/components/BlogCards'
import Sidebar from '@/components/layout/Sidebar'
import SkillItemWrap from '@/components/SkillItemWrap'
import Divider from '@/components/ui/Divider'

export default function page() {
  const years = new Date().getFullYear() - 2021 + 1

  return (
    <div className="flex gap-x-12.5 items-start w-content-width py-[50px] relative mx-auto">
      <Sidebar />
      <div className="p-[10px] flex flex-col gap-y-5 flex-1 overflow-x-hidden">
        <div className="mt-[3.75rem] w-[11rem] bg-card-bg px-[5px] py-1 rounded-full flex items-center justify-between text-xs">
          <div
            className="text-white text-sm px-4 rounded-full"
            style={{ background: 'linear-gradient(90deg,#9C69CA 0%,#FF7CAC 100%)' }}
          >
            工作经验
          </div>
          <div>{years}年经验</div>
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
        <Divider className="my-11" />
        <div className="flex items-center">
          <div className="heading-divider"></div>
          <h3 className="ml-3 text-xl">My Skills</h3>
        </div>
        <div className="flex flex-col gap-5">
          <div
            className="bg-white p-10 rounded-xl flex gap-x-[3.75rem]"
            style={{ backgroundImage: 'linear-gradient(140deg,#F06363 1%,#417BE6 100%)' }}
          >
            <div className="flex w-[12.5rem] items-center">
              <svg
                aria-hidden="true"
                className="icon-svg text-4xl text-white mr-[1.875rem]"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256.5 216.8L343.2 326s-16.6 102.4-76.6 150.1C206.7 523.8 0 510.2 0 510.2s3.8-23.1 11-55.4l94.6-112.2c4-4.7-.9-11.6-6.6-9.5l-60.4 22.1c14.4-41.7 32.7-80 54.6-97.5 59.9-47.8 163.3-40.9 163.3-40.9zm238 135c-44 0-79.8 35.8-79.8 79.9 0 44.1 35.7 79.9 79.8 79.9 44.1 0 79.8-35.8 79.8-79.9 0-44.2-35.8-79.9-79.8-79.9zM636.5 31L616.7 6c-5.5-6.9-15.5-8-22.4-2.6L361.8 181.3l-34.1-43c-5.1-6.4-15.1-5.2-18.6 2.2l-25.3 54.6 86.7 109.2 58.8-12.4c8-1.7 11.4-11.2 6.3-17.6l-34.1-42.9L634 53.5c6.9-5.5 8-15.6 2.5-22.5z"></path>
              </svg>
              <div className="font-medium text-white">
                <div>Web Design &</div>
                <div>Development</div>
              </div>
            </div>
            <div className="flex-1 text-sm text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore
              magna aliqua.
            </div>
          </div>
          <div
            className="bg-white p-10 rounded-xl flex gap-x-[3.75rem]"
            style={{ backgroundImage: 'linear-gradient(140deg,#84F0B2 1%,#3A5D9F 100%)' }}
          >
            <div className="flex w-[12.5rem] items-center">
              <svg
                aria-hidden="true"
                className="icon-svg text-4xl text-white mr-[1.875rem]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
              <div className="font-medium text-white">
                <div>Improve SEO</div>
                <div>Ranking</div>
              </div>
            </div>
            <div className="flex-1 text-sm text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore
              magna aliqua.
            </div>
          </div>
          <div
            className="bg-white p-10 rounded-xl flex gap-x-[3.75rem]"
            style={{ backgroundImage: 'linear-gradient(140deg,#AD63F0 1%,#41C1E6 100%)' }}
          >
            <div className="flex w-[12.5rem] items-center">
              <svg
                aria-hidden="true"
                className="icon-svg text-4xl text-white mr-[1.875rem]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path>{' '}
              </svg>
              <div className="font-medium text-white">
                <div>Search Engine</div>
                <div>Optimization</div>
              </div>
            </div>
            <div className="flex-1 text-sm text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore
              magna aliqua.
            </div>
          </div>
          <div
            className="bg-white p-10 rounded-xl flex gap-x-[3.75rem]"
            style={{ backgroundImage: 'linear-gradient(140deg,#F0AE63 1%,#41E6DB 100%)' }}
          >
            <div className="flex w-[12.5rem] items-center">
              <svg
                aria-hidden="true"
                className="icon-svg text-4xl text-white mr-[1.875rem]"
                viewBox="0 0 640 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>{' '}
              </svg>
              <div className="font-medium text-white">
                <div>Social Media</div>
                <div>Advertising</div>
              </div>
            </div>
            <div className="flex-1 text-sm text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore
              magna aliqua.
            </div>
          </div>
        </div>
        <div className="mt-10 overflow-hidden">
          <div
            style={{
              transition:
                'background .3s,border .3s,border-radius .3s,box-shadow .3s,transform var(--e-transform-transition-duration,.4s)'
            }}
          >
            <div
              className="flex gap-[2.1875rem] overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right,transparent,black 10%,black 90%,transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right,transparent,black 10%,black 90%,transparent)',
                direction: 'rtl'
              }}
            >
              <SkillItemWrap />
              <SkillItemWrap />
            </div>
          </div>
        </div>
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
  )
}
