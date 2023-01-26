import React, { Component } from 'react';
import '../App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

const editorConfig = {
  toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList'],
};

class EmploymentSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      defaultValue, employmentIndex, handleChange, fieldName,
    } = this.props;
    return (
      <div className="employment-summary" ref={this.ref}>
        <CKEditor
          editor={InlineEditor}
          config={editorConfig}
          data={defaultValue}
          onReady={(editor) => {
            const data = editor.getData();
            handleChange(data, fieldName, employmentIndex);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleChange(data, fieldName, employmentIndex);
          }}
        />
      </div>
    );
  }
}

export default EmploymentSummary;
