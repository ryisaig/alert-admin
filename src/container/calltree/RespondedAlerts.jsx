import React, { useState } from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Col, Form, InputGroup, Modal, Row, Table} from 'react-bootstrap';
import swal from 'sweetalert';
import {
    Link
  } from "react-router-dom";
import { Add, CheckCircleOutline, CheckCircleSharp, Create, OpenInNew, ViewAgendaRounded, ViewColumn } from '@material-ui/icons';
import MyEditor from './MyEditor';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html"
import MapDetails from './MapDetails';

class RespondedAlerts extends React.Component {
   username =  sessionStorage.getItem("luna_user");

    state = {
        subtitle: "Responded reports",
        isSearchable: false,
        isPrintable: false,
        isCreatable: false,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "createdDate", text: "Date", sort: true}, 
            {dataField: "reportType", text: "Report Type", sort: true},
            {dataField: "fullName", text: "Full Name", sort: true},
            {dataField: "mobileNumber", text: "Mobile Number", sort: true},
            {dataField: "subject", text: "Classification", sort: true},
            // {dataField: "description", text: "Description", sort: true},
            {dataField: "location", text: "Location Hint", sort: true},
            {dataField: "status", text: "Status", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} style={{backgroundColor: '#000'}}  
                                onClick={() => {
                                    this.setState({
                                        currentAlert: {
                                            subject: row["subject"],
                                            humanDamage: row["humanDamage"],
                                            description: row["description"],
                                            reportType: row["reportType"],
                                            fullName: row["fullName"],
                                            mobileNumber: row["mobileNumber"],
                                            location: row["location"],
                                            createdDate: row["createdDate"],
                                            geolocationX: row["geolocationX"],
                                            geolocationY: row["geolocationY"],
                                            status: row["status"]
                                        }}); 
                                    this.handleViewShow();}}>
                                <OpenInNew/>
                        </Button>&nbsp;
                        <Button as={Link} style={{backgroundColor: '#28a745'}} onClick={() => this.updateStatus("Acknowledged", row["id"])}><CheckCircleOutline/></Button>&nbsp;
                        <Button as={Link} style={{backgroundColor: '#3880ff'}} onClick={() => this.updateStatus("Responded", row["id"])}><CheckCircleSharp/></Button>

                        {/* <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

                    </>
                )},
        ],
        data: [],
        filters: [],
        openModal: false,
        responseTypes: [1,1,1],
        callTreeTitle: "",
        editorState: EditorState.createEmpty(),
        openViewModal: false,
        handleViewShow: this.handleViewShow.bind(this),
        currentAlert: {}
    }

    getCallTreeList(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'alert/all').then(res => {
            const filtered = res.data.filter((item) => {
                return item.status === "Responded";
            })
            this.setState({data: filtered})
        })
    }

    updateStatus(status, id) {
        axios.patch(BASE_SERVER_URL + 'alert/'+id+'?status='+status).then(res => {
            this.getCallTreeList();
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

   handleViewClose(){
    this.setState({openViewModal: false});
   } 

   handleViewShow(){
    this.setState({openViewModal: true});
   }

    render(){
        
       return (
        <>
            <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>           

            <Modal show={this.state.openViewModal} onHide={this.handleViewClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Report Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height: "600px"}}>
                    <Table>
                        <Row>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Date Reported</Col>
                            <Col>{this.state.currentAlert.createdDate}</Col>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Status</Col>
                            <Col>{this.state.currentAlert.status}</Col>
                        </Row>
                        <Row>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Reporter</Col>
                            <Col>{this.state.currentAlert.fullName}</Col>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Mobile Number</Col>
                            <Col>{this.state.currentAlert.mobileNumber}</Col>
                        </Row>
                        
                        <Row>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Subject</Col>
                            <Col>{this.state.currentAlert.subject}</Col>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Report Type</Col>
                            <Col>{this.state.currentAlert.reportType}</Col>
                        </Row>
                        <Row>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Description</Col>
                            <Col span="3">{this.state.currentAlert.description}</Col>
                            <Col></Col>
                            <Col></Col>

                        </Row>
                        <Row>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Human Damage</Col>
                            <Col>{this.state.currentAlert.humanDamage ? "Yes": "No"}</Col>
                            <Col style={{textAlign: "right", fontWeight: "bold"}}>Location Hint</Col>
                            <Col>{this.state.currentAlert.location}</Col>
                        </Row>
                    </Table>
                  
                    <MapDetails lat={this.state.currentAlert.geolocationX} lng={this.state.currentAlert.geolocationY} style={{height: "200px"}}/>
                   
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

export default RespondedAlerts;