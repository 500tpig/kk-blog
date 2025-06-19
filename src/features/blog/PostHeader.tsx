import dayjs from 'dayjs'
import Image from 'next/image'

import ChatIcon from '@/components/icons/ChatIcon'
import FireIcon from '@/components/icons/FireIcon'

import { tagsColors } from '@/utils/tagsColors'

import { TagItem } from '@/features/blog'

interface PostHeaderProps {
  metadata: ArticlePost['metadata']
}

export default function PostHeader({ metadata }: PostHeaderProps) {
  return (
    <div className="w-full">
      {/* 日期卡片 */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div
          className="w-full max-w-[12.5rem] h-[12.5rem] rounded-xl bg-accent flex flex-col items-center justify-center text-white flex-shrink-0"
          style={{ boxShadow: '0 0 50px 5px #0000001f inset' }}
        >
          <div className="text-6xl font-semibold mb-2">{metadata.date.split('-')[2]}</div>
          <div className="text-4xl font-semibold">{dayjs(metadata.date).format('MMM')}</div>
        </div>

        <div className="flex-1 min-w-0">
          {/* 标签 */}
          <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 mb-4">
            {metadata.tags.split(',').map((tag: string) => {
              const tagColor = tagsColors[tag as keyof typeof tagsColors]
              return <TagItem key={tag} tag={tag} tagColor={tagColor} />
            })}
          </div>
          {/* 标题 */}
          <h1 className="text-3xl lg:text-4xl font-bold pb-3.5 mb-3.5 border-b dark:border-b-soft-white border-b-[#dfe1ea] w-full text-center lg:text-left">
            {metadata.title}
          </h1>
          {/* 作者信息与统计 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2.5">
              <Image src="/avatar.jpg" alt="avatar" width={45} height={45} className="rounded-full" />
              <div className="text-sm flex flex-col justify-center items-center sm:items-start">
                <div>
                  <span>By</span>
                  <span className="font-semibold ml-1">KK</span>
                </div>
                <div>
                  {metadata.date && <span>{dayjs(metadata.date).format('YYYY-MM-DD')}</span>}
                  <span className="mx-1.5">/</span>
                  {metadata.readingTime && <span>{metadata.readingTime} Min Read</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FireIcon className="w-4" />
                <span className="text-sm">0</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatIcon className="w-4" />
                <span className="text-sm">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
