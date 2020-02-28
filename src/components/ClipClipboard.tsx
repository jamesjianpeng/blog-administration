import React from 'react'
import { message, Modal, Button } from 'antd'
import clipboard from 'clipboard-polyfill'

interface IProps {
    content: string | string[]
    type?: 'text' | 'link'
    text?: string
    color?: string
}
export default (props: IProps) => {
    const clipboardEvent = async () => {
        if (!props.content) {
          return
        }
        try {
            const str: string = !Array.isArray(props.content) ? props.content : props.content.join(' \n ')
            await clipboard.writeText(str)
            if (!Array.isArray(props.content)) {
                message.success(props.content + ' 复制成功!')
            } else {
                Modal.success({
                    title: `${ props.content.length } 个链接，复制成功`,
                    content: props.content.join(' \n '),
                  });
            }
        } catch (e) {
            message.warning(e.toString())
        }
    }
    return (
      props.type === 'link' ? (
        <Button
        type={props.type}
        className="button_normal"
        onClick={() => { clipboardEvent() }}
    >
        {props.text || '复制'}
    </Button>
      ) : <span className="copy_normal" onClick={() => { clipboardEvent() }}> {props.text || '——'} </span>
    )
}
