import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import { IArticleProps as IProps } from 'src/interface'

class Meta extends React.Component<IProps & FormComponentProps, any> {
  get form() {
    return this.props.form
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="article-container">
        <div className="article-sub-container">
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
            <Form.Item label="tag标题">
              {getFieldDecorator('text', {
                initialValue: this.props.data.text,
                rules: [{ required: true, message: '请输入tag标题' }],
              })(<Input placeholder="请输入tag标题" />)}
            </Form.Item>
            <Form.Item label="tag值">
              {getFieldDecorator('value', {
                initialValue: this.props.data.value,
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

  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      if (this.props.onFinish) {
        this.props.onFinish(values, 'done')
      }
    })
  }
}

export default Form.create<IProps & FormComponentProps>()(Meta)
