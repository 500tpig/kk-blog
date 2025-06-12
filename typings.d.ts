declare namespace NodeJS {
  interface ProcessEnv {
    /** 基础路径 */
    NEXT_PUBLIC_BASEURL: string
  }
}

export type ArticlePost = {
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

export type PostsByMonth = {
  [key: string]: ArticlePost[]
}