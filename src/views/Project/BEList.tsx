// import React from 'react'
// import { ProjectStore } from 'src/store'
// import { STORE_PROJECT } from 'src/constants'
// import { observer, inject } from 'mobx-react'
// import ProjectTable from 'src/components/Table/ProjectTable'
// import { changeURL } from 'src/help/util'
// import { IPropsBase } from 'src/interface'
// import { DatePicker } from 'antd'
// const { RangePicker } = DatePicker

// interface IProps extends IPropsBase {
//   [STORE_PROJECT]: ProjectStore
// }

// @inject(STORE_PROJECT)
// @observer
// export default class FEList extends React.Component<IProps, any> {
//   get storeProject () {
//     return this.props[STORE_PROJECT]
//   }
//   get data () {
//     return this.props[STORE_PROJECT].list
//   }
//   public componentDidMount() {
//     this.storeProject.getList({
//       name: 'blog-server',
//       page: 1,
//       pageSize: 10
//     })
//   }
//   public render () {
//     console.log(this.props[STORE_PROJECT].list)
//     const pagination = {
//       current: Number(this.data.page),
//       pageSize: Number(this.data.pageSize),
//       total: this.data.total,
//       onChange: (page: number) => {
//         const query: any = { page, pageSize: this.data.pageSize, name: 'blog-server' }
//         changeURL(this.props.history, this.props.location, query)
//         this.storeProject.getList({
//           page: Number(page),
//           pageSize: Number(this.data.pageSize),
import React from 'react'
import { IPropsBase as IProps } from 'src/interface'
import ProjectList from 'src/views/Project/ProjectList'


const FEList = (props: IProps): React.ComponentElement<any, any> => (<ProjectList {...props} name={'blog-server'} />)

export default FEList
