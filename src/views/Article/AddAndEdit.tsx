import React from 'react';
import { observer } from 'mobx-react'
import { STORE_ARTICLE, STORE_CONFIG } from 'src/constants'
import { IArticleOperationType, IMatch } from 'src/interface'
import {
  useStores,
} from 'src/store'
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
  match: IMatch<{ _id: string}>
}

interface IState {
  currentId: string
}

const ArticleEdit = (props: IProps) => {

  const [ state, setState ] = React.useState<IState>({currentId: ''})
  const storeArticle = useStores(STORE_ARTICLE)
  const storeConfig = useStores(STORE_CONFIG)

  React.useEffect(() => {
    const _id = props.match.params._id
    storeArticle.setStep(0)
    if (_id) {
      storeArticle.getData(_id)
    } else {
      storeArticle.setData()
    }
    storeConfig.getTags()
  }, [props.match.params._id])

  const getMeta = (data: any, _type: IArticleOperationType) => {
    storeArticle.setStep(storeArticle.step + 1)
    storeArticle.setData({...storeArticle.data, ...data})
  }

  const getMain = (data: any, type: IArticleOperationType) => {
    if (type === 'gono') {
      storeArticle.setData({...storeArticle.data, ...{ content: data.text, html: data.html }})
      return
    }
    if (type === 'done') {
      const current: any = storeArticle.data
      if (current.history) {
        delete current.history
      }
      storeArticle.postData({...current,
        ...{
          version: Number(current.version) ? Number(current.version) + 1 : 1,
          createTime: current._id ? new Date(current.createTime) : new Date(),
          updateTime: new Date()
          // createTime: current._id ? current.createTime : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          // updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }}).then((res: any) => {
          setState({
            currentId: res
          })
        })
    }
    const step: number = type === 'done' ?
      storeArticle.step + 1 :
      storeArticle.step - 1
    storeArticle.setStep(step)
    storeArticle.setData({...storeArticle.data, ...data})
  }

  const getDone = () => {
    storeArticle.setStep(0)
    storeArticle.setData()
  }
  const lookDetail = (url: string) => {
    props.history.push(url)
  }

  return (
    <div className="article-container">
      <Steps current={ storeArticle.step}>
        <Step title="添加文章基本信息"  />
        <Step title="添加文章内容" />
        <Step title="Done!" />
      </Steps>
      <div className="article-sub-container">
      {
        [
          <Meta key={0} data={ storeArticle.data } tags={ storeConfig.tags } onFinish={ getMeta } />,
          <Main key={1} data={ storeArticle.data.content } onFinish={ getMain } />,
          <Done key={2} data={ storeArticle.data } id={state.currentId} onFinish={ getDone } lookDetail={ lookDetail } />
        ][storeArticle.step]
      }
      </div>
    </div>
  );
}

export default observer(ArticleEdit)
