import React from 'react';
import './App.css';
import './components/FontAwesomeIcons'
import StartPage from './components/StartPage'

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
            <StartPage />
        </div>
    );
  }
}

export default App;
