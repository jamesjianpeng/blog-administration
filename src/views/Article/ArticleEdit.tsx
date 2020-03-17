import React from 'react';
import { observer } from 'mobx-react'
import { IMatch } from 'src/interface'
import { History, Location } from 'history'
import 'src/views/Article/articleEdit.css'
import AddAndEdit from 'src/views/Article/AddAndEdit'

interface IProps {
  history: History
  location: Location
  match: IMatch<{ _id: string}>
}

const ArticleEdit = (props: IProps) => {
  return (
    <AddAndEdit {...props} />
  );
}

export default observer(ArticleEdit)
