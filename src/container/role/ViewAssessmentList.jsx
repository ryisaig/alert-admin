import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Form, Modal } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
import { ImageSearch, Create, DeleteOutline } from '@material-ui/icons';
  
class ViewAssessmentList extends React.Component {

    state = {
        title: "Assessments",
        isSearchable: false,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/roles/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "casualties", text: "Casualties", sort: true},
            {dataField: "damagedInfra", text: "Damaged Infrastructure", sort: true},
            {dataField: "livestock", text: "Livestock", sort: true},
            {dataField: "remarks", text: "Remarks", sort: true}

            // {dataField: "actions", text: "Actions", sort: true, 
            //     headerStyle: (colum, colIndex) => {
            //         return { width: '185px'};
            //     },
            //     formatter: (cell, row) => (
            //         <>  
            //              <Button as={Link} variant="outline-info"  to={"/roles/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
            //             <Button as={Link} variant="outline-info"  to={"/roles/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
            //             <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>
            //         </>
            //     )},
        ],
    
        data: [],
        keyword: '',
        openModal: false,
        handleShow: this.handleShow.bind(this),
        alert: {}
    }

    getRole(){
        axios.get(BASE_SERVER_URL + 'assessment',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getRole();
    }
    // async delete(id){
    //     swal({
    //         title: "Are you sure?",
    //         text: "You will not be able to recover this when deleted?",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //       })
    //       .then((willDelete) => {
    //         if (willDelete) {
    //             axios.delete(BASE_SERVER_URL + 'role/' + id,  { params: {...GenericRequest()}})
    //                 .then(res => {
    //                     swal("Success!", "Role has been deleted", "success").then(()=>{
    //                         this.getRole();
    //                     })
                        
    //                 }).catch(e=>{
    //                     if(e.response.data){
    //                         swal("Error!", e.response.data, "error");
    //                     } else {
    //                         swal("Error!", e.message, "error");
    //                     }
    //                 })
    //         }
    //       });
    // }

    componentWillMount(){
        this.getRole();
    }

    handleClose(){
        this.setState({openModal: false});
       } 
    
       handleSubmit(){
        const params = {assessment: this.state.alert};
    
        axios.post(BASE_SERVER_URL + 'assessment', params)
        .then(res => {
            
                swal("Success!", "You have successfully created an assessment", "success");
                this.getRole();
            
        }).catch( e => {
            swal("Success!", "You have successfully created an assessment", "success");
                this.getRole();
        })
    
        this.setState({openModal: false});
       } 
    
       handleShow(){
        this.setState({openModal: true});
       }
    

    render(){
       return (<><ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
           <Modal show={this.state.openModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Create Assessment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <input  id="subject" type="text" required className="form-control" placeholder="Subject" onChange={(e) => {this.setState({alert: {...this.state.alert, subject: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <input  id="casualties" type="text" required className="form-control" placeholder="Casualties" onChange={(e) => {this.setState({alert: {...this.state.alert, casualties: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <input  id="damagedInfra" type="text" required className="form-control" placeholder="Damaged Infrastructure" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedInfra: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <input  id="livestock" type="text" required className="form-control" placeholder="Livestock" onChange={(e) => {this.setState({alert: {...this.state.alert, livestock: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <input  id="remarks" type="text" required className="form-control" placeholder="Remarks" onChange={(e) => {this.setState({alert: {...this.state.alert, remarks: e.target.value}})}}/>
                </div>
                
                
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
           </>)
    }


}

export default ViewAssessmentList;