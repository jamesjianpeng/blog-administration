import React from 'react'
import { Table } from 'antd';
import './Base.css'

interface IProps {
  dataSource: any[]
  pagination: any
  tableChange?: (pagination: any, filters: any, sorter:any, extra: any) => void
}

export default class ProjectTable extends React.Component<IProps, any> {
  public state = {
    columns: [
      {
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '版本',
        dataIndex: 'version',
      },
      {
        title: '项目类型',
        dataIndex: 'type',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
        render: (p: string) => {
          return new Date(p).toString()
        }
      }
    ],
  }

  public render() {

    return <Table
      rowKey={'_id'}
      className="base-table"
      columns={this.state.columns}
      dataSource={this.props.dataSource}
      pagination={this.props.pagination}
    />;
  }
}
