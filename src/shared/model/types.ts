export type CreateAccount = {
  ok: boolean
  result: {
    short_name: string
    author_name: string
    author_url: string
    access_token: string
    auth_url: string
  }
}

export type AccountInfo = CreateAccount & { result: { page_count: number } }

export type ErrorMessage = {
  ok: false
  error: string
}

export type PageObject = {
  path: string
  url: string
  title: string
  description: string
  author_name?: string
  author_url?: string
  views: number
  can_edit?: boolean
}

export type ProfileForm = {
  shortName: string
  authorName: string
  authorUrl: string
}

export type GetPageList = {
  ok: boolean
  result: {
    total_count: number
    pages: Page[]
  }
}

export type Page = {
  author_name: string
  can_edit: boolean
  description: string
  path: string
  title: string
  url: string
  views: number
}
