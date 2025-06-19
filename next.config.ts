// import createMDX from '@next/mdx'

// import type { NextConfig } from 'next'

// const withMDX = createMDX({
//   // 支持 .mdx 和 .md 文件
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [], // 可选：添加 remark 插件以处理 Markdown
//     rehypePlugins: [] // 可选：添加 rehype 插件以处理 HTML
//   }
// })

// const nextConfig: NextConfig = {
//   // 定义页面文件扩展名，添加 MDX 支持
//   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
//   // 保留您现有的配置
//   transpilePackages: ['next-mdx-remote']
// }

// export default withMDX(nextConfig)

import withMDX from '@next/mdx'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // 开启压缩
  compress: true,

  // 图片优化
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // 缓存配置
  headers: async () => {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

// 使用类型断言确保配置正确
export default withMDX()(nextConfig as NextConfig)
