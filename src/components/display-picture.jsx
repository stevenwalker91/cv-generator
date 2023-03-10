/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import '../App.css';
import profilePic from '../assets/hamish.jpg';

class DisplayPicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedImage: profilePic,
    };
  }

  handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ uploadedImage: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    const { uploadedImage } = this.state;
    return (
      <div className="edit-pic-container">
        <label htmlFor="profilePicInput">
          <img className="profile-pic" id="profile-pic" alt="the user's profile" src={uploadedImage} />
          <span className="material-symbols-outlined profile-label">photo_camera</span>
        </label>
        <input type="file" id="profilePicInput" name="profilePicInput" multiple={false} accept="image/*" onChange={this.handleImageUpload} />
      </div>
    );
  }
}

export default DisplayPicture;
