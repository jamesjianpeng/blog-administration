import React from 'react'
import { Button } from 'antd'
import { IArticleProps as IProps } from 'src/interface'

interface IState {
  data: any
}

export default class Done extends React.PureComponent<IProps, IState> {
  public render() {
    return (
      <div className="m-t-20">
          <Button type="primary" onClick={ this.lookDetail }>
            查看文章详情
          </Button>
          <Button className="m-l-20" type="primary" onClick={ this.onGono }>
            继续添加文章
          </Button>
      </div>
    )
  }
  private lookDetail = () => {
    if (this.props.lookDetail) {
      this.props.lookDetail('/article-detail')
    }
  }
  private onGono = () => {
    if (this.props.onFinish) {
      this.props.onFinish({}, 'gono')
    }
  }
}
