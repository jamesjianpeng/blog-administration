# play-commander
play commander 弹司令

准备工作
前端环境搭建 1T

第一期
1. 工作台(3T)
2 T 页面
1 T 联调

2. 人员管理(2.5T)
人员列表 1 T
行为管理 .5 T
1 T 联调

3. 专业管理(2T)
2T

4. 订单管理(2T)
2T

5. 琴房管理(4.5T)
全局设置 2.5T
琴房列表 2T

### 菜单接口
```ts
export interface IMenu {
  icon?: string
  title: string
  path: string
  children?: IMenu[]
  disabled?: boolean
  version?: 0 | 1
}

const example = [
      {
        icon: 'appstore',
        path: '/dashboard',
        title: '工作台',
        version: 0
      },
      {
        icon: 'appstore',
        path: 'role',
        title: '角色管理',
        version: 1,
        disabled: true
      },
      {
        children: [
          {
            icon: '',
            path: 'authority-page',
            title: '页面权限',
            version: 1,
            disabled: true
          },
          {
            icon: '',
            path: 'authority-pianoRoom',
            title: '琴房权限',
            version: 1,
            disabled: true
          }
        ],
        icon: 'appstore',
        path: 'authority',
        title: '权限管理',
        version: 1,
        disabled: true
      },
      {
        children: [
          {
            path: 'personnel-list',
            title: '人员列表',
            version: 0
          },
          {
            path: 'personnel-behavior',
            title: '行为管理',
            version: 0
          }
        ],
        icon: 'team',
        path: 'personnel',
        title: '人员管理',
        version: 0
      },
      {
        icon: 'appstore',
        path: 'professional',
        title: '专业管理',
        version: 0
      },
      {
        icon: 'profile',
        path: 'order',
        title: '订单管理',
        version: 0
      },
      {
        children: [
          {
            path: 'pianoRoom-setting',
            title: '全局设置',
            version: 0
          },
          {
            path: 'pianoRoom-list',
            title: '琴房列表',
            version: 0
          }
        ],
        icon: 'appstore',
        path: 'pianoRoom',
        title: '琴房管理',
        version: 0
      },
      {
        icon: 'appstore',
        path: 'schedule',
        title: '排课表',
        version: 1,
        disabled: true
      },
      {
        children: [
          {
            path: 'other-minApp',
            title: '小程序',
            version: 0
          },
          {
            path: 'other-deviceScreen',
            title: '设备屏',
            version: 0
          },
          {
            path: 'other-pianoRoomWarranty',
            title: '琴房报修',
            version: 0
          },
          {
            path: 'other-comment',
            title: '评论管理',
            version: 0
          }
        ],
        icon: 'appstore',
        path: 'other',
        title: '其他管理',
        version: 1,
        disabled: true
      }
    ]
```
------------------------------------------

## 订单管理
### 订单接口
```ts
export interface IOrderListItem {
    sweepMode: string // 扫码方式
    violationRecord: string // 违规记录
    num: string // 订单编号
    classify: string, // 订单分类
    state: string // 订单状态
    pianoRoom: string // '琴房名称'
    time: string// 预约日期
    duration: string // 预约时段
    useTime: string // 使用日期
    useDuration: string // 使用时段
    id: string

    name: string // 名字
    nameNum: string // 学号/工号
    role: string // 角色
    professional: string // '专业'
    grade: string // 年级
    phone: string // 手机

    pianoName: string // 琴房名称
    pianoNum: string // 琴房编号
    pianoClass: string // 琴房分类
    pianoAddress: string // 琴房地址
}
```
------------------------------------------
## 人员管理
### // 人员信息列表接口
```ts
export interface IPersonnelListItem {
  name: string // 名字
  role: string // 角色
  num: number // 学号/工号
  professional: string// 专业
  grade: string // 年级
  score: number // 行为分
  pianoPoint: number // 琴点
  accountState: string // 账号状态
  wx: string // 微信
  six: number // 性别
  birthday: string // 生日
  phone: number // 手机号码
  id: string
}
```
### 人员行为列表接口
```ts
export interface IPersonnelBehaviorItem {
  name: string // 名字
  role: string // 角色
  num: number // 学号/工号
  professional: string// 专业
  grade: string // 年级
  score: number // 行为分
  painoNum: number // 剩余琴点
}
```
------------------------------------------
## 琴房管理-琴房列表
### 琴房列表接口
```ts
export interface IPianoRoomListItem {
  num: string // 琴房编号
  name: string // 琴房名称
  state: string // 琴房状态
  classify: string // 琴房分类
  region: string // 琴房分区
  score: number  // 琴房评分
  evaluation: string // 琴房评价
  lock: boolean // 门锁状态
  address: string // 琴房地址
  accommodatingPopulation: number // 容纳人数
  useNum: number // 使用人数
  instruments: any[] // 琴房乐器
  config: string[] // 琴房配置
  facilities: string[] // 琴房设施
  description: number // 琴房描述
  comment: number // 琴房评价
  id: string
}
```
### 单个琴房-远程控制信息接口
```ts
export interface IAncillaryFacilities {
  atmosphereLamp: 0 | 1 // 气氛灯
  mainLamp: 0 | 1 // 主灯
  temperature: number // 温度
  windSpeed: string // 风速
  pattern: string // 模式
  airEjectorFan: 0 | 1 // 抽风机
  airPurifier: 0 | 1 // 空气净化机
  adress: string // 琴房分区
  num: string // 琴房编号
  airConditioner: 0 | 1 // 空调
}
```

## 琴房管理-全局设置
### 琴房分类列表接口
```
export interface IPianoRoomSettingKinds {
  name: string // 琴房分类名称
  num: number // 琴房数量
}
```

### 琴房分区列表接口
```
export interface IPianoRoomSettingRegion {
  name: string // 琴房分区名称
  num: number // 琴房数量
}
```

### 琴房乐器列表接口
```
export interface IPianoRoomSettingInstrument {
  name: string // 乐器名称
  num: number // 乐器数量
}
```

### 琴房乐器列表接口
```
export interface IPianoRoomSettingConfig {
  name: string // 配置名称
  num: number  // 配置数量
}
```

### 配套设施列表接口
```
export interface IPianoRoomSettingFacility {
  name: string // 设施名称
  num: number // 设施数量
}
```

Command line instructions
You can also upload existing files from your computer using the instructions below.


Git global setup
git config --global user.name "pengjian"
git config --global user.email "jamesjianpeng@gmail.com"

Create a new repository
git clone http://git.ljguo.cn:3000/james/play-commander.git
cd play-commander
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Push an existing folder
cd existing_folder
git init
git remote add origin http://git.ljguo.cn:3000/james/play-commander.git
git add .
git commit -m "Initial commit"
git push -u origin master

Push an existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin http://git.ljguo.cn:3000/james/play-commander.git
git push -u origin --all
git push -u origin --tags


