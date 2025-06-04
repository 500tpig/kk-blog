import { Inter } from 'next/font/google'

import Header from '@/components/layout/Header'

import { ThemeProvider } from '@/contexts/ThemeContext'

import type { Metadata } from 'next'

import '@/style/globals.css'

// 配置 Inter 字体
const inter = Inter({
  subsets: ['latin'], // 根据需要选择子集
  display: 'swap', // display策略
  variable: '--font-inter' // 可以通过CSS 变量使用它
})
export const metadata: Metadata = {
  title: 'kk博客',
  description: 'kk博客'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-cn" className={`${inter.variable}`}>
      <body className={`antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
