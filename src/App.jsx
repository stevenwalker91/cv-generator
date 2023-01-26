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
      breakpoints: [0],
      sidebarSectionValues: {
        0: 'Steven', 1: 'Test', 2: '', 3: '',
      },
      phone: '077123456122',
      email: 'user@test.com',
      address: '26 Test Street, Testville, TT1 2DE',
      linkedin: 'linkedin.com/testuser',
      employmentHistory: [{ positionheld: 'Product Owner', company: 'Acme Inc', summary: 'This is some text' }, { positionheld: 'Product Owner', company: 'Special Air Service', summary: 'this is some more text' }],
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

  deleteSection = (sectionIndex) => {
    const { employmentHistory } = this.state;
    const updatedArray = employmentHistory.filter((item, index) => {
      if (sectionIndex !== index) {
        return item;
      }
    });
    this.setState({
      employmentHistory: updatedArray,
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
      sidebarSectionValues, phone, email, address, breakpoints, linkedin, employmentHistory,
    } = this.state;
    const sidebarContentSections = [
      <SidebarSection
        sectionTitle="Personal Summary"
        defaultValue={sidebarSectionValues[0]}
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
      <EmploymentSection key={`${index}section`}>
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
          mainSections={mainSections}
          addSection={this.addSection}
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
