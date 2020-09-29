import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {

  async componentDidMount(){
    
    console.log('Component did mount.');

    await fetch('/user')
    .then(resp => resp.text())
    .then(data => console.log(data));
  }

  render(){
    return (
      <Provider store={store}>
        <div className="app">
          <h1 className="title">KUMUSTA - CHAT APP</h1>
          <div className="container">
            <RegisterForm />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
