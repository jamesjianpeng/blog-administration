
import { STORE_CONFIG, STORE_ARTICLE, STORE_TAG, STORE_PROJECT } from 'src/constants'
import ArticleStore from 'src/store/article'
import ConfigStore from 'src/store/config'
import TagStore from 'src/store/tag'
import ProjectStore from 'src/store/project'
import React from 'react'
import { MobXProviderContext } from 'mobx-react'


const store = {
    [STORE_ARTICLE]: new ArticleStore(),
    [STORE_CONFIG]: new ConfigStore(),
    [STORE_TAG]: new TagStore(),
    [STORE_PROJECT]: new ProjectStore(),
}

export {
  ArticleStore,
  ConfigStore,
  TagStore,
  ProjectStore
}

export const useStores = (name: string) => React.useContext(MobXProviderContext)[name]

export default store
