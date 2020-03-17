import React from 'react'
import { Button } from 'antd'
import { IArticleProps } from 'src/interface'

interface IProps extends IArticleProps {
  id: string
}

const Done = (props: IProps) => {
  const lookDetail = () => {
    if (props.lookDetail) {
      props.lookDetail(`/article-detail/${props.id}`)
    }
  }
  const onGono = () => {
    if (props.onFinish) {
      props.onFinish({}, 'gono')
    }
  }
  return (
    <div className="m-t-20">
        <Button type="primary" onClick={ lookDetail }>
          查看文章详情
        </Button>
        <Button className="m-l-20" type="primary" onClick={ onGono }>
          继续添加文章
        </Button>
    </div>
  )
}

export default Done
