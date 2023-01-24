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
      sidebarSectionValues: { 0: 'Steven', 1: 'Test', 2: '', 3: '', 4: '' }
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

  pxToCm = (px) => {
    const dpi = 96;
    return (px / dpi) * 2.54;
  }

  handleChange = (data, index, height) => {
    this.setState(prevState => ({
      sidebarSectionValues: {
        ...prevState.sidebarSectionValues,
        [index]: data
      }
    }))
    this.updateSectionSize(index, this.pxToCm(height))
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



  render() {
    const sidebarContentSections = [
      <ContentSection
        sectionTitle="Personal Summary"
        defaultValue={this.state.sidebarSectionValues[0]}
        key={0}
        updateSectionSize={this.updateSectionSize}
        index={0}
        handleChange={this.handleChange}
      />,
      <ContentSection
        sectionTitle="Skills"
        defaultValue={this.state.sidebarSectionValues[1]}
        id="skillsContent"
        key={1}
        updateSectionSize={this.updateSectionSize}
        index={1}
        handleChange={this.handleChange}
      />,
      <ContentSection
        sectionTitle="Personal Summary"
        defaultValue={this.state.sidebarSectionValues[2]}
        id="summaryContent"
        key={2}
        updateSectionSize={this.updateSectionSize}
        index={2}
        handleChange={this.handleChange}
      />,
      <ContentSection
        sectionTitle="Personal Summary"
        defaultValue={this.state.sidebarSectionValues[3]}
        id="summaryContent"
        key={3}
        updateSectionSize={this.updateSectionSize}
        index={3}
        handleChange={this.handleChange}
      />,
      <ContentSection
        sectionTitle="Personal Summary"
        defaultValue={this.state.sidebarSectionValues[4]}
        id="summaryContent"
        key={4}
        updateSectionSize={this.updateSectionSize}
        index={4}
        handleChange={this.handleChange}
      />,

    ]

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
          sidebarSections={sidebarContentSections.filter(section => {
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
