'use client'

import Image from 'next/image'

import EmailIcon from '@/components/icons/EmailIcon'
import GithubIcon from '@/components/icons/GithubIcon'
import LocationIcon from '@/components/icons/LocationIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import QQIcon from '@/components/icons/QQIcon'
import WeChatIcon from '@/components/icons/WeChatIcon'
import Divider from '@/components/ui/Divider'
import ProgressBar from '@/components/ui/ProgressBar'

import { useScroll } from '@/contexts/ScrollContext'

const list = [
  {
    icon: <GithubIcon className="w-6 [filter:drop-shadow(3px_2px_1px_#00000020)]" />
  },
  {
    icon: <QQIcon className="w-6 [filter:drop-shadow(3px_2px_1px_#00000020)]" />
  },
  {
    icon: <WeChatIcon className="w-6 [filter:drop-shadow(3px_2px_1px_#00000020)]" />
  }
]

export default function Sidebar() {
  const { isScrolled } = useScroll()
  return (
    <aside
      className={`w-full p-2.5 lg:w-[34%] flex-shrink-0 lg:sticky transition-all duration-600 mb-10 lg:mb-0 ${
        isScrolled ? 'top-[86px]' : 'top-[10px]'
      }`}
    >
      <div className="p-[30px] bg-card-bg rounded-xl" style={{ boxShadow: '0 2px 20px #0e0e130d' }}>
        <div className="max-w-[100%] flex flex-col gap-y-5">
          <div className="p-[6px] border-[#7F818540] border-dotted border-2 rounded-xl profile-image-container">
            <div className="max-w-[800px] box-border relative">
              <div className="border-4 border-[#7F818540] rounded-xl overflow-hidden image-wrapper has-animation">
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  width={400}
                  height={500}
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
                <div className="image-animation">
                  <Image
                    src="/avatar.jpg"
                    alt="avatar"
                    width={400}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">
              <span>前端开发</span>
            </div>
            <ProgressBar value={50} color="#FF9F28" bgColor="#F5E7DA" />
          </div>
          <div>
            <div className="text-xs font-bold">SEO优化（以后就会了）</div>
            <ProgressBar value={10} color="#43D9BE" bgColor="#CDF4EF" />
          </div>
          <div>
            <div className="text-xs font-bold">图像开发（一点点）</div>
            <ProgressBar value={30} color="#8282FF" bgColor="#DEE2FF" />
          </div>
          <div className="mt-[30px] text-sm">
            <div className="flex flex-col gap-y-[14px]">
              <div className="flex items-center gap-x-4">
                <PhoneIcon />
                <div>Phone: +86 1377 **** ***</div>
              </div>
              <Divider />
              <div className="flex items-center gap-x-4">
                <EmailIcon className="w-5 h-5" />
                <div>E-mail: 9953****@qq.com</div>
              </div>
              <Divider />
              <div className="flex items-center gap-x-4">
                <LocationIcon className="w-5 h-5" color="#546064" />
                <div>Location: 中国 福建 厦门</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center items-center gap-2.5">
            {list.map((item, index) => (
              <div
                key={index}
                className="p-2 rounded-full border border-[#e1e3ea] dark:border-soft-white cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
