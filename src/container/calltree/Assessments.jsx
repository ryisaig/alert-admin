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
import { ImageSearch, Create, DeleteOutline, Print } from '@material-ui/icons';
  
class Assessments extends React.Component {

    state = {
        title: "Assessments",
        isSearchable: false,
        isPrintable: false,
        isCreatable: true,
        createUrl: "/roles/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "brgy", text: "Brgy", sort: true},
            {dataField: "type", text: "Type", sort: true},
            {dataField: "weather", text: "Weather", sort: true},
            {dataField: "createdBy", text: "Reported By", sort: true},
            {dataField: "createdDate", text: "Date Reported", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  
                        <Button as={Link} variant="outline-info" onClick={() => window.open(
            `${BASE_SERVER_URL}assessment/print/${row.id}`,
            '_blank' // <- This is what makes it open in a new window.
          )}><Print/></Button>
                    </>
                )},
        ],
        
        data: [],
        keyword: '',
        openModal: false,
        handleShow: this.handleShow.bind(this),
        alert: {
            brgy: sessionStorage.getItem("call_tree_brgy") ? sessionStorage.getItem("call_tree_brgy") : "Tagaytay City",
            createdBy: sessionStorage.getItem("call_tree_name"),
            incident: "None",
            familiesAffected: "None",
            personsAffected: "None",
            evacuatedFamilies: "None",
            dead: 0,
            injured: 0,
            missing: 0,
            totallyDamagedHouse: "None",
            partiallyDamagedHouse: "None",
            damagedSchool: "None",
            damagedHospital: "None",
            damagedGovtOffice: "None",
            damagedMarket: "None",
            otherDamages: "None",
            affectedNationalRoad: "None",
            affectedCityRoad: "None",
            affectedBrgyRoad: "None",
            affectedCommunication: "None",
            powerInterruption: "None",
            waterShortage: "None",
            damagedAgriculture: "None"
        }
    }

    getRole(){
        axios.get(BASE_SERVER_URL + 'assessment',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            if(sessionStorage.getItem("call_tree_role") === "brgy"){
                const result = res.data.filter(item => {
                    return item.brgy === sessionStorage.getItem("call_tree_brgy")
                })
                this.setState({data: result})
            } else {
                this.setState({data: res.data})
            }
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
                <h5>Profile of the event</h5>
               

                <div className="form-group">
                    <label>Type</label>
                    <input  id="type" type="text" required className="form-control" placeholder="Eg. National and Local Election 2022" onChange={(e) => {this.setState({alert: {...this.state.alert, type: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Weather</label>
                    <input  id="weather" type="text" required className="form-control" placeholder="Eg. Mostly sunny" onChange={(e) => {this.setState({alert: {...this.state.alert, weather: e.target.value}})}}/>
                </div>
                <h5>Summary of Event</h5>
                {/* <div className="form-group">
                    <label>Area covered</label>
                    <input  id="brgy" type="text" required className="form-control" placeholder="Brgy"  onChange={(e) => {this.setState({alert: {...this.state.alert, brgy: e.target.value}})}}/>
                </div> */}
                <div>
                <label>Covered Area/s</label>
                    <select  id="brgy" type="text" disabled={sessionStorage.getItem("call_tree_role") === "brgy"} required className="form-control" value={this.state.alert.brgy} placeholder="Brgy" onChange={(e) => {this.setState({alert: {...this.state.alert, brgy: e.target.value}})}}>
                        <option value="Tagaytay City">Tagaytay City</option>
                        <option value="Asisan">Brgy Asisan</option>
                        <option value="Bagong Tubig">Brgy Bagong Tubig</option>
                        <option value="Calabuso">Brgy Calabuso</option>
                        <option value="Dapdap East">Brgy Dapdap East</option>
                        <option value="Dapdap West">Brgy Dapdap West</option>
                        <option value="Francisco">Brgy Francisco</option>
                        <option value="Guinhawa North">Brgy Guinhawa North</option>
                        <option value="Guinhawa South">Brgy Guinhawa South</option>
                        <option value="Iruhin Central">Brgy Iruhin Central</option>
                        <option value="Iruhin East">Brgy Iruhin East</option>
                        <option value="Iruhin West">Brgy Iruhin West</option>
                        <option value="Kaybagal Central">Brgy Kaybagal Central</option>
                        <option value="Kaybagal North">Brgy Kaybagal North</option>
                        <option value="Kaybagal South">Brgy Kaybagal South</option>
                        <option value="Mag-asawang Ilat">Brgy Mag-asawang Ilat</option>
                        <option value="Maharlika East">Brgy Maharlika East</option>
                        <option value="Maharlika West">Brgy Maharlika West</option>
                        <option value="Maitim II Central">Brgy Maitim II Central</option>
                        <option value="Maitim II East">Brgy Maitim II East</option>
                        <option value="Maitim II West">Brgy Maitim II West</option>
                        <option value="Mendez Crossing East">Brgy Mendez Crossing East</option>
                        <option value="Mendez Crossing West">Brgy Mendez Crossing West</option>
                        <option value="Neogan">Brgy Neogan</option>
                        <option value="Patutong Malaki North">Brgy Patutong Malaki North</option>
                        <option value="Patutong Malaki South">Brgy Patutong Malaki South</option>
                        <option value="Sambong">Brgy Sambong</option>
                        <option value="San Jose">Brgy San Jose</option>
                        <option value="Silang Crossing East">Brgy Silang Crossing East</option>
                        <option value="Silang Crossing West">Brgy Silang Crossing West</option>
                        <option value="Sungay East">Brgy Sungay East</option>
                        <option value="Sungay West">Brgy Sungay West</option>
                        <option value="Tolentino East">Brgy Tolentino East</option>
                        <option value="Tolentino West">Brgy Tolentino West</option>
                        <option value="Zambal">Brgy Zambal</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Untoward Incident</label>
                    <input  id="incident" type="text" required className="form-control" value={this.state.alert.incident} placeholder="Eg. 1 person has been hospitalized" onChange={(e) => {this.setState({alert: {...this.state.alert, incident: e.target.value}})}}/>
                </div>
                <h6>Population Affected</h6>
                <div className="form-group">
                    <label>Families</label>
                    <input  id="familiesAffected" type="text"  value={this.state.alert.familiesAffected} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, familiesAffected: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Persons</label>
                    <input  id="personsAffected" type="text" value={this.state.alert.personsAffected} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, personsAffected: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Population displaced at the evacuation center (Families)</label>
                    <input  id="evacuatedFamilies" type="text" value={this.state.alert.evacuatedFamilies} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, evacuatedFamilies: e.target.value}})}}/>
                </div>
                <h6>Casualties</h6>
                <div className="form-group">
                    <label>Dead</label>
                    <input  id="dead" type="number" required value={this.state.alert.dead} className="form-control" placeholder="Eg: 0" onChange={(e) => {this.setState({alert: {...this.state.alert, dead: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Injured</label>
                    <input  id="injured" type="number" required value={this.state.alert.injured} className="form-control" placeholder="Eg: 0" onChange={(e) => {this.setState({alert: {...this.state.alert, injured: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Missing</label>
                    <input  id="missing" type="number" required value={this.state.alert.missing} className="form-control" placeholder="Eg: 0" onChange={(e) => {this.setState({alert: {...this.state.alert, missing: e.target.value}})}}/>
                </div>
                <h6>Damaged Properties</h6>
                <div className="form-group">
                    <label>Partially Damaged Houses</label>
                    <input  id="partiallyDamagedHouse" value={this.state.alert.partiallyDamagedHouse}  type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, partiallyDamagedHouse: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Fully Damaged Houses</label>
                    <input  id="totallyDamagedHouse" value={this.state.alert.totallyDamagedHouse} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, totallyDamagedHouse: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>School Building</label>
                    <input  id="damagedSchool" type="text" value={this.state.alert.damagedSchool} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedSchool: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Hospital</label>
                    <input  id="damagedHospital" type="text" value={this.state.alert.damagedHospital} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedHospital: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Govt Office</label>
                    <input  id="damagedGovtOffice" type="text" value={this.state.alert.damagedGovtOffice} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedGovtOffice: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Public Market</label>
                    <input  id="damagedMarket" type="text" value={this.state.alert.damagedMarket} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedMarket: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Other Damages</label>
                    <input  id="otherDamages" type="text" value={this.state.alert.otherDamages} required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, otherDamages: e.target.value}})}}/>
                </div>
                <h6>Affected Lifelines</h6>
                <div className="form-group">
                    <label>National Road</label>
                    <input  id="affectedNationalRoad" value={this.state.alert.affectedNationalRoad} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, affectedNationalRoad: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>City Road</label>
                    <input  id="affectedCityRoad" value={this.state.alert.affectedCityRoad} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, affectedCityRoad: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Brgy Road</label>
                    <input  id="affectedBrgyRoad" value={this.state.alert.affectedBrgyRoad} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, affectedBrgyRoad: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Communication Facilities</label>
                    <input  id="affectedCommunication" value={this.state.alert.affectedCommunication} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, affectedCommunication: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Power Interruption</label>
                    <input  id="powerInterruption" value={this.state.alert.powerInterruption} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, powerInterruption: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Water Shortage</label>
                    <input  id="waterShortage" value={this.state.alert.waterShortage} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, waterShortage: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Damage to Agricultural Products</label>
                    <input  id="damagedAgriculture" value={this.state.alert.damagedAgriculture} type="text" required className="form-control" placeholder="Eg: None" onChange={(e) => {this.setState({alert: {...this.state.alert, damagedAgriculture: e.target.value}})}}/>
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

export default Assessments;