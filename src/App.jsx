/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SidebarSection from './components/content-section';
import Page from './components/page';
import ClickableField from './components/clickable-field';
import EmploymentSection from './components/employment-section';
import EmploymentSummary from './components/employment-summary';
import GeneratePDFButton from './components/generate-pdf';

class App extends Component {
  static pxToCm = (px) => {
    const dpi = 96;
    return (px / dpi) * 2.54;
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarSectionHeights: {},
      mainSectionHeights: {},
      breakpoints: [0],
      mainBreakpoints: [0],
      sidebarSectionValues: {
        0: 'Steven', 1: 'Test', 2: 'Test',
      },
      phone: '077123456122',
      email: 'user@test.com',
      address: '26 Test Street, Testville, TT1 2DE',
      linkedin: 'linkedin.com/testuser',
      employmentHistory: [{ positionheld: 'Cartoon', company: 'Acme Inc | 2020 - Present', summary: 'This is some text' }, { positionheld: 'Commando', company: 'Special Air Service | 1990 - 2019', summary: 'this is some more text' }],
    };
  }

  updateSectionSize = (index, size, side) => {
    let sectionHeights = {};
    let breaksList;
    const { sidebarSectionHeights, mainSectionHeights } = this.state;

    if (side === 'sidebar') {
      sectionHeights = { ...sidebarSectionHeights, [index]: App.pxToCm(size) };
      breaksList = 'breakpoints';
    } else if (side === 'main') {
      sectionHeights = { ...mainSectionHeights, [index]: App.pxToCm(size) };
      breaksList = 'mainBreakpoints';
    }
    const breaks = this.getBreakpoints(side);

    this.setState((prevState) => ({
      [`${side}SectionHeights`]: { ...prevState[`${side}SectionHeights`], [index]: App.pxToCm(size) },
      [breaksList]: breaks,
    }));
  };

  handleSectionChange = (data, index, height) => {
    this.setState((prevState) => ({
      sidebarSectionValues: {
        ...prevState.sidebarSectionValues,
        [index]: data,
      },
    }));
    this.updateSectionSize(index, height, 'sidebar');
  };

  handleFieldChange = (data, field, employmentIndex) => {
    if (employmentIndex >= 0) {
      const { employmentHistory } = this.state;
      const newEmploymentArray = employmentHistory.map((item, index) => {
        if (index !== Number(employmentIndex)) {
          return item;
        }
        if (index === Number(employmentIndex)) {
          return {
            ...item,
            [field]: data,
          };
        }
      });
      this.setState({
        employmentHistory: newEmploymentArray,
      });
    }

    if (employmentIndex === undefined) {
      this.setState({
        [field]: data,
      });
    }
  };

  getBreakpoints = (section) => {
    let allowedHeight = 0;
    let page = 1;
    let sectionHeights = {};
    const { sidebarSectionHeights, mainSectionHeights } = this.state;

    if (section === 'sidebar') {
      sectionHeights = sidebarSectionHeights;
    }

    if (section === 'main') {
      sectionHeights = mainSectionHeights;
    }

    const breakpoints = [0];

    let totalHeight = 0;

    Object.keys(sectionHeights).forEach((item, index) => {
      if (page === 1) {
        allowedHeight = 20; // 23
      } else {
        allowedHeight = 25;
      }
      totalHeight += sectionHeights[item];
      if (totalHeight >= allowedHeight) {
        breakpoints.push(Number(index));
        page += 1;
        totalHeight = sectionHeights[item];
      }
    });
    return breakpoints;
  };

  deleteSection = (sectionIndex) => {
    const { employmentHistory, mainSectionHeights, mainBreakpoints } = this.state;
    const updatedArray = employmentHistory.filter((item, index) => {
      if (sectionIndex !== index) {
        return item;
      }
    });
    const { [sectionIndex]: updatedHeights } = mainSectionHeights;
    this.setState({
      employmentHistory: updatedArray,
      mainSectionHeights: updatedHeights,
    }, this.resetMainBreaks);
  };

  resetMainBreaks = () => {
    const breaks = this.getBreakpoints('main');
    this.setState({
      mainBreakpoints: breaks,
    });
  };

  addSection = () => {
    const { employmentHistory } = this.state;
    const updatedArray = employmentHistory;
    updatedArray.push({ positionheld: 'Job Role', company: 'Company | Date From - Date To', summary: 'Tell us more about the role' });
    this.setState({
      employmentHistory: updatedArray,
    });
  };

  render() {
    const {
      sidebarSectionValues, phone, email, address, breakpoints, linkedin, employmentHistory, mainBreakpoints,
    } = this.state;
    const sidebarContentSections = [
      <SidebarSection
        sectionTitle="Personal Summary"
        defaultValue={sidebarSectionValues[0]}
        id="summary-content"
        key={0}
        updateSectionSize={this.updateSectionSize}
        index={0}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <SidebarSection
        sectionTitle="Skills"
        defaultValue={sidebarSectionValues[1]}
        id="skillsContent"
        key={1}
        updateSectionSize={this.updateSectionSize}
        index={1}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <SidebarSection
        sectionTitle="Accreditation"
        defaultValue={sidebarSectionValues[2]}
        id="summaryContent"
        key={2}
        updateSectionSize={this.updateSectionSize}
        index={2}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,
      <SidebarSection
        sectionTitle="Contact Details"
        key={3}
        updateSectionSize={this.updateSectionSize}
        index={3}
        type="address-section"
      >
        <ClickableField fieldName="phone" fieldType="p" defaultValue={phone} handleChange={this.handleFieldChange} />
        <ClickableField fieldName="email" fieldType="p" defaultValue={email} handleChange={this.handleFieldChange} />
        <ClickableField fieldName="address" fieldType="p" defaultValue={address} handleChange={this.handleFieldChange} />
        <ClickableField fieldName="linkedin" fieldType="p" defaultValue={linkedin} handleChange={this.handleFieldChange} />
      </SidebarSection>,

    ];

    const mainSections = employmentHistory.map((item, index) => (
      <EmploymentSection key={`${index}section`} updateSectionSize={this.updateSectionSize} index={index}>
        <button type="button" className="delete-section" onClick={() => this.deleteSection(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <ClickableField
          fieldName="positionheld"
          fieldType="h4"
          employmentIndex={index}
          defaultValue={item.positionheld}
          handleChange={this.handleFieldChange}
          key={`${index}position`}

        />
        <ClickableField
          fieldName="company"
          fieldType="h5"
          employmentIndex={index}
          defaultValue={item.company}
          handleChange={this.handleFieldChange}
          key={`${index}company`}
        />
        <EmploymentSummary
          fieldName="summary"
          employmentIndex={index}
          defaultValue={item.summary}
          handleChange={this.handleFieldChange}
          key={`${index}summary`}
        />
      </EmploymentSection>
    ));

    const numberOfPages = Math.max(breakpoints.length, mainBreakpoints.length);
    const pages = [];

    for (let i = 0; i < numberOfPages; i += 1) {
      const sideStart = breakpoints[i];
      let sideEnd = breakpoints[i + 1];
      if (!sideEnd) {
        sideEnd = i + 10;
      }

      const mainStart = mainBreakpoints[i];
      let mainEnd = mainBreakpoints[i + 1];
      if (!mainEnd) {
        mainEnd = i + 10;
      }

      const sidebarSections = sidebarContentSections.filter((section, index) => index >= sideStart && index < sideEnd);
      const mainSects = mainSections.filter((section, index) => index >= mainStart && index < mainEnd);
      pages.push(
        <Page
          key={i + 1}
          pageNumber={i + 1}
          sidebarSections={sidebarSections}
          mainSections={mainSects}
          addSection={this.addSection}
          totalPageCount={numberOfPages}
        />,
      );
    }
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
