import React from 'react';
import { Modal, Input, DatePicker, } from 'antd'
import { ArticleStore } from 'src/store'
import { STORE_ARTICLE, ARTICLE_DOING, ARTICLE_DISCARD, ARTICLE_FILE, ARTICLE_TEXT } from 'src/constants'
import { IPropsBase, IArticle } from 'src/interface'
import { IUrlQuery } from 'src/help/request'
import { splitUrl } from 'src/help/util'
import { observer, inject } from 'mobx-react'
import ArticleDoingTable from 'src/components/Table/ArticleDoingTable'
import ArticleDiscardTable from 'src/components/Table/ArticleDiscardTable'
import ArticleFileTable from 'src/components/Table/ArticleFileTable'
import moment from 'moment'
import { changeURL } from 'src/help/util'
const { confirm } = Modal
const { RangePicker } = DatePicker

export type RangePickerValue = undefined[] | [moment.Moment] | [undefined, moment.Moment] | [moment.Moment, undefined] | [moment.Moment, moment.Moment];

interface IProps extends IPropsBase {
  [STORE_ARTICLE]: ArticleStore
}
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

  get rangeDate() {
    const startDate = this.data.startDate ? moment(this.data.startDate, 'YYYY-MM-DD') : undefined
    const endDate = this.data.startDate ? moment(this.data.endDate, 'YYYY-MM-DD') : undefined
    return [startDate, endDate] as RangePickerValue
  }

  constructor(props: IProps) {
    super(props)
    const data: IUrlQuery = splitUrl<IUrlQuery>(this.props.location.search) || {}
    this.storeArticle.setList({
      ...data
    })
    this.initList()
    this.state = {
      selectedRowKeys: [],
    }
  }
  public componentDidMount() {
    //
  }
  public render() {
    const data = this.data.data
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (item: any) => {
        this.onSelectChange(item)
      }
    };
    const pagination = {
      current: Number(this.data.page),
      pageSize: Number(this.data.pageSize),
      total: this.data.total,
      onChange: (page: number) => {
        const query: any = { page, pageSize: this.data.pageSize, keyword: this.data.search }
        changeURL(this.props.history, this.props.location, query)
        this.storeArticle.getList({
          page: Number(page),
          pageSize: Number(this.data.pageSize),
          type: this.data.type,
          keyword: this.data.keyword,
          startDate: this.data.startDate,
          endDate: this.data.endDate
        })
      }
    }

    const tabs = [
      { text: ARTICLE_TEXT[ARTICLE_DOING], value: ARTICLE_DOING, changeTab: this.changeTab },
      { text: ARTICLE_TEXT[ARTICLE_FILE], value: ARTICLE_FILE, changeTab: this.changeTab },
      { text: ARTICLE_TEXT[ARTICLE_DISCARD], value: ARTICLE_DISCARD, changeTab: this.changeTab },
    ]
    return (
      <div className="bg-white p-20">
        <ul className="flex-h-flex-start-center">
          {
            tabs.map((item: any) => (
              <li className={`cursor-pointer p-b-20 m-r-20 normal ${ this.data.type === item.value ? 'active': '' }`} key={item.value} onClick={() => item.changeTab(item.value)}>{item.text}</li>
            ))
          }
        </ul>
        <div className="flex-h-flex-start-center">
          <Input.Search style={ { width: 300 } } value={this.data.keyword} className="m-b-20 m-r-20" type="text" placeholder="对标题进行搜索" onChange={this.changeSearch} onSearch={this.search}/>
          <RangePicker className="m-b-20" value={this.rangeDate} onChange={this.changeRangeTime} />
        </div>
        {
          ARTICLE_DOING === this.data.type ? (
            <ArticleDoingTable
              dataSource={data || []}
              rowSelection={rowSelection}
              pagination={pagination}
              onOperation={
                (_id: string, { row, state }: { row: IArticle, state: string }, type: string) => {
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
                  if (type === 'state') {
                    this.onState(_id, row, state)
                  }
                }
              }
            // tableChange={this.tableChange}
            />
          ) : null
        }
        {
          ARTICLE_FILE === this.data.type ? (
            <ArticleFileTable
              dataSource={data || []}
              rowSelection={rowSelection}
              pagination={pagination}
              onOperation={
                (_id: string, { row }: { row: IArticle }, type: string) => {
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
          ) : null
        }
        {
          ARTICLE_DISCARD === this.data.type ? (
            <ArticleDiscardTable
              dataSource={data || []}
              rowSelection={rowSelection}
              pagination={pagination}
              onOperation={
                (_id: string, { row }: { row: IArticle }, type: string) => {
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
          ) : null
        }
      </div>
    );
  }

  private changeSearch = (e: any) => {
    this.storeArticle.setList({
      keyword: e.target.value
    })
  }
  private changeRangeTime = (date: any, dateString: any) => {
    console.log(date, dateString);
    const time = {
      startDate: dateString[0] || '',
      endDate: dateString[1] || ''
    }
    changeURL(this.props.history, this.props.location, time)
    this.storeArticle.getList({
      page: 1,
      pageSize: Number(this.data.pageSize),
      type: this.data.type,
      keyword: this.data.keyword,
      ...time
    })
  }
  private search = (keyword: string) => {
    this.storeArticle.getList({
      page: 1,
      pageSize: Number(this.data.pageSize),
      type: this.data.type,
      startDate: '',
      endDate: '',
      keyword
    })
  }

  private changeTab = (type: string): void => {
    console.log(type)
    changeURL(this.props.history, this.props.location, { type })
    this.storeArticle.setList({
      type,
      keyword: '',
      page: 1
    })
    this.storeArticle.getList({
      page: 1,
      pageSize: Number(this.data.pageSize),
      type: this.data.type,
      startDate: '',
      endDate: '',
      keyword: this.data.keyword
    })
  }

  private onEdit = (_id: string, row: IArticle) => {
    this.props.history.push(`/article-edit/${row._id}`)
  }

  private onDetail = (_id: string, row: IArticle) => {
    this.props.history.push(`/article-detail/${row._id}`)
  }

  private onHistory = (_id: string, row: IArticle) => {
    this.props.history.push(`/article-history/${row._id}`)
  }

  private onDel = (_id: string, row: IArticle) => {
    confirm({
      title: <span> 确定删除 {row.title}</span>,
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

  private onState = (_id: string, row: IArticle, state: string) => {
    confirm({
      title: <span> 确定把 {row.title} 的状态修改为 {state}</span>,
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
      page: this.data.page,
      pageSize: this.data.pageSize,
      type: this.data.type,
      keyword: this.data.keyword,
      startDate: this.data.startDate,
      endDate: this.data.endDate
    })
  }
}
