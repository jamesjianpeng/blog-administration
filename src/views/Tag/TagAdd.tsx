import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_TAG } from 'src/constants'
import { IMatch } from 'src/interface'
import { TagStore } from 'src/store'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'

import AddAndEdit from 'src/views/Tag/AddAndEdit'

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
  [STORE_TAG]: TagStore
}

@inject(STORE_TAG)
@observer
export default class ArticleEdit extends React.Component<IProps, any> {


  public render() {
    return (
      <AddAndEdit {...this.props} />
    );
  }
}

