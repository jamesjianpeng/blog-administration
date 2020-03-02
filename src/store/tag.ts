import { observable, action } from 'mobx'
import { IArticleItem, IResPage, IRes, IParamPage } from 'src/interface'
import { requestPost, requestGet, requestDelete  } from 'src/help/request'

export type IArticles = IResPage<IArticleItem[]>
export type IArticle = IRes<IArticleItem>

export default class TagStore {
    @observable
    public data: IArticleItem = {} as IArticleItem

    @observable
    public list: IArticles = {} as IArticles

    @observable
    public step: number = 0

    @action
    public getList = (params?: IParamPage) => {
      return  requestGet('/api/v1/get/tags', params).then((res: IRes<IArticles>) => {
        this.list = res.data
      })
    }

    @action
    public getData = (_id: string) => {
      return  requestGet('/api/v1/get/tag/' + _id).then((res: IArticle) => {
        this.data = res.data
      })
    }

    @action
    public deleteData = (_id: string) => {
      return requestDelete('/api/v1/delete/tag/' + _id, {}, true)
    }

    @action
    public setData = (data: IArticleItem) => {
      this.data = data
    }

    @action
    public postData = (data: IArticleItem) => {
      return requestPost('/api/v1/post/tag', data)
    }

    @action
    public setStep = (step: number) => {
      this.step = step
    }
}
