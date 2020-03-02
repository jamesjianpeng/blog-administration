import React from 'react'
import { Menu, Icon } from 'antd'
import { History, Location } from 'history'
import './Menu.css'
import dashboard from 'src/images/icon/dashboard.png'
import role from 'src/images/icon/role.png'
import authority from 'src/images/icon/authority.png'
import personnel from 'src/images/icon/personnel.png'
import professional from 'src/images/icon/professional.png'
import order from 'src/images/icon/order.png'
import pianoRoom from 'src/images/icon/pianoRoom.png'
import schedule from 'src/images/icon/schedule.png'

const { SubMenu } = Menu

export interface IMenu {
  icon?: string
  title: string
  path: string
  children?: IMenu[]
  disabled?: boolean
  version?: 0 | 1
}
interface IProps {
  path: string
  menu: IMenu[]
  history: History
  location: Location
  collapsed: boolean
}
interface IState {
  openKey: string[]
  // openKeyTmp: string[]
  selectedKey: string[]
  sign: string
}


export class MenuIndex extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      openKey: [],
      selectedKey: [],
      sign: ''
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { openKey, selectedKey } = this.initKeys(nextProps.path, nextProps.menu)
    this.setState({
      openKey,
      selectedKey
    })
    console.log(this.props)
    if (!this.state.sign) {
      this.setState({
        sign: '1'
      })
      return
    }
    if (nextProps.collapsed) {
      this.setState({
        openKey: []
      })
    } else {
      this.setState({
        openKey
      })
    }
  }

  public render() {
    return (
      <div>
      <h1 style={{ height: '64px', padding: 0, margin: 0 }}> logo </h1>
      <Menu
        defaultOpenKeys={this.state.openKey}
        defaultSelectedKeys={this.state.selectedKey}
        openKeys={this.state.openKey}
        selectedKeys={this.state.selectedKey}
        mode="inline"
        theme="dark"
      >
        {
          this.props.menu && this.props.menu.map((item: IMenu) => this.renderMenuItem(item))
        }
      </Menu>
      </div>
    )
  }
  private menuNavigate = (item: IMenu) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(item.path)
  }

  private renderMenuItem = (item: IMenu): React.ReactNode => {
    if (item.disabled) {
      return null
    }
    if (item.children && Array.isArray(item.children)) {
      return (
        <SubMenu
          key={item.title}
          onTitleClick={() => { this.onTitleClick(item) }}
          title={
            <React.Fragment>
              <Icon component={() => this.getIcon(item.title)} />
              <span>{item.title}</span>
            </React.Fragment>
          }
        >
          {item.children.map((it: any) => this.renderMenuItem(it))}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.title} onClick={() => this.menuNavigate(item)}>
          <Icon component={() => this.getIcon(item.title)} />
          <span>{item.title}</span>
        </Menu.Item>
      )
    }
  }
  private onTitleClick(it: IMenu) {
    let { openKey } = this.initKeys(it.path, this.props.menu)
    if (this.state.openKey.indexOf(openKey[0]) > -1) {
      openKey = []
    }
    this.setState({
      openKey: [...openKey],
    })
  }

  private getIcon = (icon: string): any => {
    const style = { width: '16px', marginRight: '8px' }
    const iconNode: { [icon: string]: React.ReactNode } = {
      '工作台': <img style={style} src={dashboard} alt="" />,
      '角色管理': <img style={style} src={role} alt="" />,
      '权限管理': <img style={style} src={authority} alt="" />,
      '人员管理': <img style={style} src={personnel} alt="" />,
      '架构管理': <img style={{ width: '18px', marginRight: '8px' }} src={professional} alt="" />,
      '订单管理': <img style={style} src={order} alt="" />,
      '标签管理': <img style={style} src={pianoRoom} alt="" />,
      '文章管理': <img style={style} src={schedule} alt="" />,
      '其他管理': <img style={style} src={dashboard} alt="" />
    }
    return iconNode[icon] || <img style={{ display: 'none' }} />
  }

  private initKeys = (path: string, menu: any) => {
    let p = path.replace(/^\//, '')
    p = p.includes('/') ? p.split('/')[0] : p
    const paths: string[] = p ? p.split('-') : ['/']
    const first: IMenu | undefined = menu.find((item: IMenu): boolean => item.path.replace(/^\//, '') === paths[0])
    const k = [first ? first.title : '']
    let s: string[] = []
    if (first && first.children) {
      const secode: IMenu | undefined = first.children.find((item: IMenu): boolean => item.path.replace(/^\//, '') === p.replace('-detail', ''))
      s = [secode ? secode.title : '']
    } else {
      s = [first ? first.title : '']
    }
    return {
      openKey: k,
      selectedKey: s
    }
  }
}


