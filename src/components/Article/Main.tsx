import React from 'react'
import { Button } from 'antd'
import { IArticleProps as IProps } from 'src/interface'
import { Edit } from 'src/components/Article/Edit'

const Main = (props: IProps) => {
  const changeEdit = (html: string, text: string) => {
    if (props.onFinish) {
      props.onFinish({ html, text }, 'gono')
    }
  }
  const prev = () => {
    if (props.onFinish) {
      props.onFinish(props.data, 'prev')
    }
  }

  const next = () => {
    if (props.onFinish) {
      props.onFinish(props.data, 'done')
    }
  }
  return (
    <div>
      <div>
        <Edit
          data={props.data}
          onFinsh={changeEdit}
        />
      </div>
      <div className="m-t-20">
        <Button type="primary" onClick={prev}>
          上一步
            </Button>
        <Button className="m-l-20" type="primary" onClick={next}>
          提交
            </Button>
      </div>
    </div>
  )
}

export default Main
