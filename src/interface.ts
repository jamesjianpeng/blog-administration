import { Location, History } from 'history'
export * from '@smartblog/models'

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
  tag?: string
}

export interface IProject {
  name: string // 项目名称
  type: string // 项目类型
  version: number // 版本
  time: string // 首次发布时间
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
  search?: string
  pageSize: number
  keyword?: string
}
export interface IConfig {
  text: string
  value: string
  sort?: number
}

export type IArticleOperationType = 'next' | 'prev' | 'gono' | 'done'

export interface IArticleProps {
  data: any
  onFinish?: (data: any, type: IArticleOperationType) => void
  lookDetail?: (url: string) => void
}
