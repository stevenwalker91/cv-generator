import React, { Component } from 'react';
import '../App.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      page, mainSections, addSection, totalPageCount,
    } = this.props;
    return (
      <div className={page === 1 ? 'main-content main-content-page-one' : 'main-content '}>
        {page === 1 && <h3>Employment History</h3>}
        {mainSections}
        {page === totalPageCount && <button type="button" className="add-section" onClick={() => addSection()}>Add role</button>}
      </div>
    );
  }
}

export default Main;
