import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

export default async function BlogCards() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)
  const posts = await Promise.all(
    filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data } = matter(fileContent)
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date
      }
    })
  )
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return (
    <div className="flex flex-col gap-10">
      {posts.map(post => (
        <article
          key={post.slug}
          className="w-full flex flex-col justify-between border-l-[5px] border-l-primary-color p-5 transition rounded-xl bg-card-bg"
          style={{ boxShadow: '0 2px 20px #0e0e130d' }}
        >
          <div className="flex items-center gap-6 w-full relative">
            <div>
              <Link href={`/blog/${post.slug}`} className="truncate pt-1 pb-3">
                <h3> {post.title}</h3>
              </Link>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/avatar.jpg"
                  alt="kk"
                  width={40}
                  height={40}
                  className="rounded-full mr-2.5 w-10 h-10"
                />
                <div>
                  <span className='mr-2'>By</span>
                  <span>kk</span>
                </div>
                <div>{post.date}</div>
              </div>
            </div>
            <div className="w-[9.375rem] relative flex-shrink-0">
              <div className="flex rounded-xl relative overflow-hidden w-full h-full"></div>
            </div>
          </div>
          <div></div>
        </article>
        // <div  className="mb-2">
        //   <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
        //     {post.title} - {post.date}
        //   </Link>
        // </div>
      ))}
    </div>
  )
}
