import React, { Component } from 'react';
import '../App.css';



class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
    const {page} = this.props;

    return (
      <div className={page === 1 ? "sidebar sidebar-page-one" : "sidebar "}>
        {this.props.children}

      </div>
    )
  }
}

export default Sidebar;