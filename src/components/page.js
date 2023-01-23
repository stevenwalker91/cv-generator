import React, { Component } from 'react';
import '../App.css';
import Main from './main-content.js';
import Sidebar from './sidebar.js';
import Banner from './banner.js';

class Page extends Component {

  render() {
  const { pageNumber, sidebarSections, name, role, isNameEditing, isRoleEditing, makeFieldEditable, handleLoseFocus, handleUpdate, handleEnterKey  } = this.props;

  
    return (
      <div className="page">
          {pageNumber === 1 && 
            <Banner 
              name={name} 
              role={role} 
              isNameEditing={isNameEditing}
              isRoleEditing={isRoleEditing}
              makeFieldEditable={makeFieldEditable}
              handleLoseFocus={handleLoseFocus}
              handleUpdate={handleUpdate}
              handleEnterKey={handleEnterKey}
            /> }
          <Sidebar page={pageNumber}>
            {sidebarSections}
          </Sidebar >
          <Main />
      </div>
    )
  }
}

export default Page;