import React, { useState } from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import {
    Link
  } from "react-router-dom";
import { Add, Create, OpenInNew, ViewAgendaRounded, ViewColumn } from '@material-ui/icons';
import MyEditor from './MyEditor';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html"

class InformationalList extends React.Component {
   username =  sessionStorage.getItem("luna_user");



    state = {
        title: "Informational Call Tree",
        isSearchable: false,
        isPrintable: false,
        isCreatable: true,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "createdDate", text: "Date", sort: true}, 
            {dataField: "subject", text: "Title", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} style={{backgroundColor: '#3880ff'}}  onClick={() => {this.setState({currentViewContent: row["content"], currentViewTitle: row["subject"]}); this.handleViewShow();}}><OpenInNew/></Button>&nbsp;
                        {/* <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

                    </>
                )},
        ],
        data: [],
        filters: [],
        openModal: false,
        handleShow: this.handleShow.bind(this),
        responseTypes: [1,1,1],
        callTreeTitle: "",
        editorState: EditorState.createEmpty(),
        openViewModal: false,
        handleViewShow: this.handleViewShow.bind(this),
        currentViewContent: "",
        currentViewTitle: "",

    }

    
    onEditorStateChange = (editorState) => {
        this.setState({
        editorState,
        });
    };

    getCallTreeList(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'informational').then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getCallTreeList();
    }

    componentDidMount(){
        this.getCallTreeList();
    }

   handleClose(){
    this.setState({openModal: false});
   } 


   handleViewClose(){
    this.setState({openViewModal: false});
   } 


   handleSubmit(){
    const params = {
        subject: this.state.callTreeTitle,
        username: sessionStorage.getItem("call_tree_name"),
        content: stateToHTML(this.state.editorState.getCurrentContent()),
    }

    axios.post(BASE_SERVER_URL + 'informational', params)
    .then(res => {
        if(res.data){
            swal("Success!", "You have successfully triggered an informational call tree", "success");
            
            this.getCallTreeList();
        } else {
            swal("Error!", "Error occured while creating an informational call tree", "error");
        }
    }).catch( e => {
        swal("Error!", "Error occured while creating an informational call tree", "error");
    })

    this.setState({openModal: false});
   } 

   handleShow(){
    this.setState({openModal: true});
   }

   handleViewShow(){
    this.setState({openViewModal: true});
   }

   handleTitle(title){
       this.setState({callTreeTitle: title})
   }

   
   handleCaption(caption){
    this.setState({callTreeCaption: caption})
}


   handleResponseTypeChange(index){
    let resp = this.state.responseTypes;
    resp[index] = resp[index] === 0 ? 1 : 0;
    this.setState({responseTypes: resp});
   }
 

    render(){
        
       return (
        <>
            <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>           
         <Modal show={this.state.openModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Create Informational Call Tree</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <input  id="title" type="text" required className="form-control" placeholder="Title" onChange={(e) => {this.handleTitle(e.target.value)}}/>
                </div>
                <MyEditor editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange}/>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
                    Publish
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.openViewModal} onHide={this.handleViewClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.currentViewTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <div dangerouslySetInnerHTML={{ __html: this.state.currentViewContent }} />

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleViewClose.bind(this)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
       )
    }

    


}

export default InformationalList;