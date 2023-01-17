import React, { Component } from 'react';
import '../App.css';
import profilePic from '../assets/placeholder-image.jpeg';
//import profilePic from '../assets/me.jpeg';


class Banner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }

  }
  render() {
    return (
      <div id="banner">
        <div className="edit-pic-container">
          <label htmlFor="profilePicInput">
            <img className="profile-pic" id="profile-pic" src={profilePic}></img>
            <span className="material-symbols-outlined profile-label">photo_camera</span>
          </label>
          <input type="file" id="profilePicInput" name="profilePicInput" />
        </div>
        <div id="name-container">
          <h1 id="name">Mohammed Smith</h1>
          <h2 id="profession">Senior Software Engineer</h2>
          
        </div>
      </div>
    )
  }
}

export default Banner;
