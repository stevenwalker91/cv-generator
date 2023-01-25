/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import '../App.css';

class ClickableField extends Component {
  static handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      isEditing: false,
      value: defaultValue,
    };
  }

  handleLoseFocus = () => {
    this.setState({
      isEditing: false,
    });
  };

  handleUpdate = (event) => {
    const { handleChange, fieldName } = this.props;
    if (handleChange) {
      handleChange(event.target.value, fieldName);
      return;
    }
    this.setState({
      value: event.target.value,
    });
  };

  makeFieldEditable = () => {
    this.setState({
      isEditing: true,
    });
  };

  render() {
    const {
      fieldName, fieldType, handleChange, defaultValue,
    } = this.props;
    const { isEditing, value } = this.state;
    const DynamicTag = fieldType;

    return (
      <div className="wrapper">
        {!isEditing && (
          <DynamicTag
            id={fieldName}
            onClick={(event) => this.makeFieldEditable(event)}
            className="updateableField"
          >
            {handleChange ? defaultValue : value}
          </DynamicTag>
        )}
        {
          isEditing && (
            <input
              defaultValue={handleChange ? defaultValue : value}
              className={DynamicTag}
              name={fieldName}
              onKeyUp={(event) => ClickableField.handleEnterKey(event)}
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
