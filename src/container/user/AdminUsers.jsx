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
  
class AdminUsers extends React.Component {

    state = {
        title: "Admin Users",
        isSearchable: false,
        isPrintable: false,
        isCreatable: sessionStorage.getItem("call_tree_role") !== "brgy",
        createUrl: "/roles/create",
        originalData: [],
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "username", text: "Username", sort: true},
            {dataField: "name", text: "Name", sort: true},
            {dataField: "role", text: "Role", sort: true},
            {dataField: "brgy", text: "Brgy", sort: true},
            // {dataField: "createdBy", text: "Created By", sort: true},
            {dataField: "createdDate", text: "Date Created", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  
                        <Button as={Link} variant="outline-primary" onClick={()=> this.setState({openEditModal: true, currentUser: row})}><Create/></Button>&nbsp;
                        {row.name !== sessionStorage.getItem("call_tree_name") && <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>}
                    </>
                )},
        ],
    
        data: [],
        keyword: '',
        openModal: false,
        openEditModal: false,
        handleShow: this.handleShow.bind(this),
        user: {},
        currentUser: {},
        filters: sessionStorage.getItem("call_tree_role") !== "brgy" ? [
            {field: 'brgy', label: "Brgy", options: [{key: "", value: ""},{key: "Asisan", value: "Asisan"},
            {key: "Bagong Tubig", value: "Bagong Tubig"},
            {key: "Calabuso", value: "Calabuso"},
            {key: "Dapdap East", value: "Dapdap East"},
            {key: "Dapdap West", value: "Dapdap West"},
            {key: "Francisco", value: "Francisco"},
            {key: "Guinhawa North", value: "Guinhawa North"},
            {key: "Guinhawa South", value: "Guinhawa South"},
            {key: "Iruhin Central", value: "Iruhin Central"},
            {key: "Iruhin East", value: "Iruhin East"},
            {key: "Iruhin West", value: "Iruhin West"},
            {key: "Kaybagal Central", value: "Kaybagal Central"},
            {key: "Kaybagal North", value: "Kaybagal North"},
            {key: "Kaybagal South", value: "Kaybagal South"},
            {key: "Mag-asawang Ilat", value: "Mag-asawang Ilat"},
            {key: "Maharlika East", value: "Maharlika East"},
            {key: "Maharlika West", value: "Maharlika West"},
            {key: "Maitim II Central", value: "Maitim II Central"},
            {key: "Maitim II East", value: "Maitim II East"},
            {key: "Maitim II West", value: "Maitim II West"},
            {key: "Mendez Crossing East", value: "Mendez Crossing East"},
            {key: "Mendez Crossing West", value: "Mendez Crossing West"},
            {key: "Neogan", value: "Neogan"},
            {key: "Patutong Malaki North", value: "Patutong Malaki North"},
            {key: "Patutong Malaki South", value: "Patutong Malaki South"},
            {key: "Sambong", value: "Sambong"},
            {key: "San Jose", value: "San Jose"},
            {key: "Silang Crossing East", value: "Silang Crossing East"},
            {key: "Silang Crossing West", value: "Silang Crossing West"},
            {key: "Sungay East", value: "Sungay East"},
            {key: "Sungay West", value: "Sungay West"},
            {key: "Tolentino East", value: "Tolentino East"},
            {key: "Tolentino West", value: "Tolentino West"},
            {key: "Zambal", value: "Zambal"}], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field, i){
                  if(field.field == "brgy"){
                    field.value = e.target.value;
                  }
                })
                this.filterUpdated(fields, "brgy", e.target.value)
            }.bind(this)
            }
        ]: [],
    }

    filterUpdated(fields, brgy, value){
       
        const users = this.state.originalData.filter((item) => {
            return item.brgy === value;
        })

        if(value === ''){
            this.setState({data: this.state.originalData});
        } else {
            this.setState({data: users});
        }
    }

    getRole(){
        axios.get(BASE_SERVER_URL + 'access',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {

            res.data.filter(i => {

            })

            let result = [];
            if(sessionStorage.getItem("call_tree_role") === 'brgy'){
                result = res.data.filter(i => i.username === sessionStorage.getItem("call_tree_username"));
            } else {
                result = res.data;
            }
            this.setState({data: result, originalData: result})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }


    delete(id){

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this when deleted?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(BASE_SERVER_URL + 'access/' + id)
                .then(res => {
                    this.getRole();   
                    }).catch(e=>{
                        swal("Error!", "Something went wrong!", "error");
                    })
            }
          });
        
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

       handleUpdateClose(){
        this.setState({openEditModal: false});
       } 
    
       handleUpdate() {
        const params = {...this.state.currentUser};
    
        axios.post(BASE_SERVER_URL + 'access', params)
        .then(res => {
            
                swal("Success!", "You have successfully updated a user", "success");
                this.getRole();
            
        }).catch( e => {
            swal("Success!", "You have successfully updated a user", "success");
                this.getRole();
        })
    
        this.setState({openEditModal: false});
       }

       handleSubmit(){
        const params = {...this.state.user};
    
        axios.post(BASE_SERVER_URL + 'access', params)
        .then(res => {
            
                swal("Success!", "You have successfully created a user", "success");
                this.getRole();
            
        }).catch( e => {
            swal("Success!", "You have successfully created a user", "success");
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
                <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <label>Username</label>
                    <input  id="username" type="text" required className="form-control" placeholder="Username" onChange={(e) => {this.setState({user: {...this.state.user, username: e.target.value}})}}/>
                </div>
                <div className="form-group">
                <label>Password</label>
                    <input  id="password" type="password" required className="form-control" placeholder="Password" onChange={(e) => {this.setState({user: {...this.state.user, password: e.target.value}})}}/>
                </div>
                <div className="form-group">
                <label>Name</label>
                    <input  id="name" type="text" required className="form-control" placeholder="Name" onChange={(e) => {this.setState({user: {...this.state.user, name: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select  id="role" type="text" required className="form-control" placeholder="Role" onChange={(e) => {this.setState({user: {...this.state.user, role: e.target.value}})}}>
                         <option value="admin">Admin</option>
                        <option value="brgy">Barangay Personell</option>
                    </select>
                </div>
                <div className="form-group">
                <label>Brgy</label>
                    <select  id="brgy" type="text" disabled={this.state.user.role !== 'brgy'} required className="form-control" placeholder="Brgy" onChange={(e) => {this.setState({user: {...this.state.user, brgy: e.target.value}})}}>
                        <option value={null}>-</option>
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


           {/* edit */}
            <Modal show={this.state.openEditModal} onHide={this.handleUpdateClose.bind(this)}>
                <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <label>Username</label>
                    <input  id="username" type="text" required className="form-control" placeholder="Username" value={this.state.currentUser.username} onChange={(e) => {this.setState({currentUser: {...this.state.currentUser, username: e.target.value}})}}/>
                </div>
                <div className="form-group">
                <label>Password</label>
                    <input  id="password" type="password" required className="form-control" placeholder="Password" value={this.state.currentUser.password} onChange={(e) => {this.setState({currentUser: {...this.state.currentUser, password: e.target.value}})}}/>
                </div>
                <div className="form-group">
                <label>Name</label>
                    <input  id="name" type="text" required className="form-control" placeholder="Name" value={this.state.currentUser.name} onChange={(e) => {this.setState({currentUser: {...this.state.currentUser, name: e.target.value}})}}/>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select  id="role" type="text" disabled={sessionStorage.getItem('call_tree_role') === 'brgy'} required className="form-control" placeholder="Role" value={this.state.currentUser.role}  onChange={(e) => {this.setState({currentUser: {...this.state.currentUser, role: e.target.value}})}}>
                    <option value="admin">Admin</option>
                        <option value="brgy">Barangay Personell</option>
                    </select>
                </div>
                <div className="form-group">
                <label>Brgy</label>
                    <select  id="brgy" type="text" disabled={this.state.currentUser.role !== 'brgy'} value={this.state.currentUser.brgy}  required className="form-control" placeholder="Brgy" onChange={(e) => {this.setState({currentUser: {...this.state.currentUser, brgy: e.target.value}})}}>
                        <option value={null}>-</option>
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
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleUpdateClose.bind(this)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleUpdate.bind(this)}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
           </>)
    }


}

export default AdminUsers;