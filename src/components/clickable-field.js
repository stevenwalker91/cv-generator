import React, { Component } from 'react';
import '../App.css';


class ClickableField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }

  }

  render() {

    const { fieldName, value, edit, isEditing, loseFocus, handleEnter, handleUpdate} = this.props;

    if (fieldName === 'name') {
      return (
        <div className="wrapper">
          {!isEditing && <h1 id={fieldName} onClick={(event) => edit(event)} className="updateableField">{value}</h1> }
          {isEditing && <input value={value} className="h1" name={fieldName} onKeyUp={(event) => handleEnter(event)}onChange={(event) => handleUpdate(event)} onBlur={(event) => loseFocus(event)} autoFocus></input> }
        </div>
      )
    }

    if (fieldName === 'role') {
      return (
        <div className="wrapper">
          {!isEditing && <h2 id={fieldName} onClick={(event) => edit(event)} className="updateableField">{value}</h2> }
          {isEditing && <input value={value} className="h2" onKeyUp={(event) => handleEnter(event)} name={fieldName} onChange={(event) => handleUpdate(event)} onBlur={(event) => loseFocus(event)} autoFocus></input> }
        </div>
      )
    }
    
  }
}

export default ClickableField;