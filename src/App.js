import React, { Component } from 'react';
import './App.css';
import GeneratePDFButton from './components/generate-pdf';
import ContentSection from './components/content-section';
import Page from './components/page';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarSectionHeights: {},
      breakpoints: [0],
    }
  }

  updateSectionSize = (index, size) => {

    const breaks = this.getSidebarBreakpoints();
    this.setState(prevState => ({
      sidebarSectionHeights: {
        ...prevState.sidebarSectionHeights,
        [index]: size,
      },
      breakpoints: breaks
    }))
  }

  getSidebarBreakpoints = () => {
    let allowedHeight = 0;
    let page = 1

    const breakpoints = [0];

    let totalHeight = 0;

    for (const key in this.state.sidebarSectionHeights) {
      if (page === 1) {
        allowedHeight = 21; //23
      } else {
        allowedHeight = 25;
      }

      totalHeight += this.state.sidebarSectionHeights[key]
      if (totalHeight > allowedHeight) {
        breakpoints.push(parseInt(key))
        page = page + 1;
        totalHeight = 0;
      }
    }
    return breakpoints;
  }


  sidebarContentSections = [
    <ContentSection
      sectionTitle="Personal Summary"
      defaultValue="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
      id="summaryContent"
      key={0}
      updateSectionSize={this.updateSectionSize}
      index={0}
    />,
    <ContentSection
      sectionTitle="Skills"
      defaultValue="<ul><li>a list</li></ul>"
      id="skillsContent"
      key={1}
      updateSectionSize={this.updateSectionSize}
      index={1}
    />,
    <ContentSection
      sectionTitle="Personal Summary"
      defaultValue="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
      id="summaryContent"
      key={2}
      updateSectionSize={this.updateSectionSize}
      index={2}
    />,
    <ContentSection
      sectionTitle="Personal Summary"
      defaultValue="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
      id="summaryContent"
      key={3}
      updateSectionSize={this.updateSectionSize}
      index={3}
    />,
    <ContentSection
      sectionTitle="Personal Summary"
      defaultValue="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
      id="summaryContent"
      key={4}
      updateSectionSize={this.updateSectionSize}
      index={4}
    />,
    <ContentSection
      sectionTitle="Contact Details"
      defaultValue="<p>Steven</p>"
      id="testContent"
      key={5}
      updateSectionSize={this.updateSectionSize}
      index={5}
    >
      <h1>Steven</h1>

    </ContentSection>,
  ]


  render() {
    const { name, role, isNameEditing, isRoleEditing } = this.state

    const breakpoints = this.state.breakpoints;
    const pages = breakpoints.map((breakpoint, index) => {
      const start = breakpoint

      let end = breakpoints[index + 1];
      if (!end) {
        end = breakpoint + 10;
      }

      return (
        <Page
          key={index + 1}
          pageNumber={index + 1}
          sidebarSections={this.sidebarContentSections.filter(section => {
            return section.props.index >= start && section.props.index < end //
          })}
        />
      )
    })

    return (

      < div >
        <div id="app" className="app">
          {pages}
        </div>
        <GeneratePDFButton />
      </div >
    )
  }

}

export default App;
