import React from 'react'
import { Button } from 'antd'
import { IArticleProps as IProps } from 'src/interface'
import { Edit } from 'src/components/Article/Edit'

interface IState {
  data: any
}
export default class Main extends React.PureComponent<IProps, IState> {
  public render() {
    console.log(this.props.data)
    return (
      <div>
          <div>
            <Edit
              data={ this.props.data }
              onFinsh={ this.changeEdit }
            />
          </div>
          <div className="m-t-20">
            <Button type="primary" onClick={ this.prev }>
              上一步
            </Button>
            <Button className="m-l-20" type="primary" onClick={ this.next }>
              提交
            </Button>
          </div>
      </div>
    )
  }

  private changeEdit = (html: string, text: string) => {
    if (this.props.onFinish) {
      this.props.onFinish({html, text}, 'gono')
    }
  }
  private prev = () => {
    if (this.props.onFinish) {
      this.props.onFinish(this.props.data, 'prev')
    }
  }

  private next = () => {
    if (this.props.onFinish) {
      this.props.onFinish(this.props.data, 'done')
    }
  }
}
