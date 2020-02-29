import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_ARTICLE } from 'src/constants'
import { IArticleItem, IArticleOperationType } from 'src/interface'
import ArticleStore from 'src/store/article'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'

import Meta from 'src/components/Article/Meta'
import Main from 'src/components/Article/Main'
import Done from 'src/components/Article/Done'

import { Steps } from 'antd'
const { Step } = Steps;

interface IProps {
  history: History
  location: Location
  [STORE_ARTICLE]: ArticleStore
}

@inject(STORE_ARTICLE)
@observer
export default class ArticleEdit extends React.Component<IProps, any> {

  get storeArticle() {
    return this.props[STORE_ARTICLE]
  }

  public componentDidMount() {
    setTimeout(() => {
      this.storeArticle.getData()
      this.storeArticle.getList()
    }, 4000)
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
            <Meta key={0} data={ this.storeArticle.data } onFinish={ this.getMeta } />,
            <Main key={1} data={ this.storeArticle.data } onFinish={ this.getMain } />,
            <Done key={2} data={ this.storeArticle.data } onFinish={ this.getDone } lookDetail={ this.lookDetail } />
          ][this.storeArticle.step]
        }
        </div>
      </div>
    );
  }

  private getMeta = (data: any, _type: IArticleOperationType) => {
    this.storeArticle.setStep(this.storeArticle.step + 1)
    this.storeArticle.setData(data)
  }

  private getMain = (data: any, type: IArticleOperationType) => {
    const step: number = type === 'next' ?
      this.storeArticle.step + 1 :
      this.storeArticle.step - 1
    this.storeArticle.setStep(step)
    this.storeArticle.setData({...this.storeArticle.data, ...data})
  }

  private getDone = () => {
    this.storeArticle.setStep(0)
    this.storeArticle.setData({} as IArticleItem)
  }
  private lookDetail = (url: string) => {
    console.log(url)
    this.props.history.push(url)
  }
}

