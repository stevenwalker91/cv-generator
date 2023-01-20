import React, { Component } from 'react';
import '../App.css';
import Main from './main-content.js';
import Sidebar from './sidebar.js';
import Banner from './banner.js';


class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
  const { pageNumber, sidebarSections } = this.props;
  
    return (
      <div className="page">
          {pageNumber === '1' && <Banner /> }
          <Sidebar page={pageNumber}>
            {sidebarSections}
          </Sidebar >
          <Main />
      </div>
    )
  }
}

export default Page;