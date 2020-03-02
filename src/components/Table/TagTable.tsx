import React from 'react'
import { Table, Icon, Button } from 'antd';
import './Base.css'

interface IProps {
  dataSource: any[]
  rowSelection: any
  pagination: any
  tableChange?: (pagination: any, filters: any, sorter:any, extra: any) => void
  onEdit: (id: string, data: any) => void
  onDel: (id: string, data: any) => void
}

export default class TagTable extends React.Component<IProps, any> {
  public state = {
    columns: [
      {
        title: '标签名',
        dataIndex: 'text',
      },
      {
        title: '对应值',
        dataIndex: 'value',
      },
      {
        title: '版本',
        dataIndex: 'version',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
      },
      {
        title: '操作',
        dataIndex: 'note',
        render: (_id: string, row: any) => {
          return (
            <div className="flex-h-flex-start-center">

              <Button onClick={ () => this.props.onEdit(_id, row) } className="base-table-button base-table-button_no-padding" type="link">
                <Icon type="form" />
              </Button>

              <Button onClick={ () => this.props.onDel(_id, row) } className="base-table-button base-table-button_no-padding" type="link">
                <Icon type="delete" />
              </Button>

            </div>
          )
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
      rowSelection={this.props.rowSelection}
      pagination={this.props.pagination}
    />;
  }
}
