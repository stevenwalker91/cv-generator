import React, { Component } from 'react';
import '../App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

const editorConfig = {
  toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList']
}

class ContentSection extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
    this.state = {
      value: '',
      height: 0
    }

  }

  passHandlerToParent = (data, index) => {
    if (this.ref.current) {
      this.props.handleChange(data, index, this.ref.current.clientHeight)
  }

  }


  editableSection = (sectionTitle, defaultValue) => {
    return (
      <div className="sidebar-section" ref={this.ref}>
          <h3>{ sectionTitle }</h3>
          <CKEditor
            editor={ InlineEditor }
            config={ editorConfig }
            data={defaultValue}
            onReady={ (editor) => {
              // You can store the "editor" and use when it is needed.
              const data = editor.getData();
              this.passHandlerToParent(data, this.props.index);
          } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                this.passHandlerToParent(data, this.props.index);
            } }
          />
      </div>
    )
  }

  addressSection = (sectionTitle) => {
    return (
      <div className="sidebar-section" ref={this.ref}>
        <h3>{ sectionTitle }</h3>


      </div>
    )
  }

  render(){
    const { height } = this.state
    const { defaultValue, sectionTitle } = this.props;
    return (
       this.editableSection(sectionTitle, defaultValue)

    )
  }
}


export default ContentSection;