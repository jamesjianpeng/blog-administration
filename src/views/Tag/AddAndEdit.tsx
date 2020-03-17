import React from 'react';
import { observer } from 'mobx-react'
import { STORE_TAG } from 'src/constants'
import { IArticleOperationType, IMatch } from 'src/interface'
import { useStores } from 'src/store'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'

import Meta from 'src/components/Tag/Meta'

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
}

const ArticleEdit = (props: IProps) => {
  const storeTag = useStores(STORE_TAG)

  const getMeta = (data: any, type: IArticleOperationType) => {
    if (type === 'done') {
      const current: any = storeTag.data
      storeTag.postData({...current, ...{
        ...data,
        version: Number(current.version) ? Number(current.version) + 1 : 1,
        createTime: current._id ? current.createTime : new Date(),
        updateTime: new Date()
      }}).then(() => {
        lookDetail('/tag-list')
      })
    }
  }

  const lookDetail = (url: string) => {
    props.history.push(url)
  }

  const initData = () => {
    const _id = props.match.params._id
    if (_id) {
      storeTag.getData(_id)
    } else {
      storeTag.setData()
    }
  }

  React.useEffect(() => {
    initData()
  }, [props.match.params._id])

  return (
    <Meta data={ storeTag.data } onFinish={ getMeta } />
  )
}

export default observer(ArticleEdit)
