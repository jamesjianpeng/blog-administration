import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Provider } from 'mobx-react'
import store from 'src/store'

ReactDOM.render(
  (
    <Provider {...store}>
      <ConfigProvider locale={zh_CN}>
        <App />
      </ConfigProvider>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
