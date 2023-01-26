import React, { Component } from 'react';
import '../App.css';
import Main from './main-content';
import Sidebar from './sidebar';
import Banner from './banner';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      pageNumber,
      sidebarSections,
      mainSections,
      addSection,
    } = this.props;

    return (
      <div className="page">
        {pageNumber === 1 && (
          <Banner />
        )}
        <Sidebar page={pageNumber}>
          {sidebarSections}
        </Sidebar>
        <Main page={pageNumber} mainSections={mainSections} addSection={addSection} />

      </div>
    );
  }
}

export default Page;
