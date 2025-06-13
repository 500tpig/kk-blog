declare namespace NodeJS {
  interface ProcessEnv {
    /** 基础路径 */
    NEXT_PUBLIC_BASEURL: string
  }
}

declare type ArticlePost = {
  id: string
  slug: string
  content: string
  metadata: {
    title: string
    date: string
    overview: string
    tags: string
    readingTime: number
  }
}

declare type PostsByMonth = {
  [key: string]: ArticlePost[]
}