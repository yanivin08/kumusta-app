import React from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm'

class App extends React.Component {

  async componentDidMount(){
    
    console.log('Component did mount.');

    await fetch('/user/welcome')
    .then(resp => resp.text())
    .then(data => console.log(data));
  }

  render(){
    return (
      <div className="app">
        <div className="container is-fluid">
          <h1 className="title has-text-centered">KUMUSTA - CHAT APP</h1>
          <div className="content" id="content">
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
