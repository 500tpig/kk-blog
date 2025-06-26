import { Inter } from 'next/font/google'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { ScrollProvider } from '@/contexts/ScrollContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Footer, StaticHeader, StickyHeader } from '@/features/layout'

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-cn" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ThemeProvider>
            <ScrollProvider>
              <div className="flex min-h-screen flex-col items-start h-full">
                <StaticHeader />
                <StickyHeader />
                <main className="flex-grow w-full h-full">{children}</main>
                <Footer />
              </div>
            </ScrollProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
