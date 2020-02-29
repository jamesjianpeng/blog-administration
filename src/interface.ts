export interface IArticleItem {
  title: string // 文章标题
  post: string // 文章封面
  content: string // 文章内容
  tag: string[] // 文章标签
  createTime: string // 文章创建时间 YYYY-MM-DD HH:mm:ss
  updateTime: string // 文章更新时间 YYYY-MM-DD HH:mm:ss
}

export type IArticleOperationType = 'next' | 'prev' | 'gono'

export interface IArticleProps {
  data: any
  onFinish?: (data: any, type: IArticleOperationType) => void
  lookDetail?: (url: string) => void
}
