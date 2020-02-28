import { requestGet } from 'src/help/request'

export function getMenuList(params: any): Promise<any> {
  return requestGet('/api/getMenuList', params)
}
