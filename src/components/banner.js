import React, { Component } from 'react';
import '../App.css';
import profilePic from '../assets/hamish.jpg';
import UpdateField from './update-field';
import ClickableField from './clickable-field';

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

    if (event.target.id === 'name') {
      this.setState({
        isNameEditing: true
      })
    }

    if (event.target.id === 'role') {
      this.setState({
        isRoleEditing: true
      })
    }
  }

  handleLoseFocus = (event) => {
    if(event.target.name === 'name') {
      this.setState({
        isNameEditing: false
      })
    }
    if(event.target.name === 'role') {
      this.setState({
        isRoleEditing: false
      })
    }
    
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
          <div className="edit-pic-container">
            <label htmlFor="profilePicInput">
              <img className="profile-pic" id="profile-pic" src={profilePic}></img>
              <span className="material-symbols-outlined profile-label">photo_camera</span>
            </label>
            <input type="file" id="profilePicInput" name="profilePicInput" />
          </div>
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
