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
      name,
      role,
      isNameEditing,
      isRoleEditing,
      makeFieldEditable,
      handleLoseFocus,
      handleUpdate,
      handleEnterKey,
    } = this.props;

    return (
      <div className="page">
        {pageNumber === 1 && (
          <Banner
            name={name}
            role={role}
            isNameEditing={isNameEditing}
            isRoleEditing={isRoleEditing}
            makeFieldEditable={makeFieldEditable}
            handleLoseFocus={handleLoseFocus}
            handleUpdate={handleUpdate}
            handleEnterKey={handleEnterKey}
          />
        )}
        <Sidebar page={pageNumber}>
          {sidebarSections}
        </Sidebar>
        <Main page={pageNumber} />
      </div>
    );
  }
}

export default Page;
