import React, { Component } from 'react';
import '../App.css';
import ClickableField from './clickable-field';
import DisplayPicture from './display-picture';

class Banner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Hamish Walker',
      role: 'Loyal Companion & Best Friend',
      isNameEditing: false,
      isRoleEditing: false
    }
  }

  makeFieldEditable = (event) => {
    const stateToUpdate = `is${event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1)}Editing`
    this.setState({
      [stateToUpdate]: true
    })
  }

  handleLoseFocus = (event) => {
    const stateToUpdate = `is${event.target.name.charAt(0).toUpperCase() + event.target.name.slice(1)}Editing`
    this.setState({
      [stateToUpdate]: false
    })
  }

  handleUpdate = (event) => {
    const key = event.target.name;
    this.setState({
      [key]: event.target.value
    })
  }

  handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  }



  render() {
    const { name, role, isNameEditing, isRoleEditing, handleEnterKey} = this.state;
    return (
      <div className="outer-banner">
        <div id="banner">
          <DisplayPicture />
          <div id="name-container">

            <ClickableField fieldName="name" value={name} edit={this.makeFieldEditable} loseFocus={this.handleLoseFocus} handleUpdate={this.handleUpdate} isEditing={isNameEditing} handleEnter={this.handleEnterKey} />
            <ClickableField fieldName="role" value={role} edit={this.makeFieldEditable} handleEnter={this.handleEnterKey}loseFocus={this.handleLoseFocus} handleUpdate={this.handleUpdate} isEditing={isRoleEditing} />
          
          </div>
        </div>
      </div>

    )
  }
}

export default Banner;
