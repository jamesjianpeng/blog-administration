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

export type IArticleOperationType = 'next' | 'prev' | 'gono' | 'done'

export interface IArticleProps {
  data: any
  onFinish?: (data: any, type: IArticleOperationType) => void
  lookDetail?: (url: string) => void
}
