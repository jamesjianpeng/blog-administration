import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_TAG } from 'src/constants'
import { IArticleOperationType, IMatch } from 'src/interface'
import { TagStore } from 'src/store'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'
import moment from 'moment'

import Meta from 'src/components/Tag/Meta'

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
  [STORE_TAG]: TagStore
}

@inject(STORE_TAG)
@observer
export default class ArticleEdit extends React.Component<IProps, any> {

  get storeTag() {
    return this.props[STORE_TAG]
  }

  public componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  public componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  public componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  public componentDidMount() {
    this.initData()
  }

  public render() {
    return (
      <Meta data={ this.storeTag.data } onFinish={ this.getMeta } />
    );
  }

  private getMeta = (data: any, type: IArticleOperationType) => {
    if (type === 'done') {
      const current: any = this.storeTag.data
      this.storeTag.postData({...current, ...{
        ...data,
        version: Number(current.version) ? Number(current.version) + 1 : 1,
        createTime: current._id ? current.createTime : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }}).then(() => {
        this.lookDetail('/tag-list')
      })
    }
  }

  private lookDetail = (url: string) => {
    this.props.history.push(url)
  }

  private initData = () => {
    const _id = this.props.match.params._id
    if (_id) {
      this.storeTag.getData(_id)
    } else {
      this.storeTag.setData()
    }
  }
}

