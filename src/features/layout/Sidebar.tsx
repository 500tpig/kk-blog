import Image from 'next/image'

import EmailIcon from '@/components/icons/EmailIcon'
import LocationIcon from '@/components/icons/LocationIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import Divider from '@/components/ui/Divider'
import ProgressBar from '@/components/ui/ProgressBar'


export default function Sidebar() {
  return (
    <div className="w-[30%] sticky top-[10px] flex-shrink-0">
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
                {/* <div className="bg-card-bg absolute p-5 m-5 bottom-0 left-0 right-0 rounded-xl z-10 business-card opacity-100">
                  <div className="text-lg font-semibold">王衍坤</div>
                  <div className="text-sm">前端开发工程师</div>
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold">
              <span>Web Designer</span>
            </div>
            <ProgressBar value={80} color="#FF9F28" bgColor="#F5E7DA" />
          </div>
          <div>
            <div className="text-xs font-bold">Seo Marketing</div>
            <ProgressBar value={60} color="#43D9BE" bgColor="#CDF4EF" />
          </div>
          <div>
            <div className="text-xs font-bold">Graphic Design</div>
            <ProgressBar value={50} color="#8282FF" bgColor="#DEE2FF" />
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
        </div>
      </div>
    </div>
  )
}
