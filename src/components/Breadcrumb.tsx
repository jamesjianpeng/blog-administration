import React from 'react'
import { Breadcrumb } from 'antd'
import { IMenu } from 'src/components/Menu'
import { splitUrl, IUrlQuery } from 'src/help/util'
import './Breadcrumb.css'
interface IProps {
  path: string
  menu: IMenu[]
}

const typeObj: any = {
  'professional': '专业',
  'schoolProfessional': '校内专业',

  'operation': '加减操作',
  'record': '加减记录',

  'onSite': '现场订单',
  'reservation': '预约订单',

  'activities': '演出活动',
  'announcement': '通知公告'
}

const stypeObj: any = {
  'deviceScreen': '设备屏公告',
  'stype': '小程序公告',

  'whole': '全部',
  'concert': '音乐会',
  'observationTour': '观摩会',
  'dramaOpera': '话剧歌剧',
  'musicCompetition': '音乐赛事', //
  'masterClass': '大师班',
  'lveScene': 'Live现场',
  'other': '其他',

  'look': '查看详情',
  'edit': '编辑',
}
export const BreadcrumbIndex: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  const nameList: string[] = []
  const urlQuery: IUrlQuery = splitUrl(location.search)
  const { type, stype } = urlQuery
  let p = props.path.replace(/^\//, '').replace('-detail', '')
  p = p.includes('/') ? p.split('/')[0] : p
  const paths: string[] = p ? p.split('-') : ['/']
  const first: IMenu | undefined = props.menu.find((item: IMenu): boolean => item.path.replace(/^\//, '') === paths[0])
  nameList.push(first ? first.title : '-')

  let secode: IMenu | undefined
  if (first && first.children) {
    secode = first.children.find((item: IMenu): boolean => item.path.replace(/^\//, '') === p)
    nameList.push(secode ? secode.title : '-')
  }
  const typeTitle = typeObj[type || '']
  if (typeTitle) {
    nameList.push(typeTitle || '-')
  }
  const stypeTitle = stypeObj[stype || '']
  if (stypeTitle) {
    nameList.push(stypeTitle || '-')
  }

  return (
    <Breadcrumb className="breadcrumb-contianer">
      {
        <React.Fragment>
          {
            nameList.map((it: string, i: number) => {
              return <Breadcrumb.Item key={i}> {it}</Breadcrumb.Item>
            })
          }
        </React.Fragment>
      }
    </Breadcrumb>
  )
}


