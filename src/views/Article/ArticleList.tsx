import React from 'react';
import { Modal, Input, DatePicker, Tag } from 'antd'
import { useStores } from 'src/store'
import { STORE_ARTICLE, STORE_TAG, ARTICLE_DOING, ARTICLE_DISCARD, ARTICLE_FILE, ARTICLE_TEXT } from 'src/constants'
import { IPropsBase as IProps, IArticle } from 'src/interface'
import { IUrlQuery } from 'src/help/request'
import { splitUrl } from 'src/help/util'
import { observer } from 'mobx-react'
import ArticleDoingTable from 'src/components/Table/ArticleDoingTable'
import ArticleDiscardTable from 'src/components/Table/ArticleDiscardTable'
import ArticleFileTable from 'src/components/Table/ArticleFileTable'
import moment from 'moment'
import { changeURL } from 'src/help/util'
import { ITag } from '@smartblog/models';
const { confirm } = Modal
const { RangePicker } = DatePicker

export type RangePickerValue = undefined[] | [moment.Moment] | [undefined, moment.Moment] | [moment.Moment, undefined] | [moment.Moment, moment.Moment];

interface IState {
  selectedRowKeys: any
}

const ArticleList = (props: IProps) => {
  const [state, setState] = React.useState<IState>({ selectedRowKeys: [] })

  const storeArticle = useStores(STORE_ARTICLE)
  const storeTag = useStores(STORE_TAG)

  React.useEffect(() => {
    const params: IUrlQuery = splitUrl<IUrlQuery>(props.location.search) || {}
    storeArticle.setList({
      ...params
    })
    initList()
    storeTag.getList()
  }, [storeArticle.list.type])

  const initList = () => {
    storeArticle.getList({
      page: storeArticle.list.page,
      pageSize: storeArticle.list.pageSize,
      type: storeArticle.list.type,
      keyword: storeArticle.list.keyword,
      startDate: storeArticle.list.startDate,
      endDate: storeArticle.list.endDate,
      tag: storeArticle.list.tag
    })
  }

  const rangeDate = () => {
    const startDate = storeArticle.list.startDate ? moment(storeArticle.list.startDate, 'YYYY-MM-DD') : undefined
    const endDate = storeArticle.list.startDate ? moment(storeArticle.list.endDate, 'YYYY-MM-DD') : undefined
    return [startDate, endDate] as RangePickerValue
  }

  const changeSearch = (e: any) => {
    storeArticle.setList({
      keyword: e.target.value
    })
  }

  const changeRangeTime = (date: any, dateString: any) => {
    const time = {
      startDate: dateString[0] || '',
      endDate: dateString[1] || ''
    }
    changeURL(props.history, props.location, time)
    storeArticle.getList({
      page: 1,
      pageSize: Number(storeArticle.list.pageSize),
      type: storeArticle.list.type,
      keyword: storeArticle.list.keyword,
      ...time
    })
  }

  const search = (keyword: string) => {
    changeURL(props.history, props.location, {
      keyword,
      startDate: '',
      endDate: '',
      tag: '',
      page: 1,
      pageSize: Number(storeArticle.list.pageSize)
    })
    storeArticle.getList({
      page: 1,
      pageSize: Number(storeArticle.list.pageSize),
      type: storeArticle.list.type,
      startDate: '',
      endDate: '',
      keyword,
      tag: ''
    })
  }

  const changeTag = (tag: ITag) => {
    changeURL(props.history, props.location, { tag: tag.value })
    storeArticle.getList({
      page: 1,
      pageSize: Number(storeArticle.list.pageSize),
      type: storeArticle.list.type,
      startDate: storeArticle.list.startDate,
      endDate: storeArticle.list.endDate,
      keyword: storeArticle.list.keyword,
      tag: tag.value
    })
  }

  const changeTab = (type: string): void => {
    changeURL(props.history, props.location, { type })
    storeArticle.setList({
      type,
      keyword: '',
      page: 1
    })
    storeArticle.getList({
      page: 1,
      pageSize: Number(storeArticle.list.pageSize),
      type: storeArticle.list.type,
      startDate: '',
      endDate: '',
      keyword: storeArticle.list.keyword
    })
  }

  const onEdit = (_id: string, row: IArticle) => {
    props.history.push(`/article-edit/${row._id}`)
  }

  const onDetail = (_id: string, row: IArticle) => {
    props.history.push(`/article-detail/${row._id}`)
  }

  const onHistory = (_id: string, row: IArticle) => {
    props.history.push(`/article-history/${row._id}`)
  }

  const onDel = (_id: string, row: IArticle) => {
    confirm({
      title: <span> 确定删除 {row.title}</span>,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        storeArticle.deleteData(row._id).then(() => {
          initList()
        })
      },
      onCancel: () => {
        console.log('Cancel');
      }
    })
  }

  const onState = (_id: string, row: IArticle, status: string) => {
    confirm({
      title: <span> 确定把 {row.title} 的状态修改为 {status}</span>,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        storeArticle.deleteData(row._id).then(() => {
          initList()
        })
      },
      onCancel: () => {
        console.log('Cancel');
      }
    })
  }

  const onSelectChange = (selectedRowKeys: any) => {
    setState({ selectedRowKeys });
  }

  const data = storeArticle.list.data

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (item: any) => {
      onSelectChange(item)
    }
  }

  const pagination = {
    current: Number(storeArticle.list.page),
    pageSize: Number(storeArticle.list.pageSize),
    total: storeArticle.list.total,
    onChange: (page: number) => {
      const query: any = { page, pageSize: storeArticle.list.pageSize, keyword: storeArticle.list.search }
      changeURL(props.history, props.location, query)
      storeArticle.getList({
        page: Number(page),
        pageSize: Number(storeArticle.list.pageSize),
        type: storeArticle.list.type,
        keyword: storeArticle.list.keyword,
        startDate: storeArticle.list.startDate,
        endDate: storeArticle.list.endDate,
        tag: storeArticle.list.tag
      })
    }
  }

  const tabs = [
    { text: ARTICLE_TEXT[ARTICLE_DOING], value: ARTICLE_DOING, changeTab },
    { text: ARTICLE_TEXT[ARTICLE_FILE], value: ARTICLE_FILE, changeTab },
    { text: ARTICLE_TEXT[ARTICLE_DISCARD], value: ARTICLE_DISCARD, changeTab },
  ]

  return (
    <div className="bg-white p-20">
      <ul className="flex-h-flex-start-center">
        {
          tabs.map((item: any) => (
            <li className={`cursor-pointer p-b-20 m-r-20 normal ${storeArticle.list.type === item.value ? 'active' : ''}`} key={item.value} onClick={() => item.changeTab(item.value)}>{item.text}</li>
          ))
        }
      </ul>
      <div className="flex-h-flex-start-center">
        <Input.Search style={{ width: 300 }} value={storeArticle.list.keyword} className="m-b-20 m-r-20" type="text" placeholder="对标题进行搜索" onChange={changeSearch} onSearch={search} />
      </div>
      <div className="flex-h-flex-start-center">
        <RangePicker className="m-b-20" value={rangeDate()} onChange={changeRangeTime} />
        <div className="m-l-20">
          {
            storeTag.list.data && storeTag.list.data.map((item: ITag) => {
              return (<Tag
                key={item.value}
                onClick={() => changeTag(item)}
                className="m-b-20"
                color={(storeArticle.list.tag && item.value && storeArticle.list.tag === item.value) ||
                  (!storeArticle.list.tag && !item.value) ?
                  '#333' :
                  '#999'}>{item.text}</Tag>)
            })
          }
        </div>
      </div>
      {
        ARTICLE_DOING === storeArticle.list.type ? (
          <ArticleDoingTable
            dataSource={data || []}
            rowSelection={rowSelection}
            pagination={pagination}
            onOperation={
              (_id: string, { row, status }: { row: IArticle, status: string }, type: string) => {
                if (type === 'edit') {
                  onEdit(_id, row)
                }
                if (type === 'detail') {
                  onDetail(_id, row)
                }
                if (type === 'history') {
                  onHistory(_id, row)
                }
                if (type === 'del') {
                  onDel(_id, row)
                }
                if (type === 'state') {
                  onState(_id, row, status)
                }
              }
            }
          />
        ) : null
      }
      {
        ARTICLE_FILE === storeArticle.list.type ? (
          <ArticleFileTable
            dataSource={data || []}
            rowSelection={rowSelection}
            pagination={pagination}
            onOperation={
              (_id: string, { row }: { row: IArticle }, type: string) => {
                if (type === 'edit') {
                  onEdit(_id, row)
                }
                if (type === 'detail') {
                  onDetail(_id, row)
                }
                if (type === 'history') {
                  onHistory(_id, row)
                }
                if (type === 'del') {
                  onDel(_id, row)
                }
              }
            }
          />
        ) : null
      }
      {
        ARTICLE_DISCARD === storeArticle.list.type ? (
          <ArticleDiscardTable
            dataSource={data || []}
            rowSelection={rowSelection}
            pagination={pagination}
            onOperation={
              (_id: string, { row }: { row: IArticle }, type: string) => {
                if (type === 'edit') {
                  onEdit(_id, row)
                }
                if (type === 'detail') {
                  onDetail(_id, row)
                }
                if (type === 'history') {
                  onHistory(_id, row)
                }
                if (type === 'del') {
                  onDel(_id, row)
                }
              }
            }
          />
        ) : null
      }
    </div>
  );
}

export default observer(ArticleList)
