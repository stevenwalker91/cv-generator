import React, { Component } from 'react';
import '../App.css';

class EmploymentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { children } = this.props;
    return (
      <div className="employment-section">
        {children}
      </div>
    );
  }
}

export default EmploymentSection;
