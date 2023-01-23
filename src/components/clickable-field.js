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

  getHeaderOne = (fieldName, value, isEditing) => {

    return (
      <div className="wrapper">
        {!isEditing && <h1 id={fieldName} onClick={(event) => this.makeFieldEditable(event)} className="updateableField">{value}</h1> }
        {isEditing && <input value={value} className="h1" name={fieldName} onKeyUp={(event) => this.handleEnterKey(event)}onChange={(event) => this.handleUpdate(event)} onBlur={(event) => this.handleLoseFocus(event)} autoFocus></input> }
      </div>
    )
  }

  getHeaderTwo = (fieldName, value, isEditing) => {
    return (
      <div className="wrapper">
        {!isEditing && <h2 id={fieldName} onClick={(event) => this.makeFieldEditable(event)} className="updateableField">{value}</h2> }
        {isEditing && <input value={value} className="h2" name={fieldName} onKeyUp={(event) => this.handleEnterKey(event)}onChange={(event) => this.handleUpdate(event)} onBlur={(event) => this.handleLoseFocus(event)} autoFocus></input> }
      </div>
    )
  }

  render() {
    const { fieldName, fieldType } = this.props;
    const { value, isEditing } = this.state

    if (fieldType==="h1") {
      return this.getHeaderOne(fieldName, value, isEditing);
    }

    if (fieldType==="h2") {
      return this.getHeaderTwo(fieldName, value, isEditing);
    }



    


    
  }
}

export default ClickableField;