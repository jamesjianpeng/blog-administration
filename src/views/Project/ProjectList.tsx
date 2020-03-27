import React from 'react'
import { useStores } from 'src/store'
import { STORE_PROJECT } from 'src/constants'
import { observer } from 'mobx-react'
import ProjectTable from 'src/components/Table/ProjectTable'
import { changeURL } from 'src/help/util'
import { IPropsBase } from 'src/interface'
import { DatePicker, Spin } from 'antd'
const { RangePicker } = DatePicker

interface IProps extends IPropsBase {
  name?: string
}

const FEList = (props: IProps) => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const storeProject = useStores(STORE_PROJECT)
    
    React.useEffect(() => {
      storeProject.getList({
        name: props.name,
        page: storeProject.list.page,
        pageSize: storeProject.list.pageSize
      }).then(() => {
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }, [storeProject.list.page])

    const pagination = {
      current: Number(storeProject.list.page),
      pageSize: Number(storeProject.list.pageSize),
      total: storeProject.list.total,
      onChange: (page: number) => {
        const query: any = { page, pageSize: storeProject.list.pageSize, name: props.name }
        changeURL(props.history, props.location, query)
        setLoading(true)
        storeProject.getList({
          page: Number(page),
          pageSize: Number(storeProject.list.pageSize),
          startDate: storeProject.list.startDate,
          endDate: storeProject.list.endDate,
          name: props.name
        }).then(() => {
          setLoading(false)
        }).catch(() => {
          setLoading(false)
        })
      }
    }

    const changeRangeTime = (date: any, dateString: any) => {
      const time = {
        startDate: dateString[0] || '',
        endDate: dateString[1] || ''
      }
      changeURL(props.history, props.location, time)
      setLoading(true)
      storeProject.getList({
        name: props.name,
        page: 1,
        pageSize: Number(storeProject.list.pageSize),
        ...time
      }).then(() => {
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }

    return (
      <Spin spinning={loading}>
      <div className="bg-white p-20">
        <RangePicker className="m-b-20"  onChange={changeRangeTime} />
        <ProjectTable
          dataSource={ storeProject.list && storeProject.list.data }
          pagination={ pagination }
        />
      </div>
      </Spin>
    )
}

export default observer(FEList)
