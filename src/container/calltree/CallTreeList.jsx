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
  
class CallTreeList extends React.Component {
   username =  sessionStorage.getItem("luna_user");
    state = {
        title: "Call Tree List",
        isSearchable: false,
        isPrintable: false,
        isCreatable: true,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "createdDate", text: "Date", sort: true}, 
            {dataField: "subject", text: "Title", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '150px', textAlign: 'center' };
                }}, 
                {dataField: "caption", text: "Caption", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '300px', textAlign: 'center' };
                }}, 

            {dataField: "totalResponses", text: "Total Responses", sort: true},
            {dataField: "totalSafe", text: "Total Safe", sort: true},
            {dataField: "totalUncertain", text: "Total Uncertain", sort: true},
            {dataField: "totalInDanger", text: "Total In Danger", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} style={{backgroundColor: '#3880ff'}}  to={"/calltree/" + row['id']+ "/responses"}><OpenInNew/></Button>&nbsp;
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
        callTreeCaption: "",
    }

    getCallTreeList(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'calltree/all').then(res => {
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

   handleSubmit(){
    const params = {
        subject: this.state.callTreeTitle,
        username: sessionStorage.getItem("call_tree_name"),
        caption: this.state.callTreeCaption,
        responseTypes: "" + this.state.responseTypes[0] +"," +  this.state.responseTypes[1] +","  + this.state.responseTypes[2]
    }

    axios.post(BASE_SERVER_URL + 'calltree', params)
    .then(res => {
        if(res.data){
            swal("Success!", "You have successfully triggered a call tree", "success");
            this.getCallTreeList();
        } else {
            swal("Error!", "Error occured while creating a call tree", "error");
        }
    }).catch( e => {
        swal("Error!", "Error occured while creating a call tree", "error");
    })

    this.setState({openModal: false});
   } 

   handleShow(){
    this.setState({openModal: true});
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
                <Modal.Title>Trigger Call Tree</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <input  id="title" type="text" required className="form-control" placeholder="Title Eg: Are you safe?" onChange={(e) => {this.handleTitle(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <input  id="caption" type="text" required className="form-control" placeholder="Caption Eg: Please responsd to this survey" onChange={(e) => {this.handleCaption(e.target.value)}}/>
                </div>
                <Form.Group className="mb-3">
                    <label>Type of responses</label>
                    <Form.Check
                        type="checkbox"
                        id="safe"
                        label="I'm totally safe"
                        onChange={() => this.handleResponseTypeChange(0)}
                        checked={this.state.responseTypes[0]}
                    />
                    <Form.Check
                        type="checkbox"
                        id="uncertain"
                        label="I'm safe but uncertain"
                        onChange={() => this.handleResponseTypeChange(1)}
                        checked={this.state.responseTypes[1]}
                    />
                     <Form.Check
                        type="checkbox"
                        id="needHelp"
                        label="I urgently need help"
                        onChange={() => this.handleResponseTypeChange(2)}
                        checked={this.state.responseTypes[2]}
                    />
                </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </>
       )
    }

    


}

export default CallTreeList;