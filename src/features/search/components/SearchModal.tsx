'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Search from '@/components/icons/Search'
import CrossLine from '@/components/ui/CrossLine'

import { tagsColors } from '@/utils/tagsColors'

import SearchInput from './SearchInput'

import TagItem from '@/features/blog/TagItem'

export default function SearchModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const handleSearch = (query: string) => {
    router.push(`/search?q=${query}`)
    setIsOpen(false)
  }
  return (
    <>
      <Search
        className="w-6 cursor-pointer"
        onClick={() => {
          setIsOpen(true)
        }}
      />
      <div
        className={`
          fixed top-0 left-0 w-screen h-screen bg-[#18181eb3] z-[9998]
          backdrop-blur-sm transition-opacity duration-600
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => {
          setIsOpen(false)
        }}
      ></div>
      <div
        className={`
          fixed top-0 left-0 w-screen h-[50vh] z-[9999] p-5 bg-card-bg
          transition-transform duration-600 ease-[cubic-bezier(.86,0,.07,1)]
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <CrossLine
          onClick={() => {
            setIsOpen(false)
          }}
          text="Close"
          className="absolute top-7.5 left-1/2 -translate-x-1/2 w-12.5 h-12.5"
        />

        <div className="h-full max-w-[700px] flex flex-col items-center justify-center mx-auto my-0">
          <div className="text-xl font-semibold text-headings-color mb-4">
            输入你想要查询的内容，Enter 或点击查询按钮
          </div>
          <SearchInput onSearch={handleSearch} />
          <div className="w-full mt-5 flex justify-center items-center gap-5">
            <div className="text-base font-semibold">常用搜索:</div>
            <div className="flex gap-4">
              <Link
                href="/search?q=React"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <TagItem tag="React" tagColor={tagsColors.React} />
              </Link>
              <Link
                href="/search?q=Next"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <TagItem tag="Next" tagColor={tagsColors.Next} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
