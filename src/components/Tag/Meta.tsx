import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import { IArticleProps as IProps } from 'src/interface'

const Meta = (props: IProps & FormComponentProps) => {
    const handleSubmit = (e: any) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        if (props.onFinish) {
          props.onFinish(values, 'done')
        }
      })
    }
    const { getFieldDecorator } = props.form;
    return (
      <div className="article-container">
        <div className="article-sub-container">
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
            <Form.Item label="tag标题">
              {getFieldDecorator('text', {
                initialValue: props.data.text,
                rules: [{ required: true, message: '请输入tag标题' }],
              })(<Input placeholder="请输入tag标题" />)}
            </Form.Item>
            <Form.Item label="tag值">
              {getFieldDecorator('value', {
                initialValue: props.data.value,
                rules: [{ required: true, message: '请输入tag值' }],
              })(<Input placeholder="请输入tag值" />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                提交
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}

export default Form.create<IProps & FormComponentProps>()(Meta)
