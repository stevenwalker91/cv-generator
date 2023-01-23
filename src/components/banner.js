import React, { Component } from 'react';
import '../App.css';
import ClickableField from './clickable-field';
import DisplayPicture from './display-picture';

class Banner extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const {name, role, isNameEditing, isRoleEditing, makeFieldEditable, handleUpdate, handleLoseFocus, handleEnterKey } = this.props

    return (
      <div className="outer-banner">
        <div id="banner">
          <DisplayPicture />
          <div id="name-container">

            <ClickableField fieldName="name" value={name} edit={makeFieldEditable} loseFocus={handleLoseFocus} handleUpdate={handleUpdate} isEditing={isNameEditing} handleEnter={handleEnterKey} />
            <ClickableField fieldName="role" value={role} edit={makeFieldEditable} handleEnter={handleEnterKey}loseFocus={handleLoseFocus} handleUpdate={handleUpdate} isEditing={isRoleEditing} />
          
          </div>
        </div>
      </div>

    )
  }
}

export default Banner;
