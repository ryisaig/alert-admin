import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class MyEditor extends Component {
 
  render() {
    return (
      <div style={{height: "400px"}}>
        <Editor
          editorState={this.props.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.props.onEditorStateChange}
        />
      </div>
    );
  }
}

export default MyEditor;