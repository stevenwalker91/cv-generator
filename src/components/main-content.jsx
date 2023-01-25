import React, { Component } from 'react';
import '../App.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { page, children } = this.props;
    return (
      <div className={page === 1 ? 'main-content main-content-page-one' : 'main-content '}>
        <h3>Employment History</h3>
        {children}
      </div>

    );
  }
}

export default Main;
