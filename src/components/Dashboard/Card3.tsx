import React from 'react'
import { Icon, Popover } from 'antd'
import { Histogram } from 'src/components/Chart/Histogram'
import { IHistogram } from 'src/components/Dashboard/TotalData'
import './Card.css'

export interface ICard3 {
  lateNum: number
  weeklyRatio: string
  dailyRatio: string
  dailyLateNum: number
  data: IHistogram[]
}

interface IProps {
  data: any
}

interface IState {
  data: IHistogram[]
}

const dataMock: IHistogram[] = [
  {
    year: "1日",
    sales: 38
  },
  {
    year: "2日",
    sales: 52
  },
  {
    year: "3日",
    sales: 61
  },
  {
    year: "4日",
    sales: 145
  },
  {
    year: "5日",
    sales: 48
  },
  {
    year: "6日",
    sales: 125
  },
  {
    year: "7日",
    sales: 48
  },
  {
    year: "8日",
    sales: 61
  },
  {
    year: "9日",
    sales: 75
  },
  {
    year: "10日",
    sales: 48
  },
  {
    year: "11日",
    sales: 38
  },
  {
    year: "12日",
    sales: 145
  },
  {
    year: "13日",
    sales: 48
  },
  {
    year: "14日",
    sales: 38
  },
  {
    year: "15日",
    sales: 38
  },
  {
    year: "16日",
    sales: 38
  },
  {
    year: "17日",
    sales: 48
  },
  {
    year: "18日",
    sales: 58
  },
  {
    year: "19日",
    sales: 68
  },
  {
    year: "20日",
    sales: 88
  },
  {
    year: "21日",
    sales: 68
  },
  {
    year: "22日",
    sales: 88
  },
  {
    year: "23日",
    sales: 68
  },
  {
    year: "24日",
    sales: 88
  },
  {
    year: "25日",
    sales: 68
  },
  {
    year: "26日",
    sales: 88
  },
  {
    year: "27日",
    sales: 68
  },
  {
    year: "28日",
    sales: 88
  },
  {
    year: "29日",
    sales: 88
  },
  {
    year: "30日",
    sales: 88
  },
  {
    year: "31日",
    sales: 88
  }
];

export class Card3 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      data: []
    }
  }
  public componentDidMount() {
    this.setState({
      data: dataMock.map((item: IHistogram) => {
        item.sales = item.sales
        return item
      })
    })
  }
  public render () {
    return (
      <div className="card">
        <div className="flex-h-space-between-center">
          <span className="card-header"> 现成订单总数 </span>
          <Popover content={
            <React.Fragment>
              基本信息
            </React.Fragment>
          }><Icon type="info-circle" /></Popover>
        </div>
        <h2 className="card-margin-top-small card-big">{ this.props.data.lateNum }</h2>
        <div style={ {marginTop: '4px'} }>
          <Histogram
            data={this.state.data}
            padding="0"
            xAxis="year"
            yAxis="sales"
            height={20}
            forceFit={ true }
            cols={{
              sales: {
                tickInterval: 20
              }
            }}
            Axis={{
              line: {
                strokeOpacity: 0
              },
              grid: {
                lineStyle: {
                  strokeOpacity: 0
                }
              }
            }}
          />
        </div>
        <div className="card-line card-margin-top card-sub">日订单数 { this.props.data.dailyLateNum } </div>
      </div>
    )
  }
}
