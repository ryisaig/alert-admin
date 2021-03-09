import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
  
class MyAccount extends React.Component {

    state = {
        title: "My Account",
        isSearchable: false,
        isPrintable: false,
        isCreatable: false,
        createUrl: "/users/create",
        columns: [
            {dataField: "schoolId", text: "School ID", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "password", text: "Password", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            }},
            {dataField: "email", text: "Email", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            }},
            {dataField: "userStatus", text: "Status", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "roleList", text: "Roles", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '150px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '180px'};
                },
                formatter: (cell, row) => (
                    <> 
                        <Button as={Link} variant="outline-info" to={"/my-account/" + row['id']+ "/edit"}>Edit</Button>
                       
                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    async modifyStatus(id, row){
        swal({
            title: "Are you sure?",
            text: "You are modifying the status of this user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willModify) => {
            if (willModify) {
                const params = {
                    requestId: GenericRequest().requestId,
                    session: {
                        sessionValue: GenericRequest().sessionValue,
                        sessionId: GenericRequest().sessionId,
                        username: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    'user' : row
                }
                axios.post(BASE_SERVER_URL + 'user/' + id,  params)
                    .then(res => {
                        swal("Success!", "User status has been modified", "success").then(()=>{
                            this.getUsers();
                        })
                        
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            }
          });
    }

    getUsers(){
        axios.get(BASE_SERVER_URL + 'user',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            res.data.forEach(function(user){
                let roleList = "";
                user.roles.map(function(role, i){
                    roleList += role.roleName;
                    roleList += (i == (user.roles.length - 1)) ? '' : ', ';
                })
                user['password'] = "*********";
                user['roleList'] = roleList;
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getUsers();
    }

    componentWillMount(){
        this.getUsers();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default MyAccount;