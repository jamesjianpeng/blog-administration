import React from 'react'
import { Icon, Popover } from 'antd'
import { Progress } from 'src/components/Chart/Progress'
import './Card.css'

export interface ICard4 {
  lateNum: number
  weeklyRatio: string
  dailyRatio: string
  ratio: string
  dailyLateNum: number
}

interface IProps {
  data: any
}

export const Card4: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  return (
    <div className="card">
      <div className="flex-h-space-between-center">
        <span className="card-header"> 未来7天琴房预约率 </span>
        <Popover content={
          <React.Fragment>
            基本信息
          </React.Fragment>
        }><Icon type="info-circle" /></Popover>
      </div>
      <h2 className="card-margin-top-small card-big">{ props.data.ratio }</h2>
      <div style={ {marginTop: '6px'} } className="card-margin-top-small flex-h-space-between-center card-sub card-progress">
        <Progress ratio={ props.data.ratio } standard="80%" />
      </div>
      <div className="flex-h-space-between-center card-line card-margin-top card-sub">
        <span>周同比：{ props.data.weeklyRatio }</span>
        <span>日同比：{ props.data.dailyRatio } </span>
      </div>
    </div>
  )
}
