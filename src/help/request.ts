import axios from 'axios'
import { message } from 'antd'

console.log()

const env = process.env.REACT_APP_SECRET_CODE || 'beta'
export const isBeta = env === 'beta'
export const isProd = env === 'prod'
export const isRealProd = env === 'realProd'
const urlConfig = {
  'beta':  'http://localhost:3070',
  'prod': 'http://www.pengjiandry.com:7080'
}

const commonHeaders = {
  'beta':  {
    appId: 'hcbHiywpFpP3m8CTW0',
    authCode: 'GJaImrLgzbgKQ0GaNX5kgCDtPrk7mcdF6Kq2zxe62pU=',
    token: 'rEXS5R5-xw2u-dc18ed47-508a-4f1b-b121-bbc7e167a8f8-m8OXg7'
  },
  'prod': {
    appId: 'hcbHiywpFpP3m8CTW0',
    authCode: 'GJaImrLgzbgKQ0GaNX5kgCDtPrk7mcdF6Kq2zxe62pU=',
    token: 'rEXS5R5-xw2u-dc18ed47-508a-4f1b-b121-bbc7e167a8f8-m8OXg7'
  }
}

export const commonHeaderConfig = commonHeaders[env]
export interface IRes<T> {
  data: T
}

export interface IResPage<T> {
  data: T
  page: number,
  total: number,
  pageSize: number,
  maxCount: number
}

export interface IPage {
  page: number
  pageSize?: number
  keyword?: string
  regionId?: number
}

export interface IUrlQuery {
    id?: string
    type?: string
    stype?: string
    ttype?: string
    role?: string
    page?: number
    pageSize?: number
    keyword?: string
    date?: string
    startDate?: string
    endDate?: string
}

export function requestGet(url: any, params?: any, showMessage?: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.get(`${urlConfig[env]}${url}`, { params: params || {} }).then((res: IRes<any>) => {
      resolve(res.data)
      if (showMessage) {
        message.info(res.data.data)
      }
    }).catch((e) => {
      message.error(e.toString())
      reject(e)
    })
  })
}
export function requestDelete(url: any, params?: any, showMessage?: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.delete(`${urlConfig[env]}${url}`, { params: params || {} }).then((res: IRes<any>) => {
      resolve(res.data)
      if (showMessage) {
        message.info(res.data.data)
      }
    }).catch((e) => {
      message.error(e.toString())
      reject(e)
    })
  })
}
export function requestPost(url: any, params: any, showMessage?: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(`${urlConfig[env]}${url}`, params).then((res: IRes<any>) => {
      resolve(res.data)
      if (showMessage) {
        message.info(res.data.data)
      }
    }).catch((e) => {
      message.error(e.toString())
      reject(e)
    })
  })
}

export function requestPostUpload(file: any): Promise<any> {
  return axios.post(`${urlConfig[env]}/api/file/v1/file/upload`, file, {headers: {
    'Content-Type': 'multipart/form-data'
  }})
}

const axiosInterceptorsReq = () => { // 请求之前
  axios.interceptors.request.use((config) => {
    // const token: any = window.localStorage.getItem('tokenString@playCommander') || '' // 获取Token
    // if (!token) { // 请求头中带token
    config.headers.common.token = commonHeaderConfig.token
    // config.headers.common.token = isBeta ? commonHeaderConfig.token : `${JSON.parse(token).token}`
    config.headers.common.appId = commonHeaderConfig.appId
    config.headers.common.authCode = commonHeaderConfig.authCode
    config.headers.common.language = 'zh_CN'
    // }
    return config
  }, (error: any) => {
    return error
  })
}

axiosInterceptorsReq()
