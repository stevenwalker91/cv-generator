import React, { Component } from 'react';
import '../App.css';

class EmploymentSection extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const { index } = this.props;
    this.handleChange(index);
  }

  componentDidUpdate() {
    const { index } = this.props;
    const { height } = this.state;
    if (height === this.ref.current.clientHeight) {
      return;
    }
    this.handleChange(index);
  }

  handleChange = (index) => {
    const { updateSectionSize } = this.props;
    if (this.ref.current) {
      updateSectionSize(index, this.ref.current.clientHeight, 'main');
      this.setState({
        height: this.ref.current.clientHeight,
      });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div className="employment-section" ref={this.ref}>
        {children}
      </div>
    );
  }
}

export default EmploymentSection;
