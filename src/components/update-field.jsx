import React, { Component } from 'react';
import '../App.css';

class UpdateField extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      field, edit, submit, value,
    } = this.props;
    return (
      <div id="edit-fields">
        <form className="updateFieldForm" onSubmit={(event) => submit(event)}>
          <input onChange={(event) => edit(event)} name={field} value={value} autoFocus />
          <button type="submit">Close</button>
        </form>
      </div>
    );
  }
}

export default UpdateField;
