import { observable, action } from 'mobx'

export interface IArticleItem {
  title: string // 文章标题
  post: string // 文章封面
  content: string // 文章内容
  tag: string[] // 文章标签
  createTime: string // 文章创建时间 YYYY-MM-DD HH:mm:ss
  updateTime: string // 文章更新时间 YYYY-MM-DD HH:mm:ss
}

const  mockData: IArticleItem =  {
  title: 'title', // 文章标题
  post: 'post', // 文章封面
  content: 'string', // 文章内容
  tag: ['string[]'], // 文章标签
  createTime: 'string', // 文章创建时间 YYYY-MM-DD HH:mm:ss
  updateTime: 'string' // 文章更新时间 YYYY-MM-DD HH:mm:ss
}

const mockList: IArticleItem[] = [
  mockData
]


export default class ArticleStore {
    @observable
    public data: IArticleItem = {} as IArticleItem

    @observable
    public list: IArticleItem[] = []

    @observable
    public step: number = 0

    @action
    public getList() {
      this.list = mockList
    }

    @action
    public getData() {
      this.data = mockData
    }

    @action
    public updateStep(step: number) {
      this.step = step
    }
}
