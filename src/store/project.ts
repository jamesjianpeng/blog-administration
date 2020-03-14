import { observable, action } from 'mobx'
import { IProject, IResPage, IRes, IParamPage } from 'src/interface'
import { requestGet } from 'src/help/request'

interface IProjectResPageType<T> extends IResPage<T> {
  name?: string
  startDate?: string
  endDate?: string
}

interface IProjectParamPage extends IParamPage {
  name?: string
}

export type IProjects = IProjectResPageType<IProject[]>
export type IProjectRes = IRes<IProject>

export default class ProjectStore {
    @observable
    public data: IProject = {} as IProject

    @observable
    public list: IProjects = {
      data: [],
      total: 0,
      page: 1,
      name: '',
      pageSize: 10,
      startDate: '',
      endDate: ''
    }

    @observable
    public step: number = 0

    @action
    public getList = (params?: IProjectParamPage) => {
      return  requestGet('/api/v1/get/project', params).then((res: IRes<IProjects>) => {
        this.setList(res.data)
      })
    }

    @action
    public setList = (data: any) => {
      this.list = {
        ...this.list,
        ...data
      }
    }
}
