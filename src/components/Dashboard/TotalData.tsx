import React from 'react'
import { DatePicker } from 'antd';
import './Card.css'
import { Histogram } from 'src/components/Chart/Histogram'
const { RangePicker } = DatePicker;

interface IRanking {
  ranking: number
  name: string
  time: number
}

export interface IHistogram {
  year: string
  sales: number
}

const dataMock: IHistogram[] = [
  {
    year: "1月",
    sales: 38
  },
  {
    year: "2月",
    sales: 52
  },
  {
    year: "3月",
    sales: 61
  },
  {
    year: "4月",
    sales: 145
  },
  {
    year: "5月",
    sales: 48
  },
  {
    year: "6月",
    sales: 38
  },
  {
    year: "7月",
    sales: 38
  },
  {
    year: "8月",
    sales: 38
  },
  {
    year: "9月",
    sales: 48
  },
  {
    year: "10月",
    sales: 58
  },
  {
    year: "11月",
    sales: 68
  },
  {
    year: "12月",
    sales: 88
  }
];

interface IStates {
  rankingList: IRanking[]
  data: IHistogram[]
  selectChart: number
  selectDate: string
}

let id: any = null

export class TotalData extends React.Component<any, IStates> {
  constructor(props: any) {
    super(props)
    this.state = {
      selectChart: 0,
      selectDate: 'D',
      rankingList: [],
      data: []
    }
  }

  public componentWillUnmount () {
    clearTimeout(id)
  }

  public componentDidMount() {
    id = setTimeout(() => {
      this.setState({
        data: dataMock,
        rankingList: [
          {
            ranking: 1,
            name: '零零七',
            time: 457
          },
          {
            ranking: 2,
            name: '江弟弟',
            time: 47
          },
          {
            ranking: 3,
            name: '李丽丽',
            time: 45
          },
          {
            ranking: 4,
            name: '林妹妹',
            time: 30
          },
          {
            ranking: 5,
            name: '小王子',
            time: 22
          },
          {
            ranking: 5,
            name: '每每',
            time: 21
          },
          {
            ranking: 6,
            name: '桃桃',
            time: 10
          },
          {
            ranking: 7,
            name: '荔枝',
            time: 5
          },
          {
            ranking: 7,
            name: '荔枝',
            time: 5
          },
          {
            ranking: 7,
            name: '荔枝',
            time: 5
          },
          {
            ranking: 8,
            name: '香蕉',
            time: 4
          },
        ]
      })
    }, 1000)
  }

  public render() {
    return (
      <div className="total-data">
          <div>{ this.createTitle() }</div>
          <div className="total-data_chart">
              <div className="total-data_histogram">
                <Histogram
                  data={this.state.data}
                  xAxis="year"
                  yAxis="sales"
                  height={400}
                  cols={{
                    sales: {
                      tickInterval: 20
                    }
                  }}
                  forceFit={ true }
                />
              </div>
              <div className="total-data_ranking">
                <span className="total-data_ranking-title"> 本周练琴时长排名（小时）</span>
                <ul>
                  {
                    this.state.rankingList.map((item: IRanking, index: number) => {
                      return (
                        <li className="total-data_ranking-item" key={ index }>
                          <span className={`total-data_ranking-text ${ index <=3 ? 'total-data_ranking-top' : '' }`}>{ item.ranking }</span>
                          <div className="total-data_ranking-inner">
                            <span className="total-data_ranking-name">{ item.name }</span>
                            <span className="total-data_ranking-time">{ item.time }</span>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
          </div>
      </div>
    )
  }

  private onChange(date: any, dateString: any) {
    console.log(date, dateString);
  }
  private changeChartTab(selectChart: number) {
    this.setState({
      selectChart
    })
  }
  private changeChartDate(selectDate: string) {
    this.setState({
      selectDate
    })
  }

  private createTitle(): React.ReactNode {
    return (
      <div className="total-data-title">
        <div className="total-data-title_tab">
          <div style={{ height: '100%' }}>
            <span className={ `total-data-title_title ${ this.state.selectChart === 0 ? 'total-data-title_title-selected' : '' }` } onClick={ () => {this.changeChartTab(0)} }> 使用率 </span>
            <span className={ `total-data-title_title ${ this.state.selectChart === 1 ? 'total-data-title_title-selected' : '' }` } onClick={ () => {this.changeChartTab(1)} }> 预约率</span>
          </div>
          <div>
            <span className={ `total-data-title_text ${ this.state.selectDate === 'D' ? 'total-data-title_text-selected' : '' }` } onClick={ () => {this.changeChartDate('D')} }> 今日 </span>
            <span className={ `total-data-title_text ${ this.state.selectDate === 'W' ? 'total-data-title_text-selected' : '' }` } onClick={ () => {this.changeChartDate('W')} }> 本周 </span>
            <span className={ `total-data-title_text ${ this.state.selectDate === 'M' ? 'total-data-title_text-selected' : '' }` } onClick={ () => {this.changeChartDate('M')} }> 本月 </span>
            <span className={ `total-data-title_text ${ this.state.selectDate === 'Y' ? 'total-data-title_text-selected' : '' }` } onClick={ () => {this.changeChartDate('Y')} }> 全年 </span>
          </div>
        </div>
        <div className="total-data-title_date"> <RangePicker onChange={ (date, dateString) => { this.onChange(date, dateString)}} /> </div>
      </div>
    )
  }
}
