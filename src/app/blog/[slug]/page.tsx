import Image from 'next/image'
import { notFound } from 'next/navigation'

import RenderMDX from '@/components/RenderMDX'
import TableContent, { Heading } from '@/components/TableContent'
import TagItem from '@/components/TagItem'

import { getBlogPosts } from '@/utils/getBlogPosts'
import { tagsColors } from '@/utils/tagsColors'

import { slugify } from '@/lib/utils'

// (推荐) 生成静态参数
export async function generateStaticParams() {
  const { posts } = await getBlogPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const { posts } = await getBlogPosts()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  const { content, metadata } = post

  // 使用正则表达式从 MDX 内容中提取 h1, h2, h3 标题
  const headingRegex = /^(#{1,3})\s+(.*)/gm
  let match
  const headings: Heading[] = []
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugify(text)
    headings.push({ level, text, id })
  }

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-content-width mx-auto">
        <div className="w-5xl mx-auto py-12">
          <div className="flex items-center gap-2 mb-2.5">
            {metadata.tags.split(',').map((tag: string) => {
              const tagColor = tagsColors[tag as keyof typeof tagsColors]
              return <TagItem key={tag} tag={tag} tagColor={tagColor} />
            })}
          </div>
          <h1 className="text-4xl font-bold pb-3.5 mb-3.5 border-b dark:border-b-soft-white border-b-[#dfe1ea]">
            {metadata.title}
          </h1>
          <div className="flex">
            <div className="flex gap-2.5">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="text-sm flex flex-col justify-center">
                <div>
                  <span>By</span>
                  <span className="font-semibold ml-1">KK</span>
                </div>
                <div>{metadata.date}</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex gap-7 w-full items-start">
          <div className="p-2.5 pb-0">
            <div
              className="p-7 rounded-xl bg-card-bg"
              style={{
                boxShadow: '0 2px 20px #0e0e130d'
              }}
            >
              <div className="p-7">
                <TableContent headings={headings} />
                <RenderMDX content={content} />
              </div>
            </div>
          </div>
          <aside className="p-2.5 pb-0 w-sidebar-width sticky top-2 transition-all duration-600">
            <div
              className="p-7 rounded-xl bg-card-bg"
              style={{
                boxShadow: '0 2px 20px #0e0e130d'
              }}
            >
              <div className="flex justify-center w-full">
                <div className="rounded-full w-[7.5rem] h-[7.5rem] overflow-hidden relative border-4 border-[#C6D8FF99]">
                  <Image src="/avatar.jpg" alt="avatar" fill className="object-cover" />
                </div>
              </div>
              <div className="text-center mt-2.5">
                <div className="text-base font-semibold">@ KK</div>
                <div className="text-sm text-body-color">
                  <span>苦命前端开发</span>
                </div>
              </div>
              <div className="flex items-center mt-7">
                <div className="heading-divider"></div>
                <div className="ml-3 text-base font-semibold">最近博客</div>
              </div>
              <div className="flex items-center mt-7">
                <div className="heading-divider"></div>
                <div className="ml-3 text-base font-semibold">分类</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
