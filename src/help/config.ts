import { handleObj } from 'src/help/util'
export const strutsConfig = {
  "NORMAL": '正常',
  "REPAIR": "正在维修"
}

export const strutsConfigFilter = handleObj(strutsConfig)

export const roomTypeConfig = {
  "WISDOM": '智慧',
  "NORMAL": "普通房"
}
export const roomTypeConfigFilter = handleObj(roomTypeConfig)

export const accountTypeConfig = {
  "STUDENT": '学生',
  "TEACHER": "老师"
}
export const accountTypeConfigFilter = handleObj(accountTypeConfig)

export const subscribeStatusConfig = {
  'END': '正常使用',
  'CANCEL': '已取消',
  'AUTO_CANCEL': '自动签退',
  'TICKET_TO': '改签'
}
export const subscribeStatusConfigFilter = handleObj(subscribeStatusConfig)


export const roomStateConfig = {
  '0': "非开放时间",
  "1": "空闲状态",
  "2": "正在使用中",
  "3": "暂时离开",
  "any": "预约迟到"
}
export const roomStateConfigFilter = handleObj(roomStateConfig)

export const lockOnOffConfig = {
  '0': "已关门",
  "1": "已开门"
}
export const onOffConfig = {
  '0': "关",
  "1": "开"
}
export const lockOnOffConfigFilter = handleObj(lockOnOffConfig)

/**
 * @description 设置模式
 */
export const airModeConfig = {
  "8": "自动",
  "3": "制冷",
  "1": "制热",
  "7": "通风",
  "9": "抽湿"
}
/**
 * @description 空调风速
 */
export const airSetWindLevelConfig = {
  "0": "自动",
  "5": "高速",
  "3": "中速",
  "1": "低速"
}

