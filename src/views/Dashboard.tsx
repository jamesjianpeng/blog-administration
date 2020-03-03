import React from 'react';
import { Row, Col } from 'antd';
import './Dashboard.css'
import { Card1, ICard1 } from 'src/components/Dashboard/Card1'
import { Card2, ICard2 } from 'src/components/Dashboard/Card2'
import { Card3, ICard3 } from 'src/components/Dashboard/Card3'
import { Card4, ICard4 } from 'src/components/Dashboard/Card4'
import { Dynamic, IDynamic } from 'src/components/Dashboard/Dynamic'
import { Fast } from 'src/components/Dashboard/Fast'
import { TodayOrder } from 'src/components/Dashboard/TodayOrder'
import { TotalData } from 'src/components/Dashboard/TotalData'
import { IData as IPieData } from 'src/components/Chart/Pie'
import { History } from 'history'
import Footer from 'src/components/Footer'
const card1Mock: ICard1 = {
  dailyLateNum: 11,
  dailyRatio: '11%',
  lateNum: 116,
  weeklyRatio: '12%'
}
const card2Mock: ICard2 = {
  dailyLateNum: 11,
  dailyRatio: '11%',
  lateNum: 116,
  weeklyRatio: '12%'
}
const card3Mock: ICard3 = {
  dailyLateNum: 11444,
  dailyRatio: '11%',
  lateNum: 11446,
  weeklyRatio: '12%',
  data: [
    {
      year: "1月",
      sales: 80
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
      sales: 115
    },
    {
      year: "5月",
      sales: 70
    },
    {
      year: "6月",
      sales: 38
    },
    {
      year: "7月",
      sales: 50
    },
    {
      year: "8月",
      sales: 38
    },
    {
      year: "9月",
      sales: 90
    },
    {
      year: "10月",
      sales: 58
    },
    {
      year: "11月",
      sales: 100
    },
    {
      year: "12月",
      sales: 88
    }
  ]
}
const card4Mock: ICard4 = {
  dailyLateNum: 11,
  dailyRatio: '11%',
  lateNum: 116,
  ratio: '75%',
  weeklyRatio: '12%'
}
const dynamicMock: IDynamic[] = [
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '林东东',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '酱霉霉',
  },
  {
    text: '房间2001 呼叫保修钢琴',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '曲丽丽',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '小刷刷',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '林东东',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '酱霉霉',
  },
  {
    text: '房间2001 呼叫保修钢琴',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '曲丽丽',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '小刷刷',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '林东东',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '酱霉霉',
  },
  {
    text: '房间2001 呼叫保修钢琴',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '曲丽丽',
  },
  {
    text: '报名了',
    time: 'Mon Feb 03 2020 14:31:08 GMT+0800 (中国标准时间)',
    url: '',
    user: '小刷刷',
  },
]

const todayOrderMock: IPieData[] = [
  {
    item: "待开始",
    count: 4000
  },
  {
    item: "正在使用中",
    count: 2144
  },
  {
    item: "暂时离开",
    count: 1744
  },
  {
    item: "预约迟到",
    count: 1355
  },
  {
    item: "非开发时间",
    count: 966
  }
]

interface IProps {
  history: History
}
class Dashboard extends React.Component<IProps, any> {
  public render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col className="gutter-row" span={6}>
            <Card1 data={card1Mock} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Card2 data={card2Mock} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Card3 data={card3Mock} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Card4 data={card4Mock} />
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="flex-h-space-between-flex-start">
              <div style={{ width: '60%' }}>
                <Dynamic data={dynamicMock} />
              </div>
              <div style={{ width: '38%' }}>
                <Fast history={this.props.history} />
                <TodayOrder data={todayOrderMock} />
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col className="gutter-row" span={24}>
            <TotalData />
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
