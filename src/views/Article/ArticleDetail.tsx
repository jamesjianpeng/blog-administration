import React from 'react'
import { observer, inject } from 'mobx-react'
import { ArticleStore } from 'src/store'
import { STORE_ARTICLE } from 'src/constants'

import { IPropsBase, IMatch } from 'src/interface'
// import UploadImg from 'src/components/UploadImg';

interface IProps extends IPropsBase {
  [STORE_ARTICLE]: ArticleStore
  match: IMatch<{ _id: string}>
}
interface IState {
  selectedRowKeys: any
}

@inject(STORE_ARTICLE)
@observer
export default class ArticleDetail extends React.Component<IProps, IState> {
  get storeArticle() {
    return this.props[STORE_ARTICLE]
  }
  public componentDidMount() {
    const _id = this.props.match.params._id
    this.storeArticle.getData(_id)
  }
  public render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.storeArticle.data.html }}>
        {/* <UploadImg /> */}
      </div>
    );
  }
}
