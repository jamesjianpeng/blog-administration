import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_ARTICLE, STORE_CONFIG } from 'src/constants'
import { IMatch } from 'src/interface'
import { ArticleStore, ConfigStore } from 'src/store'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'
import AddAndEdit from 'src/views/Article/AddAndEdit'

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
  [STORE_ARTICLE]: ArticleStore
  [STORE_CONFIG]: ConfigStore
}

@inject(STORE_ARTICLE)
@observer
export default class ArticleEdit extends React.Component<IProps, any> {



  public componentDidMount() {
    this.props[STORE_ARTICLE].setData()
  }

  public render() {
    return (
      <AddAndEdit {...this.props} />
    );
  }
}

