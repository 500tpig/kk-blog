import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'

import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/features/layout/Header'

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
  description: 'kk博客',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // 在服务器端读取 cookie
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('theme')
  const initialTheme = themeCookie?.value === 'dark' ? 'dark' : 'light'
  return (
    // 将主题直接应用到 <html> 标签
    <html lang="zh-cn" className={`${inter.variable}`} data-theme={initialTheme}>
      <body className="antialiased">
        {/* 将 initialTheme 传递给 ThemeProvider */}
        <ThemeProvider initialTheme={initialTheme}>
          <SmoothScrollProvider>
            <div className="flex min-h-screen flex-col items-start h-full">
              <Header />
              <main className="flex-grow w-full h-full">{children}</main>
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
