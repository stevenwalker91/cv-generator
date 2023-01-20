import React, { Component } from 'react';
import './App.css';
import GeneratePDFButton from './components/generate-pdf';
import ContentSection from './components/content-section';
import Page from './components/page';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  sidebarContentSections = [
    <ContentSection
      sectionTitle="Personal Summary"
      defaultValue="<p>Some text</p>"
    />,
    <ContentSection
      sectionTitle="Skills"
      defaultValue="<ul><li>a list</li></ul>"
    />
  ]

  render() {
    return (
      <div>
        <div id="app" className="app">
          <Page pageNumber="1" sidebarSections={this.sidebarContentSections} />
          <Page pageNumber="2" sidebarSections={this.sidebarContentSections} />
        </div>
        <GeneratePDFButton />
      </div>
    )
  }

}

export default App;
