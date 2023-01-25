/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Component } from 'react';
import './App.css';
import GeneratePDFButton from './components/generate-pdf';
import ContentSection from './components/content-section';
import Page from './components/page';
import ClickableField from './components/clickable-field';

class App extends Component {
  static pxToCm = (px) => {
    const dpi = 96;
    return (px / dpi) * 2.54;
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarSectionHeights: {},
      breakpoints: [0],
      sidebarSectionValues: {
        0: 'Steven', 1: 'Test', 2: '', 3: '',
      },
      phone: '077123456122',
      email: 'user@test.com',
      address: '26 Test Street, Testville, TT1 2DE',
    };
  }

  updateSectionSize = (index, size) => {
    const breaks = this.getSidebarBreakpoints();
    this.setState((prevState) => ({
      sidebarSectionHeights: {
        ...prevState.sidebarSectionHeights,
        [index]: App.pxToCm(size),
      },
      breakpoints: breaks,
    }));
  };

  handleSectionChange = (data, index, height) => {
    this.setState((prevState) => ({
      sidebarSectionValues: {
        ...prevState.sidebarSectionValues,
        [index]: data,
      },
    }));
    this.updateSectionSize(index, height);
  };

  handleFieldChange = (data, field) => {
    this.setState({
      [field]: data,
    });
  };

  getSidebarBreakpoints = () => {
    let allowedHeight = 0;
    let page = 1;
    const { sidebarSectionHeights } = this.state;

    const breakpoints = [0];

    let totalHeight = 0;

    Object.keys(sidebarSectionHeights).forEach((item, index) => {
      if (page === 1) {
        allowedHeight = 20; // 23
      } else {
        allowedHeight = 25;
      }
      totalHeight += sidebarSectionHeights[item];
      if (totalHeight >= allowedHeight) {
        breakpoints.push(Number(index));
        page += 1;
        totalHeight = 0;
      }
    });
    return breakpoints;
  };

  render() {
    const {
      sidebarSectionValues, phone, email, address, breakpoints,
    } = this.state;
    const sidebarContentSections = [
      <ContentSection
        sectionTitle="Personal Summary"
        defaultValue={sidebarSectionValues[0]}
        key={0}
        updateSectionSize={this.updateSectionSize}
        index={0}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <ContentSection
        sectionTitle="Skills"
        defaultValue={sidebarSectionValues[1]}
        id="skillsContent"
        key={1}
        updateSectionSize={this.updateSectionSize}
        index={1}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <ContentSection
        sectionTitle="Accreditation"
        defaultValue={sidebarSectionValues[2]}
        id="summaryContent"
        key={2}
        updateSectionSize={this.updateSectionSize}
        index={2}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <ContentSection
        sectionTitle="Contact Details"
        key={5}
        updateSectionSize={this.updateSectionSize}
        index={5}
        type="address-section"
      >
        <ClickableField fieldName="phone" fieldType="p" defaultValue={phone} handleChange={this.handleFieldChange} />
        <ClickableField fieldName="email" fieldType="p" defaultValue={email} handleChange={this.handleFieldChange} />
        <ClickableField fieldName="address" fieldType="p" defaultValue={address} handleChange={this.handleFieldChange} />
      </ContentSection>,

    ];

    const pages = breakpoints.map((breakpoint, index) => {
      const start = breakpoint;

      let end = breakpoints[index + 1];
      if (!end) {
        end = breakpoint + 10;
      }

      return (
        <Page
          key={index + 1}
          pageNumber={index + 1}
          sidebarSections={sidebarContentSections.filter((section) => section.props.index >= start && section.props.index < end)}
        />
      );
    });

    return (

      <div>
        <div id="app" className="app">
          {pages}
        </div>
        <GeneratePDFButton />
      </div>
    );
  }
}

export default App;
