import React from 'react';
import { Modal } from 'antd'
import { ArticleStore } from 'src/store'
import { STORE_ARTICLE } from 'src/constants'
import { IPropsBase, IArticleItem } from 'src/interface'
import { observer, inject } from 'mobx-react'
import ArticleTable from 'src/components/Table/ArticleTable'
import { changeURL } from 'src/help/util'
interface IProps extends IPropsBase {
  [STORE_ARTICLE]: ArticleStore
}

const { confirm } = Modal
interface IState {
  selectedRowKeys: any
}

@inject(STORE_ARTICLE)
@observer
export default class ArticleList extends React.Component<IProps, IState> {
  get storeArticle() {
    return this.props[STORE_ARTICLE]
  }

  get data() {
    return this.storeArticle.list || {}
  }

  get articles() {
    return (this.storeArticle.list && this.storeArticle.list.data) || []
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
    console.log(this.storeArticle.list)
    const data = this.data.data
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
        <ArticleTable
          dataSource={data || []}
          rowSelection={rowSelection}
          pagination={pagination}
          onOperation={
            (_id: string, row: IArticleItem, type: string) => {
              if (type === 'edit') {
                this.onEdit(_id, row)
              }
              if (type === 'detail') {
                this.onDetail(_id, row)
              }
              if (type === 'history') {
                this.onHistory(_id, row)
              }
              if (type === 'del') {
                this.onDel(_id, row)
              }
            }
          }
          // tableChange={this.tableChange}
        />
      </div>
    );
  }

  private onEdit = (_id: string, row: IArticleItem) => {
    this.props.history.push(`/article-edit/${ row._id }`)
  }

  private onDetail= (_id: string, row: IArticleItem) => {
    this.props.history.push(`/article-detail/${ row._id }`)
  }

  private onHistory = (_id: string, row: IArticleItem) => {
    this.props.history.push(`/article-history/${ row._id }`)
  }

  private onDel = (_id: string, row: IArticleItem) => {
    confirm({
      title: <span> 确定删除 { row.title }</span>,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.storeArticle.deleteData(row._id).then(() => {
          this.initList()
        })
      },
      onCancel: () => {
        console.log('Cancel');
      }
    })
  }

  private onSelectChange(selectedRowKeys: any) {
    this.setState({ selectedRowKeys });
  }

  private initList = () => {
    this.storeArticle.getList({
      page: 1,
      pageSize: 10
    })
  }
}
