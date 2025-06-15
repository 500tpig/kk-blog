import Image from 'next/image'

import GithubIcon from '@/components/icons/GithubIcon'
import QQIcon from '@/components/icons/QQIcon'
import WeChatIcon from '@/components/icons/WeChatIcon'

import { CategoriesData } from '@/features/blog/CategoriesData'

const socialLinks = [
  {
    href: 'https://github.com/your-profile',
    icon: <GithubIcon className="w-5 [filter:drop-shadow(3px_2px_1px_#00000020)]" />
  },
  { href: '#', icon: <QQIcon className="w-5 [filter:drop-shadow(3px_2px_1px_#00000020)]" /> },
  { href: '#', icon: <WeChatIcon className="w-5 [filter:drop-shadow(3px_2px_1px_#00000020)]" /> }
]
export default function Footer() {
  return (
    <footer className="mt-12.5 bg-white dark:bg-[#272C31] w-full">
      <div className="w-content-width mx-auto pt-12.5 pb-9">
        <div className="flex mb-15">
          <div className="flex-1">
            <div className="flex items-center gap-5">
              <div className="p-1 border-2 border-dotted rounded-full border-[#7F818540]">
                <Image
                  src="/avatar.jpg"
                  alt="logo"
                  width={90}
                  height={90}
                  className="rounded-full border-2 border-[#7F818540]"
                />
              </div>
              <div className="font-semibold">Kun Kun</div>
            </div>
            <div className="flex mt-5 gap-2.5">
              {socialLinks.map((item, index) => (
                <div
                  key={index}
                  className="p-1.5 dark:bg-[#1F2328] bg-[#F5F5FA] cursor-pointer transition-transform duration-300 hover:-translate-y-1 rounded-md"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>
              <div className="font-semibold">联系我</div>
            </div>

            <div className="text-sm mb-2.5 mt-5">Phone: +86 1377 **** ***</div>
            <div className="text-sm mb-2.5">E-mail: 9953****@qq.com</div>
            <div className="text-sm">Location: 中国 福建 厦门</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="heading-divider"></div>
              <div className="ml-3 font-semibold">分类</div>
            </div>
            <CategoriesData />
          </div>
        </div>
        <div className="w-full h-0.5 bg-[linear-gradient(to_right,#4569e7,#ff5992,#ffae00,#29a8ff,#42fbe1)] rounded-full"></div>
        <div className="flex justify-between text-xs mt-13">
          <div>Copyright & Design By @KunKun - 2025</div>
          <div className="flex gap-x-5">
            <div className="cursor-pointer hover:text-accent transition-colors">Privacy Policy</div>
            <div className="cursor-pointer hover:text-accent transition-colors">
              Terms and Conditions
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
