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
import { ImageSearch, DeleteOutline, Create } from '@material-ui/icons';
  
class ViewCourseList extends React.Component {

    state = {
        title: "Courses",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/course/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "courseCode", text: "Course Code", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
                }},
            {dataField: "courseName", text: "Description", sort: true},
            {dataField: "courseType", text: "Type", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
            }},
            {dataField: "college", text: "College", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  
                     <Button as={Link} variant="outline-info"  to={"/course/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/course/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>

                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getCourses(){
        axios.get(BASE_SERVER_URL + 'course',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            res.data.forEach(function(course){
                if(course.college){
                    course['college'] = course.college.collegeCode;
                }
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getCourses();
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
                axios.delete(BASE_SERVER_URL + 'course/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Course has been deleted", "success").then(()=>{
                            this.getCourses();
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
        this.getCourses();
    }


    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewCourseList;