import React from 'react'
import { Table } from 'antd';
import './Base.css'

export interface IPianoRoomListAction<T> {
  title: string
  icon?: string
  tooltip?: string
  onClick: (row: T) => void
}

interface IProps {
  className: string // base-table
  rowKey: string // num
  rowSelection?: any // rowSelection
  columns: any[]
  dataSource: any[]
  pagination?: any
  scroll?: any
  onChange?: (pagination: any, filters: any, sorter:any, extra: any) => void
}

interface IStates {
  selectedData: any[]
  selectedRowKeys: any[],
  loading: boolean
}

export class BaseTable extends React.PureComponent<IProps, IStates> {
  public render() {
    return (
        <Table
          {...this.props}
        />
    )
  }
}
