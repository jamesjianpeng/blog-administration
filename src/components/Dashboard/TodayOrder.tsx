import React from 'react'
import { Card } from 'antd';
import { Pie, IData } from 'src/components/Chart/Pie'
import './Card.css'

interface IProps {
  data: IData[]
}

export const TodayOrder: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  return (
    <div className="today-order-card">
      <Card title="今天预约订单" bordered={false}>
        <Pie data={ props.data } />
      </Card>
    </div>
  )
}
