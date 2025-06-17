type GoodAnswerWrapper<T> = {
  ok: true
  result: T
}

export type ErrorMessage = {
  ok: false
  error: string
}

type Account = {
  short_name: string
  author_name: string
  author_url: string
  access_token: string
  auth_url: string
}

export type CreateAccount = GoodAnswerWrapper<Account>

export type AccountInfo = GoodAnswerWrapper<Account & { page_count: number }>

export type Page = {
  author_name: string
  author_url?: string
  can_edit?: boolean
  description: string
  path: string
  title: string
  url: string
  views: number
  content?: object
}

export type PageAnswer = GoodAnswerWrapper<Page>

export type GetPageList = GoodAnswerWrapper<PageList>

type PageList = {
  total_count: number
  pages: Page[]
}
