import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
import { IArticleProps, IConfig } from 'src/interface'
const { Option } = Select

interface  IProps extends IArticleProps {
  tags: IConfig[]
}
const Meta = (props: IProps & FormComponentProps) =>  {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      if (props.onFinish) {
        props.onFinish(values, 'next')
      }
    })
  }
  const { getFieldDecorator } = props.form;
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
      <Form.Item label="文章标题">
        {getFieldDecorator('title', {
          initialValue: props.data.title,
          rules: [{ required: true, message: '请输入文章标题' }],
        })( <Input placeholder="请输入文章标题" />)}
      </Form.Item>
      <Form.Item label="标签">
        {getFieldDecorator('tag', {
          initialValue: props.data.tag,
          rules: [{ required: true, message: '请选择标签' }],
        })(
          <Select
            placeholder="请选择标签"
            mode="multiple"
          >
            {
              props.tags.map((it: IConfig) => <Option key={ it.value } value={it.value}>{ it.text }</Option>)
            }
          </Select>,
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create<IProps & FormComponentProps>()(Meta)
