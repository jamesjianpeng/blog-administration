import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'src/store'
import { STORE_ARTICLE } from 'src/constants'

import { IPropsBase, IMatch } from 'src/interface'
import UploadImg from 'src/components/UploadImg';

interface IProps extends IPropsBase {
  match: IMatch<{ _id: string}>
}

const ArticleDetail = (props: IProps) => {
  const storeArticle = useStores(STORE_ARTICLE)

  React.useEffect(() => {
    const _id = props.match.params._id
    storeArticle.getData(_id)
  }, [props.match.params._id])
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: storeArticle.data.html }} />
      <UploadImg />
    </div>
  );
}

export default observer(ArticleDetail)
