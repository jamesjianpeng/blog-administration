import React from 'react'
import { Icon, Popover } from 'antd'
import './Card.css'
import { Area } from 'src/components/Chart/Area'

export interface ICard2 {
  lateNum: number
  weeklyRatio: string
  dailyRatio: string
  dailyLateNum: number
}

interface IProps {
  data: any
}

const data: any = [
  {
    year: "1",
    value: 22
  },
  {
    year: "2",
    value: 200
  },
  {
    year: "3",
    value: 11
  },
  {
    year: "4",
    value: 33
  },
  {
    year: "5",
    value: 64
  },
  {
    year: "6",
    value: 55
  },
  {
    year: "7",
    value: 2
  },
];

export const Card2: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
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
      <div style={ {marginTop: '4px'} }>
        <Area data={ data } />
      </div>
      <div className="card-line card-margin-top card-sub">日均迟到人数 { props.data.dailyLateNum } </div>
    </div>
  )
}
