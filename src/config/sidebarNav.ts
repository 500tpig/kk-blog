interface NavItem {
  title: string
  href: string
}

interface NavSection {
  title: string
  icon?: string // 可选的图标
  items: NavItem[]
}

export const sidebarNav: NavSection[] = [
  {
    title: 'JavaScript',
    items: [{ title: 'Promise笔记', href: '/blog/Promise-note' }]
  },
  {
    title: 'React',
    items: [
      { title: 'React 学习笔记 Vue 转向 React', href: '/blog/Study-React-01' },
      { title: 'React 学习笔记 状态与生命周期', href: '/blog/Study-React-02' },
      { title: 'React 学习笔记 React的一些Hooks', href: '/blog/Study-React-03' }
    ]
  },
  {
    title: 'Next.js',
    items: [
      { title: 'Next 学习笔记 Next初步认识', href: '/blog/Study-Next-01' },
      { title: 'Next 学习笔记 什么是服务端组件', href: '/blog/Study-Next-02' },
      { title: 'Next 学习笔记 数据获取', href: '/blog/Study-Next-03' },
      { title: 'Next 学习笔记 路由高级技巧', href: '/blog/Study-Next-04' },
      { title: 'Next 学习笔记 Next.js 样式方案', href: '/blog/Study-Next-05' },
      { title: 'Next 学习笔记 前端性能优化', href: '/blog/Study-Next-06' },
      { title: 'Next 学习笔记 Next.js SEO', href: '/blog/Study-Next-07' }
    ]
  }
]
