declare namespace NodeJS {
  interface ProcessEnv {
    /** 基础路径 */
    NEXT_PUBLIC_BASEURL: string
  }
}

export type ArticlePost = {
  id?: string
  slug?: string
  title?: string
  content: string
  metadata: {
    [key: string]: any
  },
}

export type PostsByMonth = {
  [key: string]: WeeklyPost[];
}
