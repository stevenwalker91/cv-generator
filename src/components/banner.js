import React, { Component } from 'react';
import '../App.css';
import profilePic from '../assets/me.jpeg'


class Banner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }

  }
  render() {
    return (
      <div id="banner">
        <img className="profile-pic" src={profilePic}></img>
        <div id="name-container">
          <h1 id="name">Mohammed Smith</h1>
          <h2 id="profession">Senior Software Engineer</h2>
        </div>
      </div>
    )
  }
}

export default Banner;
