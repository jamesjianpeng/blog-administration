import { observable, action } from 'mobx'
import { IArticle, IResPage, IRes, IParamPage } from 'src/interface'
import { requestPost, requestGet, requestDelete  } from 'src/help/request'
import { ARTICLE_DOING } from 'src/constants'

interface IResPageTyp<T> extends IResPage<T> {
  type: string
  startDate: string
  endDate: string
  tag: string
}

export type IArticles = IResPageTyp<IArticle[]>
export type IArticleRes = IRes<IArticle>

export default class ArticleStore {
    @observable
    public data: IArticle = {} as IArticle

    @observable
    public list: IArticles = {
      data: [],
      total: 0,
      page: 1,
      search: '',
      pageSize: 5,
      type: ARTICLE_DOING,
      keyword: '',
      startDate: '',
      endDate: '',
      tag: ''
    }

    @observable
    public step: number = 0

    @action
    public getList = (params?: IParamPage) => {
      return  requestGet('/api/v1/get/articles', params).then((res: IRes<IArticles>) => {
        this.setList(res.data)
      })
    }

    @action
    public getData = (_id: string) => {
      return  requestGet('/api/v1/get/article/' + _id).then((res: IArticleRes) => {
        this.data = res.data
      })
    }

    @action
    public deleteData = (_id?: string) => {
      return requestDelete('/api/v1/delete/article/' + _id, {}, true)
    }

    @action
    public putDataState = (data: {_id: string, state: string}) => {
      return requestDelete('/api/v1/put/articleState/', data, true)
    }

    @action
    public setData = (data?: IArticle) => {
      this.data = data || {
        title: '', // 文章标题
        post: '', // 文章封面
        content: '', // 文章内容
        html: '',
        tag: [], // 文章标签
        state: 'doing',
        createTime: '', // 文章创建时间 YYYY-MM-DD HH:mm:ss
        updateTime: '', // 文章更新时间 YYYY-MM-DD HH:mm:ss
        version: 0, // 版本
        history: []
      }
    }

    @action
    public postData = (data: IArticle) => {
      return requestPost('/api/v1/post/article', data)
    }

    @action
    public setStep = (step: number) => {
      this.step = step
    }

    @action
    public setList = (data: any) => {
      this.list = {
        ...this.list,
        ...data
      }
    }
}
