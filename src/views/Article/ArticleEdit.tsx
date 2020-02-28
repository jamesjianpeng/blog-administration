import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_ARTICLE } from 'src/constants'
import ArticleStore from 'src/store/article'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.scss'

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

  public componentDidMount() {
    this.props[STORE_ARTICLE].getData()
    this.props[STORE_ARTICLE].getList()
  }

  public render() {
    const storeArticle = this.props[STORE_ARTICLE]
    return (
      <div className="article-container">
        <Steps current={storeArticle.step}>
          <Step title="添加文章基本信息"  />
          <Step title="添加文章内容" />
          <Step title="Waiting" />
          <Step title="Done!" />
        </Steps>
      </div>
    );
  }
}

