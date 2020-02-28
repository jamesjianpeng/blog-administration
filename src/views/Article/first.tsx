import React from 'react';
import { observer, inject } from 'mobx-react'
import { STORE_ARTICLE } from 'src/constants'
import ArticleStore from 'src/store/article'
import { History, Location } from 'history'
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form'
interface IProps {
  history: History
  location: Location
  [STORE_ARTICLE]: ArticleStore
}

@inject(STORE_ARTICLE)
@observer
class ArticleEdit extends React.Component<IProps & FormComponentProps, any> {

  public componentDidMount() {
    this.props[STORE_ARTICLE].getData()
    this.props[STORE_ARTICLE].getList()
  }

  public render() {
    console.log(this.props[STORE_ARTICLE])
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    const usernameError = isFieldTouched('username') && getFieldError('username');
    return (
      <div> ArticleEdit
      { this.props[STORE_ARTICLE].data.title }
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              placeholder="Username"
            />
          )}
        </Form.Item>
      </div>
    );
  }
}

export default Form.create<IProps & FormComponentProps>()(ArticleEdit)
