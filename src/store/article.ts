import { observable, action } from 'mobx'
import { IArticleItem, IResPage, IRes, IParamPage } from 'src/interface'
import { requestPost, requestGet, requestDelete  } from 'src/help/request'

export type IArticles = IResPage<IArticleItem[]>
export type IArticle = IRes<IArticleItem>

export default class ArticleStore {
    @observable
    public data: IArticleItem = {} as IArticleItem

    @observable
    public list: IArticles = {} as IArticles

    @observable
    public step: number = 0

    @action
    public getList = (params?: IParamPage) => {
      return  requestGet('/api/v1/get/articles', params).then((res: IRes<IArticles>) => {
        this.list = res.data
      })
    }

    @action
    public getData = (_id: string) => {
      return  requestGet('/api/v1/get/article/' + _id).then((res: IArticle) => {
        this.data = res.data
      })
    }

    @action
    public deleteData = (_id?: string) => {
      return requestDelete('/api/v1/delete/article/' + _id, {}, true)
    }

    @action
    public setData = (data?: IArticleItem) => {
      this.data = data || {
        title: '', // 文章标题
        post: '', // 文章封面
        content: '', // 文章内容
        tag: [], // 文章标签
        createTime: '', // 文章创建时间 YYYY-MM-DD HH:mm:ss
        updateTime: '', // 文章更新时间 YYYY-MM-DD HH:mm:ss
        version: 0, // 版本
        history: []
      }
    }

    @action
    public postData = (data: IArticleItem) => {
      return requestPost('/api/v1/post/article', data)
    }

    @action
    public setStep = (step: number) => {
      this.step = step
    }
}
