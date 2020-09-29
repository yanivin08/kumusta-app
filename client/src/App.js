import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends React.Component {

  async componentDidMount(){
    
    console.log('Component did mount.');

    await fetch('/user')
    .then(resp => resp.text())
    .then(data => console.log(data));
  }

  render(){
    return (
      <div className="app">
        <h1 className="title">KUMUSTA - CHAT APP</h1>
        <div className="container">
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default App;
