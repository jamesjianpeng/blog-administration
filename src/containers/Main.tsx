import { Button, Popover, Icon, Layout, Avatar } from 'antd';
import { Location, History } from 'history'
import React, { lazy, Suspense } from 'react';
import { BaseSkeleton } from 'src/components/Skeleton'
import $ from 'jquery'
import { Route, Switch } from "react-router-dom";
import Index from 'src/views/Index'
// import { getMenuList } from 'src/help/main'
import ConfigStore from 'src/store/config'
import { STORE_CONFIG } from 'src/constants'
import { observer, inject } from 'mobx-react'

import { BreadcrumbIndex } from 'src/components/Breadcrumb'
import { MenuIndex } from 'src/components/Menu'
import { IMenu } from 'src/interface'
import Watermark from 'src/components/Watermark'
import './Main.css'

const { Sider, Content, Header } = Layout;
const ArticleEdit = lazy(() => import('src/views/Article/ArticleEdit'))
const ArticleAdd = lazy(() => import('src/views/Article/ArticleAdd'))
const ArticleList = lazy(() => import('src/views/Article/ArticleList'))
const History = lazy(() => import('src/views/Article/History'))
const ArticleDetail = lazy(() => import('src/views/Article/ArticleDetail'))
const TagList = lazy(() => import('src/views/Tag/TagList'))
const TagEdit = lazy(() => import('src/views/Tag/TagEdit'))
const TagAdd = lazy(() => import('src/views/Tag/TagAdd'))
const FEList = lazy(() => import('src/views/Project/FEList'))
const BEList = lazy(() => import('src/views/Project/BEList'))
interface IStates {
  collapsed: boolean
  menu: IMenu[]
  selectedKey: string[],
  openKey: string[]
}

interface IProps {
  history: History
  location: Location
  [STORE_CONFIG]: ConfigStore
}

class MainRouter extends React.PureComponent<any, any> {
  public render() {
    return (
      <div>
        <Watermark />
        <Switch>
          <Route
            path="/article-list"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><ArticleList {...props} /></Suspense>)}
          />
          <Route
            path="/article-history/:_id"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><History {...props} /></Suspense>)}
          />
          <Route
            path="/article-edit/:_id"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><ArticleEdit {...props} /></Suspense>)}
          />
          <Route
            path="/article-add"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><ArticleAdd {...props} /></Suspense>)}
          />
          <Route
            path="/article-detail/:_id"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><ArticleDetail {...props} /></Suspense>)}
          />
          <Route
            path="/tag-list"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><TagList {...props} /></Suspense>)}
          />
          <Route
            path="/tag-edit/:_id"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><TagEdit {...props} /></Suspense>)}
          />
          <Route
            path="/tag-add"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><TagAdd {...props} /></Suspense>)}
          />
          <Route
            path="/project-FE"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><FEList {...props} /></Suspense>)}
          />
          <Route
            path="/project-BE"
            component={(props: any) => (<Suspense fallback={<BaseSkeleton />}><BEList {...props} /></Suspense>)}
          />
          <Route exact={true} path="/" component={(props: any) => <Index {...props} />} />
        </Switch>
      </div>
    )
  }
}
@inject(STORE_CONFIG)
@observer
class Main extends React.PureComponent<IProps, IStates> {
  get storeConfig() {
    return this.props[STORE_CONFIG]
  }

  constructor(props: any) {
    super(props)
    this.state = {
      collapsed: false,
      menu: [],
      openKey: [],
      selectedKey: []
    }
    // getMenuList({ role: 'xx' }).then((res: any) => {
    //   this.setState({
    //     menu: res.data
    //   })
    //   // getProfessionalList()
    // })
  }
  public componentDidMount() {
    this.storeConfig.getMenus()
  }
  public componentWillReceiveProps(nextProps: IProps) {
    if (this.props.location !== nextProps.location) {
      $('#main-container_srcoll-top').animate({ scrollTop: 0 }, 100);
      window.scrollTo(0, 0)
    }
  }

  public render() {
    return (
      <React.Fragment>

        <Layout style={{ height: '100%' }}>
          <Sider width="230px" className="sider-container" collapsed={this.state.collapsed}>
            <MenuIndex path={this.props.location.pathname} menu={ this.storeConfig.menus } collapsed={this.state.collapsed} history={this.props.history} location={this.props.location} />
          </Sider>
          <Layout id="main-container_srcoll-top">
            <Header style={{ background: '#fff' }}>
              <div>
                <Button type="link" onClick={this.toggleCollapsed} style={{ paddingLeft: '20px' }}>
                  <Icon style={{ color: '#333' }} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                {['/', '/dashboard'].indexOf(this.props.location.pathname) > -1 ? '' : <BreadcrumbIndex path={this.props.location.pathname} menu={this.storeConfig.menus} />}
                <div className="user-info">
                  <Icon style={{ fontSize: '16px' }} type="search" />
                  <Icon className="header-user_bell" type="bell" />
                  <span>
                    <Popover content={
                      <React.Fragment>
                        <div onClick={() => { this.props.history.push('/login') }} >
                          退出登陆
                    </div>
                      </React.Fragment>
                    }>
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      <span className="header-user_text"> {'用户名'} </span>
                    </Popover>
                  </span>
                </div>
              </div>
            </Header>
            <Content>
              <div style={{ padding: '20px', height: '100%' }}>
                <div style={{ height: '100%' }}>
                  <MainRouter />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }

  private toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
}

export default Main;
