import React, { Component } from 'react';
import '../App.css';


class ClickableField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.defaultValue,
      isEditing: false,

    }

  }

  makeFieldEditable = (event) => {
    this.setState({
      isEditing: true
    })
  }

  handleLoseFocus = (event) => {
    this.setState({
      isEditing: false
    })
  }

  handleUpdate = (event) => {
    const key = event.target.name;
    this.setState({
      value: event.target.value
    })
  }

  handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  }


  render() {
    const { fieldName, fieldType } = this.props;
    const { value, isEditing } = this.state
    const DynamicTag = fieldType;


    return (
      <div className="wrapper">
        {!isEditing && <DynamicTag id={fieldName} onClick={(event) => this.makeFieldEditable(event)} className="updateableField">{value}</DynamicTag> }
        {isEditing && <input value={value} className={DynamicTag}  name={fieldName} onKeyUp={(event) => this.handleEnterKey(event)}onChange={(event) => this.handleUpdate(event)} onBlur={(event) => this.handleLoseFocus(event)} autoFocus></input> }
      </div>
    )


    


    
  }
}

export default ClickableField;