
import { STORE_CONFIG, STORE_ARTICLE, STORE_TAG } from 'src/constants'
import ArticleStore from 'src/store/article'
import ConfigStore from 'src/store/config'
import TagStore from 'src/store/tag'

const store = {
    [STORE_ARTICLE]: new ArticleStore(),
    [STORE_CONFIG]: new ConfigStore(),
    [STORE_TAG]: new TagStore(),
}

export {
  ArticleStore,
  ConfigStore,
  TagStore
}
export default store
