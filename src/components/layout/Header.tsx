import Search from '@/components/icons/Search'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header
      className="w-full h-19 transition-colors flex items-center justify-center bg-primary"
      style={{
        boxShadow: '0 2px 20px 0 rgba(14,14,19,0.051)'
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* 左侧 Logo */}
        <div className="font-bold text-xl">MyBlog</div>
        {/* 中间菜单（大屏显示） */}
        <nav className="hidden lg:flex gap-6 text-base text-headings-color-light">
          <a href="#" className="hover:text-primary-500 transition">
            首页
          </a>
          <a href="#" className="hover:text-primary-500 transition">
            分类
          </a>
          <a href="#" className="hover:text-primary-500 transition">
            关于
          </a>
        </nav>
        {/* 右侧功能区 */}
        <div className="flex items-center gap-4">
          <Search className="w-[22px] h-[22px]" />
          <ThemeToggle />
          {/* 移动端菜单按钮 */}
          <button className="block lg:hidden p-2">
            {/* 这里可以放汉堡菜单图标 */}
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
