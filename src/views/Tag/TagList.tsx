import React from 'react';
import { Modal } from 'antd'
import { TagStore } from 'src/store'
import { STORE_TAG } from 'src/constants'
import { IPropsBase, IArticleItem } from 'src/interface'
import { observer, inject } from 'mobx-react'
import TagTable from 'src/components/Table/TagTable'
import { changeURL } from 'src/help/util'
interface IProps extends IPropsBase {
  [STORE_TAG]: TagStore
}

const { confirm } = Modal
interface IState {
  selectedRowKeys: any
}

@inject(STORE_TAG)
@observer
export default class TagList extends React.Component<IProps, IState> {
  get storeTag() {
    return this.props[STORE_TAG]
  }

  get data() {
    return this.storeTag.list || {}
  }
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }
  public componentDidMount() {
    this.initList()
  }
  public render() {
    console.log(this.storeTag.list)
    const data = this.data.data
    console.log(data)
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (item: any) => {
        this.onSelectChange(item)
      }
    };
    const pagination = {
      current: this.data.page,
      pageSize: this.data.pageSize,
      total: this.data.total,
      onChange: (page: number) => {
        const query: any = { page, pageSize: this.data.pageSize, keyword: this.data.search }
        changeURL(this.props.history, this.props.location, query)
      }
    }
    return (
      <div className="bg-white p-20">
        <TagTable
          dataSource={data || []}
          rowSelection={rowSelection}
          pagination={pagination}
          onEdit={(_id: string, row: IArticleItem) => {
            this.props.history.push(`/article-edit/${ row._id }`)
          }}
          onDel={(_id: string, row: IArticleItem) => {
            confirm({
              title: <span> 确定删除 { row.title }</span>,
              okText: '确定',
              cancelText: '取消',
              onOk: () => {
                this.storeTag.deleteData(row._id).then(() => {
                  this.initList()
                })
              },
              onCancel: () => {
                console.log('Cancel');
              },
            });
          }}
          // tableChange={this.tableChange}
        />
      </div>
    );
  }

  private onSelectChange(selectedRowKeys: any) {
    this.setState({ selectedRowKeys });
  }

  private initList = () => {
    this.storeTag.getList({
      page: 1,
      pageSize: 10
    })
  }
}
