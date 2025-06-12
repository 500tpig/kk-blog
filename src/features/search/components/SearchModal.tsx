'use client'
import { useState } from 'react'

import Search from '@/components/icons/Search'

import { tagsColors } from '@/utils/tagsColors'

import TagItem from '@/features/blog/TagItem'



export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
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
          backdrop-blur-[6px] transition-opacity duration-600
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
        <div
          className="popup-search-close"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <span className="cross-line top-left"></span>
          <span className="cross-line top-right"></span>
          <span className="cross-line bottom-left"></span>
          <span className="cross-line bottom-right"></span>
          <span className="close-text">Close</span>
        </div>

        <div className="h-full max-w-[700px] flex flex-col items-center justify-center mx-auto my-0">
          <div className="text-xl font-semibold text-headings-color mb-4">
            输入你想要查询的内容，Enter 或点击查询按钮
          </div>
          <div className="w-full relative">
            <input
              className="w-full py-3.5 pl-5 pr-12 m-0 border border-[#d9dfe7] bg-white text-body-color text-sm dark:bg-[#2a3036] dark:border-[#3f454b] rounded-full box-border focus:border-[#84858a] outline-none transition duration-300"
              placeholder=""
            />
            <button className="w-10 h-10 absolute right-1 top-[50%] -translate-y-1/2 py-0 bg-accent flex items-center justify-center rounded-full">
              <Search className="w-6 cursor-pointer text-white" />
            </button>
          </div>
          <div className="w-full mt-5 flex justify-center items-center gap-5">
            <div className="text-base font-semibold">常用搜索:</div>
            <div className="flex gap-4">
              <TagItem tag="React" tagColor={tagsColors.React} />
              <TagItem tag="JavaScript" tagColor={tagsColors.JavaScript} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
