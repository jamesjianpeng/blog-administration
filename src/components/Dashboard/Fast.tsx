import React from 'react'
import { Card, Icon, Modal, Checkbox, message } from 'antd';
import { History } from 'history'
import './Card.css'

const FastList: any[] = [
  {
    default: true,
    name: "新增人员",
    path: '/personnel-list-detail?type=add'
  },
  {
    default: true,
    name: "新增琴房",
    path: '/pianoRoom-list-detail?ype=add'
  },
  {
    default: true,
    name: "远程开门",
    path: ''
  },
  {
    default: true,
    name: "远程控制",
    path: ''
  },
  {
    default: true,
    name: "查看订单",
    path: '/order'
  },
  {
    default: false,
    name: "查看课表",
    path: ''
  },
  {
    default: false,
    name: "修改公告",
    path: ''
  },
  {
    default: false,
    name: "新增演出",
    path: ''
  },
  {
    default: true,
    name: "报修处理",
    path: ''
  },
  {
    default: true,
    name: "回复评论",
    path: ''
  },
  {
    default: false,
    name: "接听呼救",
    path: ''
  },
  {
    default: false,
    name: "接听呼叫",
    path: ''
  }
].map((item: any) => {
  item.checked = !!item.default
  return item
})

interface IStates {
  selectedList: any[]
  allList: any[]
  selectedListTmp: any[]
  visible: boolean
}

interface IProps {
  history: History
}

export class Fast extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props)
    this.state = {
      selectedList: FastList.filter((item: any) => item.default),
      allList: FastList,
      visible: false,
      selectedListTmp: []
    }
  }
  public render() {
    return (
      <div className="dynamic-card">
        <Card title="快捷开始/便捷服务" bordered={false}>
          <div>
              {
                this.state.selectedList.map((item: any, index: number) => (
                  <span className="fast-item" onClick={ () => { this.pushNew(item) } } key={ index }> { item.name } </span>
                ))
              }
              <span className="fast-item_add flex-h-center fast-item" onClick={ () => { this.showModal() } }>
                <Icon style={ { marginRight: '10px' } } type="plus" />添加
              </span>
          </div>
        </Card>
        <Modal
          title="添加功能"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="fast-item_modal-container"
        >
         {
           this.state.allList.map((item: any) => (
             <span className="fast-item_modal" key={ item.name }>
              <Checkbox
                checked={ item.checked }
                disabled={item.disabled}
                onChange={() => { this.allListChange(item) }}
              >
                { item.name }
              </Checkbox>
            </span>
           ))
         }
        </Modal>
      </div>
    )
  }

  private allListChange = (it: any) => {

    const allList: any[] = JSON.parse(JSON.stringify(this.state.allList)).map((item: any) => {
      if (item.name === it.name) {
        item.checked = !item.checked
      }
      return item
    })

    const selectedListTmp: any[] = allList.filter((item: any) => item.checked)

    if (selectedListTmp.length > 7) {
      message.warning('快捷功能最多添加 7 个')
      return
    }
    this.setState({
      allList,
      selectedListTmp
    })
  };
  private showModal = () => {
    this.setState({
      visible: true,
      selectedListTmp:  this.state.allList.filter((item: any) => item.checked)
    });
  };

  private handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
      selectedList: this.state.selectedListTmp
    });
  };

  private pushNew = (item: any) => {
    this.props.history.push(item.path)
  };

  private handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
      selectedListTmp: []
    });
  };
}
