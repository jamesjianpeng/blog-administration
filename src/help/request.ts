import axios from 'axios'
import { message } from 'antd'

console.log()

const env = process.env.REACT_APP_SECRET_CODE || 'beta'
export const isBeta = env === 'beta'
export const isProd = env === 'prod'
export const isRealProd = env === 'realProd'
const urlConfig = {
  // mock
  'beta':  'http://localhost:3070',
  'prod': 'http://www.pengjiandry.com:5050',

  // 测试
  'real': 'http://www.ljguo.cn:8086',
  'upload': 'http://www.ljguo.cn:8085',

  // 正式
  'realProd': 'http://api.admin.tansiling.com:553',
  'realUpload': 'https://file.tansiling.com'
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
const baseUrl: string =  urlConfig[env]
const realBaseUrl: string = isRealProd ? urlConfig.realProd : urlConfig.real
const realUploadUrl: string = isRealProd ? urlConfig.realUpload : urlConfig.upload
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

export const typeConfig: any = {
  'add': '新增',
  'edit': '编辑',
  'look': '查看'
}

const initData: any = {
  "appType": "IOS",
  "appVersion": "1",
  "uuid": "18",
  "system": "IOS",
  "brand": "Apple",
  "model": "IPHONE 7 Plus",
  "systemVersion": "12",
  "apiVersion": "1",
  "platform": "1",
  "nonce": "181"
}

export function requestGet(url: any, params?: any, isReal?: boolean): Promise<any> {
  return axios.get(`${isReal ? urlConfig.real : baseUrl }${url}`, { params })
}
export function requestPost(url: any, data: any, isReal?: boolean): Promise<any> {
  return axios.post(`${isReal ? urlConfig.real : baseUrl}${url}`, data)
}

export function requestPostReal(url: any, data: any): Promise<any> {
  const param: any = typeof data === 'object' ? {
    ...data,
    regionId: 1,
    agentid: 1
  } : data
  const option: any = {
    param,
    ...initData
   }

  return new Promise((resolve, reject) => {
    axios.post(`${realBaseUrl}${url}`, option).then((res: IRes<any>) => {
      resolve(res.data)
    }).catch((e) => {
      message.error(e.toString())
      reject(e)
    })
  })
}
export function requestPostDeReal(url: any, data: any): Promise<any> {
  const option: any = {
    param: data,
    ...initData
   }

  return new Promise((resolve, reject) => {
    axios.post(`${realBaseUrl}${url}`, option).then((res: IRes<any>) => {
      resolve(res.data)
    }).catch((e) => {
      message.error(e.toString())
      reject(e)
    })
  })
}
export function requestPostUpload(file: any): Promise<any> {
  return axios.post(`${realUploadUrl}/api/file/v1/file/upload`, file, {headers: {
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
