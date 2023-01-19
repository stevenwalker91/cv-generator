import React, { Component } from 'react';
import '../App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

const editorConfig = {
  toolbar: [ 'undo', 'redo', 'bold', 'italic', 'bulletedList', 'numberedList' ]
}


class ContentSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  handleChange = (input) => {
    this.setState ({
      value: input
    })
  }

  render(){

    const { defaultValue, sectionTitle  } = this.props;
    const { value } = this.state;

    return (
      <div className="sidebar-section">
        <h3>{ sectionTitle }</h3>
        
        <CKEditor
          editor={ BalloonEditor }
          config={ editorConfig }
          data={defaultValue}
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              this.handleChange(data);
          } }
         />

      </div>
    )
  }
}


export default ContentSection;