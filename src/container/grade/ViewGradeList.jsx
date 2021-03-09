import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Tab, Tabs } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
import TeacherGrades from './TeacherGrades';
import { ImageSearch, Create, DeleteOutline } from '@material-ui/icons';
  
class ViewGradeList extends React.Component {

    state = {
        title: "My Students",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/grades/create",
        disableReload: true,
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "student", text: "Student", sort: true}, 
 
            {dataField: "classCode", text: "Class Code", sort: true},
            // {dataField: "GradeType", text: "Grade Type", sort: true},
            {dataField: "subjectCode", text: "Subject Code", sort: true},  
              
                {dataField: "creditUnit", text: "Credit Unit", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/grade/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} variant="outline-info"  to={"/grades/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        {/* <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

                    </>
                )},
        ],
        data: [],
        keyword: '',
        filters: [
            {field: 'schoolYear', label: "School Year", options: []},
            {field: 'semester', label: "Semester", options: [{key: 1, value: "First"},{key: 3, value: "Second"}]}
        ]
    }

    getGrades(){
       
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getGrades();
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
                axios.delete(BASE_SERVER_URL + 'Grade/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Grade has been deleted", "success").then(()=>{
                            this.getGrades();
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

    getSchoolYears(){
        axios.get(BASE_SERVER_URL + 'schoolYearSemester',  { params: {...GenericRequest(), keyword: ""}})
        .then(res => {
          let syOptions = [];
          res.data.map(function(sy){
            let schoolYearStr = sy['schoolYearStart'] + "-" + sy['schoolYearEnd'];
              syOptions.push({key: schoolYearStr, value: schoolYearStr});          
          });
    
          let filters = this.state.filters;
          filters.forEach(function(filter){
            if(filter.field == 'schoolYear'){
                filter.value = syOptions[0] ? syOptions[0].value: null;
                filter.options = syOptions;
            }
          })
          this.setState({filters: filters})
          //this.getClass();
        })
     }

     getClasss(){
        let filters = this.state.filters;
        let schoolYear = "";
        let semester = 0;

        filters.map(function(filter){
            if(filter.field == 'schoolYear'){
                schoolYear = filter.value;
            } else if(filter.field == 'semester'){
                semester = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'class',  
            { params: {...GenericRequest(), keyword: this.state.keyword, schoolYear: schoolYear, semester: semester}})
        .then(res => {
            let classOptions = [];
            res.data.map(function(classObj){
                classOptions.push({key: classObj.id, value: classObj.classCode});          
            });
        
            let filters = this.state.filters;
            filters.forEach(function(filter){
                if(filter.field == 'class'){
                    filter.value = classOptions[0] ? classOptions[0].value: null;
                    filter.options = classOptions;
                }
            })
            this.getGrades();
            this.setState({filters: filters})

        })
    }

  

    componentWillMount(){
        this.getSchoolYears();
   
    }

    render(){
        return(
            <div>          
                <TeacherGrades  sideContent={this.props.children} />                 
            </div>
        )
    }


}

export default ViewGradeList;