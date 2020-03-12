import React from 'react'
import { Breadcrumb } from 'antd'
import { IMenu } from 'src/interface'
import './Breadcrumb.css'
interface IProps {
  path: string
  menu: IMenu[]
}

export const BreadcrumbIndex: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  const nameList: string[] = []
  let p = props.path.replace(/^\//, '')
  p = p.includes('/') ? p.split('/')[0] : p
  const paths: string[] = p ? p.split('-') : ['/']
  const first: IMenu | undefined = props.menu.find((item: IMenu): boolean => item.path.replace(/^\//, '') === paths[0])
  nameList.push(first ? first.title : '-')
  let secode: IMenu | undefined
  if (first && first.children) {
    secode = first.children.find((item: IMenu): boolean => item.path.replace(/^\//, '') === p)
    nameList.push(secode ? secode.title : '-')
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


