import React from 'react'
import { Card, List, Avatar } from 'antd';
import './Card.css'

export interface IDynamic {
  user: string
  url: string
  text: string
  time: string
}
interface IProps {
  data: IDynamic[]
}

export const Dynamic: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
  return (
    <div className="dynamic-card">
      <Card title="动态" bordered={false}>
        <div style={ { overflowY: 'auto', height: '356px' } }>
          <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={(item: IDynamic) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.url || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                  title={<span className="card-sub "> {`${item.user} ${item.text}`} </span>}
                  description={<span className="card-sub "> {item.time} </span>}
                />
              </List.Item>
            )}
          />
        </div>

      </Card>
    </div>
  )
}
