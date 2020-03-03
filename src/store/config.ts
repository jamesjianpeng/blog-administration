import { observable, action } from 'mobx'
import { IConfig, IRes, IMenu } from 'src/interface'
import { requestGet } from 'src/help/request'

export default class ConfigStore {
    @observable
    public tags: IConfig[] = [] as IConfig[]

    @observable
    public menus: IMenu[] = [] as IMenu[]

    @action
    public getTags = () => {
      requestGet('/api/v1/get/config/tags').then((res: IRes<IConfig[]>) => {
        this.tags = res.data
      })
    }

    @action
    public getMenus = () => {
      requestGet('/api/v1/get/menus').then((res: IRes<IMenu[]>) => {
        this.menus = res.data
      })
    }
}
