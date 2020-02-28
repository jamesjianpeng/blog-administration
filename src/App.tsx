import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import './normal.css';
import Login from './containers/Login'
import Main from './containers/Main'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={ (props: any) =>  <Login { ...props } />} />
          <Route path="/" component={ (props: any) =>  <Main { ...props } />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
