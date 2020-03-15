import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_ARTICLE, STORE_CONFIG } from 'src/constants'
import { IArticleOperationType, IMatch } from 'src/interface'
import ArticleStore from 'src/store/article'
import ConfigStore from 'src/store/config'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'
// import moment from 'moment';

import Meta from 'src/components/Article/Meta'
import Main from 'src/components/Article/Main'
import Done from 'src/components/Article/Done'

import { Steps } from 'antd'
const { Step } = Steps;

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
  [STORE_ARTICLE]: ArticleStore
  [STORE_CONFIG]: ConfigStore
}

interface IState {
  currentId: string
}

@inject(STORE_ARTICLE, STORE_CONFIG)
@observer
export default class ArticleEdit extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      currentId: ''
    }
  }

  get storeArticle() {
    return this.props[STORE_ARTICLE]
  }

  get storeConfig() {
    return this.props[STORE_CONFIG]
  }

  public componentDidMount() {
    const _id = this.props.match.params._id
    this.storeArticle.setStep(0)
    if (_id) {
      this.storeArticle.getData(_id)
    } else {
      this.storeArticle.setData()
    }
    this.storeConfig.getTags()
  }

  public render() {
    return (
      <div className="article-container">
        <Steps current={ this.storeArticle.step}>
          <Step title="添加文章基本信息"  />
          <Step title="添加文章内容" />
          <Step title="Done!" />
        </Steps>
        <div className="article-sub-container">
        {
          [
            <Meta key={0} data={ this.storeArticle.data } tags={ this.storeConfig.tags } onFinish={ this.getMeta } />,
            <Main key={1} data={ this.storeArticle.data.content } onFinish={ this.getMain } />,
            <Done key={2} data={ this.storeArticle.data } id={this.state.currentId} onFinish={ this.getDone } lookDetail={ this.lookDetail } />
          ][this.storeArticle.step]
        }
        </div>
      </div>
    );
  }

  private getMeta = (data: any, _type: IArticleOperationType) => {
    this.storeArticle.setStep(this.storeArticle.step + 1)
    this.storeArticle.setData({...this.storeArticle.data, ...data})
  }

  private getMain = (data: any, type: IArticleOperationType) => {
    if (type === 'gono') {
      this.storeArticle.setData({...this.storeArticle.data, ...{ content: data.text, html: data.html }})
      return
    }
    if (type === 'done') {
      const current: any = this.storeArticle.data
      if (current.history) {
        delete current.history
      }
      this.storeArticle.postData({...current,
        ...{
          version: Number(current.version) ? Number(current.version) + 1 : 1,
          createTime: current._id ? new Date(current.createTime) : new Date(),
          updateTime: new Date()
          // createTime: current._id ? current.createTime : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          // updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }}).then((res: any) => {
          this.setState({
            currentId: res
          })
        })
    }
    const step: number = type === 'done' ?
      this.storeArticle.step + 1 :
      this.storeArticle.step - 1
    this.storeArticle.setStep(step)
    this.storeArticle.setData({...this.storeArticle.data, ...data})
  }

  private getDone = () => {
    this.storeArticle.setStep(0)
    this.storeArticle.setData()
  }
  private lookDetail = (url: string) => {
    this.props.history.push(url)
  }
}

