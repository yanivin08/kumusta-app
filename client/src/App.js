import React from 'react';
import './App.css';
import './components/FontAwesomeIcons'
import StartPage from './components/StartPage'
import Chat from './components/Chat/Chat'

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {

  async componentDidMount(){
    
    console.log('Component did mount.');

    await fetch('/user')
    .then(resp => resp.text())
    .then(data => console.log(data));

    await fetch('/isproduction')
    .then(resp => resp.text())
    .then(data => console.log("is production? "+data));
  }

  render(){
    return (
        <div className="app">
            {/* <StartPage /> */}
            <Router>
              <Route path="/" exact component={StartPage} />
              <Route path="/chat" component={Chat} />
            </Router>
        </div>
    );
  }
}

export default App;
