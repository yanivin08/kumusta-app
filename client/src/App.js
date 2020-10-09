import React from 'react';
import './App.css';
import './components/FontAwesomeIcons'
import StartPage from './components/StartPage'
import Chat from './components/Chat/Chat'

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {

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
