import React, { Component } from 'react';
import './App.css';
import Main from './components/main-content.js';
import Sidebar from './components/sidebar.js';
import Banner from './components/banner.js';
import GeneratePDFButton from './components/generate-pdf';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }


  }



  render() {
    return (
      <div>
        <div id="app" className="app">
          <Banner />
          <Sidebar />
          <Main />
        </div>
        <GeneratePDFButton />
      </div>
    )
  }

}

export default App;
