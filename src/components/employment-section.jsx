import React, { Component } from 'react';
import '../App.css';
import ClickableField from './clickable-field';

class EmploymentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { index } = this.props;
    return (
      <div className="employment-section">
        <ClickableField fieldName="position-held" fieldType="h4" />
      </div>
    );
  }
}

export default EmploymentSection;
