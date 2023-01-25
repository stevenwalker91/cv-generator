import React, { Component } from 'react';
import '../App.css';
import ClickableField from './clickable-field';
import DisplayPicture from './display-picture';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="outer-banner">
        <div id="banner">
          <DisplayPicture />
          <div id="name-container">
            <ClickableField fieldName="name" fieldType="h1" defaultValue="Hamish Walker" />
            <ClickableField fieldName="role" fieldType="h2" defaultValue="Loyal Companion" />
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
