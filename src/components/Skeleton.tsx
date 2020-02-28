import React from 'react'
import { Skeleton } from 'antd'

export const BaseSkeleton = () => {
  return (
    <div style={ {background: '#fff', padding: '10px 10px 30px'} }>
      <Skeleton
        active={ true }
        paragraph={{ rows: 3 }}
      />
      <div className="piano-room_setting-container"/>
      <Skeleton
        active={ true }
        paragraph={{ rows: 4 }}
      />
      <div className="piano-room_setting-container"/>
      <Skeleton
        active={ true }
        paragraph={{ rows: 3 }}
      />
      <div className="piano-room_setting-container"/>
      <Skeleton
        active={ true }
        paragraph={{ rows: 4 }}
      />
      <div className="piano-room_setting-container"/>
    </div>
  )
}
