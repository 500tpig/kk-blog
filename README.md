# 项目文档：kk-blog

## 1. 项目概述

这是一个基于现代前端技术栈构建的个人博客项目。项目采用 Next.js 的 App Router 架构，支持 Markdown (MDX) 文件作为博客文章来源，并实现了亮/暗色主题切换功能。

- **项目名称**: `kk-blog`

## 2. 技术栈

项目使用的核心技术和库如下：

- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容格式**: MDX (Markdown with JSX)，通过 `@next/mdx` 和 `next-mdx-remote` 进行处理
- **Markdown 解析**: `gray-matter` 用于解析 Markdown 文件的 frontmatter
- **日期处理**: `dayjs`

## 3. 项目结构

项目的关键目录和文件说明：

- **`/src/app`**: Next.js App Router 的核心目录。
  - `layout.tsx`: 全局根布局，包含了 `<html>` 和 `<body>` 标签，并集成了 `ThemeProvider`。
  - `page.tsx`: 网站的主页（首页）。
  - `/blog/[slug]/page.tsx`: 动态路由页面，用于渲染单篇博客文章/page.tsx]。
- **`/src/components`**: 存放所有可复用的 React 组件。
  - `/layout`: 包含 `Header` 和 `Sidebar` 等布局组件。
  - `/ui`: 存放基础 UI 组件，如 `Switch`, `ProgressBar` 等。
  - `MDXComponents.tsx`: 自定义 MDX 内容渲染的组件样式（如 h1, p, code 等）。
- **`/src/contexts`**: 存放 React Context。
  - `ThemeContext.tsx`: 用于实现全局主题（亮色/暗色）切换的逻辑。
- **`/src/style`**: 存放全局样式文件，包括 `tailwind.css` 和自定义的 `globals.css`。
- **`/src/utils`**: 存放工具函数。
  - `getBlogPosts.ts`: 用于从文件系统读取 `/posts` 目录下的所有 Markdown 文件，并解析其内容和元数据。
- **`/posts`**: (此目录未在 `src` 中，位于根目录) 存放所有的博客文章 Markdown (`.md`) 文件。

## 4. 主要功能

1.  **MDX 博客系统**:

    - 文章存储在根目录的 `posts` 文件夹下。
    - `getBlogPosts.ts` 工具函数负责读取和解析这些文件。
    - `[slug]/page.tsx` 动态页面负责将 MDX 内容渲染为 HTML。

2.  **主题切换**:

    - `ThemeContext.tsx` 提供了切换亮色和暗色主题的功能。
    - 它通过在 `<html>` 标签上设置 `data-theme` 属性来工作。
    - `ThemeToggle.tsx` 组件提供了切换 UI，并使用了 `startViewTransition` API 来实现平滑的揭露动画。

3.  **响应式布局**:
    - 页面布局包含一个侧边栏 (`Sidebar`) 和主内容区，适用于桌面浏览器。
    - 使用了 Tailwind CSS 来进行样式和布局控制。

## 5. 如何运行

根据 `package.json` 文件，可以使用以下命令：

- **开发模式**:
  ```bash
  npm run dev
  ```
