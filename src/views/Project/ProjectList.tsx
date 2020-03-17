import React from 'react'
import { useStores } from 'src/store'
import { STORE_PROJECT } from 'src/constants'
import { observer } from 'mobx-react'
import ProjectTable from 'src/components/Table/ProjectTable'
import { changeURL } from 'src/help/util'
import { IPropsBase } from 'src/interface'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

interface IProps extends IPropsBase {
  name?: string
}

const FEList = (props: IProps) => {
    const storeProject = useStores(STORE_PROJECT)
    React.useEffect(() => {
      storeProject.getList({
        name: props.name,
        page: 1,
        pageSize: 10
      })
    }, [storeProject.list.page])

    const pagination = {
      current: Number(storeProject.list.page),
      pageSize: Number(storeProject.list.pageSize),
      total: storeProject.list.total,
      onChange: (page: number) => {
        const query: any = { page, pageSize: storeProject.list.pageSize, name: props.name }
        changeURL(props.history, props.location, query)
        storeProject.getList({
          page: Number(page),
          pageSize: Number(storeProject.list.pageSize),
          startDate: storeProject.list.startDate,
          endDate: storeProject.list.endDate,
          name: props.name
        })
      }
    }

    const changeRangeTime = (date: any, dateString: any) => {
      console.log(date, dateString);
      const time = {
        startDate: dateString[0] || '',
        endDate: dateString[1] || ''
      }
      changeURL(props.history, props.location, time)
      storeProject.getList({
        page: 1,
        pageSize: Number(storeProject.list.pageSize),
        ...time
      })
    }

    return (
      <div className="bg-white p-20">
        <RangePicker className="m-b-20"  onChange={changeRangeTime} />
        <ProjectTable
          dataSource={ storeProject.list && storeProject.list.data }
          pagination={ pagination }
        />
      </div>
    )
}

export default observer(FEList)
