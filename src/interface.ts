import { Location, History } from 'history'
export interface IArticleItem {
  _id?: string
  title: string // 文章标题
  post: string // 文章封面
  content: string // 文章内容
  html: string // 文章内容html
  tag: string[] // 文章标签
  state: string // 文章状态
  createTime: string // 文章创建时间 YYYY-MM-DD HH:mm:ss
  updateTime: string // 文章更新时间 YYYY-MM-DD HH:mm:ss
  version: number // 版本
  history: IArticleItem[]
}

export interface ITag {
  _id?: string
  text: string
  value: string
  createTime: string // 文章创建时间 YYYY-MM-DD HH:mm:ss
  updateTime: string // 文章更新时间 YYYY-MM-DD HH:mm:ss
  version: number // 版本
  history: ITag[]
}

export interface IMatch<T> {
  path: string
  url: string
  isExact: boolean
  params: T
}

export interface IHistoryListen {
  pathname: string
  search: string
  hash: string
  state: string | undefined
  key: string
}

export interface IParamPage {
  page: number
  type?: string
  keyword?: string
  pageSize?: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface IPropsBase {
  history: History
  location: Location
}

export interface IRes<T> {
  data: T
}

export interface IResPage<T> {
  data: T
  total: number
  page: number
  search: string
  pageSize: number
  keyword: string
}
export interface IConfig {
  text: string
  value: string
  sort?: number
}

export interface IMenu {
  icon?: string
  title: string
  path: string
  children?: IMenu[]
  disabled?: boolean
  version?: 0 | 1
}

export type IArticleOperationType = 'next' | 'prev' | 'gono' | 'done'

export interface IArticleProps {
  data: any
  onFinish?: (data: any, type: IArticleOperationType) => void
  lookDetail?: (url: string) => void
}
