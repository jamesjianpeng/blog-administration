import React from 'react';
import { Button, Input, Tooltip, Icon } from 'antd'
import './login.css'
import { History } from 'history'
import Footer from 'src/components/Footer'

interface IProps {
  history: History
}
class Login extends React.Component<IProps, any> {
  public render() {
    return (
      <div className="login-container">
        <div className="login-container_body">
          <div className="login">
              <div className="login-inner">
                <div className="login-input-item-contianer">
                  <div className="login-input-item">
                    <Input
                      placeholder="账号"
                      prefix={
                        <Tooltip title="Extra information">
                          <Icon type="user" />
                        </Tooltip>
                      }
                    />
                  </div>
                  <div className="login-input-item">
                    <Input.Password
                      placeholder="密码"
                      prefix={
                        <Tooltip title="Extra information">
                          <Icon type="lock" />
                        </Tooltip>
                      }
                    />
                    </div>
                </div>

                <div className="login-button">
                  <Button style={{ 'width': '100%' }} type="primary" onClick={() => { this.login() }}>登陆</Button>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  private login() {
    this.props.history.push('/')
  }
}

export default Login;
