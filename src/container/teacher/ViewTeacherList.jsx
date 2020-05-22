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
import { ImageSearch, Create, DeleteOutline } from '@material-ui/icons';
  
class ViewTeacherList extends React.Component {

    state = {
        title: "Teachers",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/teacher/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '10px', textAlign: 'center' };
                }},
            {dataField: "employeeId", text: "Employee ID", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '60px'};
            }},
            {dataField: "lastName", text: "Last Name", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '75px'};
                }},
            {dataField: "firstName", text: "First Name", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '75px'};
            }},
            {dataField: "position", text: "Position", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '75px'};
            }},
            {dataField: "emailAddress", text: "Email Address", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '70px'};
                },
                formatter: (cell, row) => (
                    <>  

                        <Button as={Link} variant="outline-info"  to={"/teacher/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/teacher/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>

                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getTeachers(){
        axios.get(BASE_SERVER_URL + 'teacher',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getTeachers();
    }
    async delete(id){
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this when deleted?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(BASE_SERVER_URL + 'teacher/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Teacher has been deleted", "success").then(()=>{
                            this.getTeachers();
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

    componentWillMount(){
        this.getTeachers();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewTeacherList;