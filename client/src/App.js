import React from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm'
//import { Provider } from 'react-redux';
//import store from './store';

class App extends React.Component {

  async componentDidMount(){
    
    console.log('Component did mount.');

    await fetch('/user/welcome')
    .then(resp => resp.text())
    .then(data => console.log(data));
  }

  render(){
    return (
<<<<<<< HEAD
      //<Provider store={store}>
        <div className="app">
          <h1 className="title">KUMUSTA - CHAT APP</h1>
          <div className="container">
=======
      <div className="app">
        <div className="container is-fluid">
          <h1 className="title has-text-centered">KUMUSTA - CHAT APP</h1>
          <div className="content" id="content">
>>>>>>> 43049a8add11d668f47b9eececfc491d7bd6cc72
            <RegisterForm />
          </div>
        </div>
      //</Provider>
    );
  }
}

export default App;
