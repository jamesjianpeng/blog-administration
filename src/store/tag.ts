import { observable, action } from 'mobx'
import { ITag, IResPage, IRes, IParamPage } from 'src/interface'
import { requestPost, requestGet, requestDelete  } from 'src/help/request'

export type IArticles = IResPage<ITag[]>
export type IArticle = IRes<ITag>

export default class TagStore {
    @observable
    public data: ITag = {} as ITag

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
    public deleteData = (_id?: string) => {
      return requestDelete('/api/v1/delete/tag/' + _id, {}, true)
    }

    @action
    public setData = (data?: ITag) => {
      this.data = data || {
        text: '',
        value: '',
        createTime: '',
        updateTime: '',
        version: 0,
        history: []
      }
    }

    @action
    public postData = (data: ITag) => {
      return requestPost('/api/v1/post/tag', data)
    }

    @action
    public setStep = (step: number) => {
      this.step = step
    }
}
