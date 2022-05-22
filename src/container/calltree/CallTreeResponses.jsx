import React, { useState } from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import {
    Link
  } from "react-router-dom";
import { Add, Create, MapOutlined, OpenInNew, ViewAgendaRounded, ViewColumn } from '@material-ui/icons';
import MapDetails from './MapDetails';
  
class CallTreeResponses extends React.Component {
   username =  sessionStorage.getItem("luna_user");
    state = {
        title: "Call Tree Responses",
        isSearchable: false,
        isPrintable: false,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "createdDate", text: "Date", sort: true}, 
            {dataField: "createdBy", text: "Mobile Number", sort: true}, 
            {dataField: "fullname", text: "Name", sort: true}, 
            {dataField: "address", text: "Address", sort: true},
            {dataField: "response", text: "Response", sort: true,  
            formatter: (cell, row) => (
                <>  

                    {cell === "SAFE" && <span style={{color: "green", fontWeight: 'bold'}}>SAFE</span>}
                    {cell === "UNCERTAIN" && <span style={{color: "orange", fontWeight: 'bold'}}>UNCERTAIN</span>}
                    {cell === "NEED_HELP" && <span style={{color: "red", fontWeight: 'bold'}}>NEED HELP</span>}

                </>
            )},
            {dataField: "additionalDetails", text: "Additional Info", sort: true},
            {dataField: "actions", text: "View Location", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} style={{backgroundColor: '#3880ff'}}  onClick={() => this.openLocationModal(row)}><MapOutlined/></Button>&nbsp;
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
        currentGeoLocationX: "",
        currentGeoLocationY: ""
    }

    getCallTreeResponseList(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'calltree/' +  this.props.match.params.id +   '/responses'      ).then(res => {
            this.setState({data: res.data})
        })
    }

    openLocationModal = (row) => {
        this.setState({currentGeoLocationX: row.geolocationX, currentGeoLocationY: row.geolocationY});
        this.handleShow();
    }
    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getCallTreeResponseList();
    }

    componentDidMount(){
        this.getCallTreeResponseList();
    }

   handleClose(){
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
            <Button style={{marginLeft: "25px"}} onClick={() => window.location.href="../"}>Back</Button>
            <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>           
         <Modal show={this.state.openModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>User's Location</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height: "600px", minWidth: "800px"}}>
                    <MapDetails lat={this.state.currentGeoLocationX} lng={this.state.currentGeoLocationY}/>
                </Modal.Body>
                <Modal.Footer>
                    <br/>
                {/* <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                    Close
                </Button>
                 */}
                </Modal.Footer>
            </Modal>
        </>
       )
    }

    


}


export default CallTreeResponses;