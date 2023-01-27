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
        0: '<p>I am Hamish, a driven and enthusiastic pooch with 4 years of experience in delighting hoomans across Carnoustie.&nbsp;</p><p>&nbsp;</p><p>I am very curious with an excellent sense of smell, and delight in causing mischief. I have a proven track record in delivering smiles bringing my hugs and love to the fore.&nbsp;</p><p>&nbsp;</p><p>I am passionate about creating happiness in the world and am seeking further opportunities to play, love and bark.</p>',
        1: '<ul><li>Finding socks, no matter how well theyre hidden</li><li>Chasing birds &amp; squirrels</li><li>Doing the “<strong>bang</strong>” trick</li><li>Cuddling in bed</li><li>Cuddling on the sofa</li><li>Cuddling anywhere else</li><li>Making friends</li><li>Chewing up tissues</li></ul>',
        2: '<p>I dont have formal creds as such, but my learning involves:</p><p>&nbsp;</p><ul><li>Toilet trained - I never go indoors!</li><li>I can do a sit, down, bang, touch and paw, but youve gotta make it worth my while</li><li>Vicki spent a lot of time with me desensitising me to grooming, so now I dont even find it that bad</li></ul>',
      },
      phone: '077123456122',
      email: 'hamishpaws@bark.com',
      address: 'Carnoustie, DD7',
      linkedin: 'linkedin.com/hamishpaws',
      employmentHistory: [{ positionheld: 'Junior Family Member', company: 'Nyree & Steven Inc. | 2019 - Present', summary: '<p>I moved into my new home in 2019 and I\'ve been here ever since. I live in Carnoustie and I\'ve made tonnes of friends. I used to love going round to the park to play with the other doggos, but I got a bit too territorial in the park (it\'s one of my skills!) so Dad had to start taking me along the country path.</p><p>&nbsp;</p><p>I\'m a joy to have around the house and I\'m awesome at finding stuff. Mum &amp; Dad always try to hide all the socks (they\'re silly) - but I always find them!!&nbsp;' }, { positionheld: 'New Born Pup', company: 'My Breeders Family Ltd. | 2019', summary: '<p>I was born in Dundee and couldnt really see for the first while. I was with my brother and two sisters, they\'re all the same age as me.&nbsp;</p><p>&nbsp;</p><p>I spent the first little while exploring around the house and getting to know my dog family. My mum is a cocker spaniel called Molly from Ireland and my Dad is a poodle called Ocito from Spain.</p><p>&nbsp;</p><p>I had lots of fun with my doggo family, but eventually my new Mum and Dad came and took me to my forever home.</p>' }],
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
        allowedHeight = 21; // 23
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
    const { [sectionIndex]: remove, ...updatedHeights } = mainSectionHeights;
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
    }, this.resetMainBreaks);
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
      <SidebarSection
        sectionTitle="Education"
        defaultValue={sidebarSectionValues[2]}
        id="summaryContent"
        key={2}
        updateSectionSize={this.updateSectionSize}
        index={2}
        handleChange={this.handleSectionChange}
        type="editable-section"
      />,

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
        sideEnd = i + 100;
      }

      const mainStart = mainBreakpoints[i];
      let mainEnd = mainBreakpoints[i + 1];
      if (!mainEnd) {
        mainEnd = i + 100;
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
