import React from 'react'
import { Icon, Popover } from 'antd'
import './Card.css'

export interface ICard1 {
  lateNum: number
  weeklyRatio: string
  dailyRatio: string
  dailyLateNum: number
}

interface IProps {
  data: any
}

export const Card1: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  return (
    <div className="card">
      <div className="flex-h-space-between-center">
        <span className="card-header"> 预约迟到总人数 </span>
        <Popover content={
          <React.Fragment>
            基本信息
          </React.Fragment>
        }><Icon type="info-circle" /></Popover>
      </div>
      <h2 className="card-margin-top-small card-big">{ props.data.lateNum }</h2>
      <div className="card-margin-top-small flex-h-space-between-center card-sub">
        <span>周同比：{ props.data.weeklyRatio }</span>
        <span>日同比：{ props.data.dailyRatio } </span>
      </div>
      <div className="card-line card-margin-top card-sub">日均迟到人数 { props.data.dailyLateNum } </div>
    </div>
  )
}
