import React, { Component } from 'react';
import '../App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import LocalPhoneRoundedIcon from '@mui/icons-material';

const editorConfig = {
  toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList'],
};

class ContentSection extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
    };
  }

  componentDidMount() {
    const { type, index } = this.props;
    if (type === 'address-section') {
      console.log('mount1');
      this.handleAddressChange(index);
    }
  }

  componentDidUpdate(prevProps) {
    const { type, index } = this.props;
    if (type === 'address-section') {
      console.log('update');
      if (prevProps.index === index) {
        return;
      }
      this.handleAddressChange(index);
    }
  }

  handleEditableChange = (data, index) => {
    const { handleChange } = this.props;
    if (this.ref.current) {
      handleChange(data, index, this.ref.current.clientHeight);
    }
  };

  handleAddressChange = (index) => {
    const { updateSectionSize } = this.props;
    if (this.ref.current) {
      updateSectionSize(index, this.ref.current.clientHeight);
    }
  };

  editableSection = (sectionTitle, defaultValue) => {
    const { index } = this.props;
    const div = (
      <div className="sidebar-section" ref={this.ref}>
        <h3>{sectionTitle}</h3>
        <CKEditor
          editor={InlineEditor}
          config={editorConfig}
          data={defaultValue}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            const data = editor.getData();
            this.handleEditableChange(data, index);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.handleEditableChange(data, index);
          }}
        />
      </div>
    );
    return div;
  };

  addressSection = (sectionTitle) => {
    const { index, children } = this.props;
    const div = (
      <div className="sidebar-section" ref={this.ref} onChange={() => this.handleAddressChange(index)}>
        <h3>{sectionTitle}</h3>
        <LocalPhoneRoundedIcon />
        {children}

      </div>
    );
    return div;
  };

  render() {
    const { defaultValue, sectionTitle, type } = this.props;

    if (type === 'editable-section') {
      return (
        this.editableSection(sectionTitle, defaultValue)
      );
    }

    return this.addressSection(sectionTitle);
  }
}

export default ContentSection;
