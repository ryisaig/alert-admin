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
  
class ViewStudentList extends React.Component {

    state = {
        title: "Students",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/student/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '10px', textAlign: 'center' };
                }},
            {dataField: "studentNumber", text: "Student Number", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '60px'};
            }},
            {dataField: "lastName", text: "Last Name", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '50px'};
                }},
            {dataField: "firstName", text: "First Name", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '50px'};
            }},
            {dataField: "courseName", text: "Course", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '50px'};
            }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  
                        
                       <Button as={Link} variant="outline-info"  to={"/student/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/student/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>

                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getStudents(){
        axios.get(BASE_SERVER_URL + 'student',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            res.data.forEach(function(student){
                if(student.course){
                    student['courseName'] = student.course.courseCode;
                }
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getStudents();
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
                axios.delete(BASE_SERVER_URL + 'student/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Student has been deleted", "success").then(()=>{
                            this.getStudents();
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
        this.getStudents();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewStudentList;