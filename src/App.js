import React, { Component } from 'react';
import './App.css';
import Main from './components/main-content.js';
import Sidebar from './components/sidebar.js';
import Banner from './components/banner.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="app">
        <Banner />
        <Sidebar />
        <Main />
      </div>
    )
  }

}

export default App;
