/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import '../App.css';

class ClickableField extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;

    this.state = {
      value: defaultValue,
      isEditing: false,

    };
  }

  handleLoseFocus = () => {
    this.setState({
      isEditing: false,
    });
  };

  handleUpdate = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  static handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  makeFieldEditable = () => {
    this.setState({
      isEditing: true,
    });
  };

  render() {
    const { fieldName, fieldType } = this.props;
    const { value, isEditing } = this.state;
    const DynamicTag = fieldType;

    return (
      <div className="wrapper">
        {!isEditing && <DynamicTag id={fieldName} onClick={(event) => this.makeFieldEditable(event)} className="updateableField">{value}</DynamicTag>}
        {
          isEditing && (
            <input
              value={value}
              className={DynamicTag}
              name={fieldName}
              onKeyUp={(event) => this.handleEnterKey(event)}
              onChange={(event) => this.handleUpdate(event)}
              onBlur={(event) => this.handleLoseFocus(event)}
              autoFocus
            />
          )
        }
      </div>
    );
  }
}

export default ClickableField;
