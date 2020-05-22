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
  
class StudentGrades extends React.Component {

    state = {
        title: "Grades",
        isSearchable: false,
        isPrintable: true,
        isCreatable: false,
        createUrl: "/grade/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "student", text: "Student", sort: true}, 
 
            {dataField: "classCode", text: "Class Code", sort: true},
            // {dataField: "GradeType", text: "Grade Type", sort: true},
            {dataField: "subjectCode", text: "Subject Code", sort: true},  
            {dataField: "unit", text: "Unit", sort: true},
            {dataField: "grade", text: "Grade", sort: true},  
            {dataField: "removalGrade", text: "Removal Grade", sort: true},  
            {dataField: "finalGrade", text: "Final Grade", sort: true},  
            {dataField: "creditUnit", text: "Credit Unit", sort: true},
            //{dataField: "status", text: "Status", sort: true},

            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/grade/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} variant="outline-info"  to={"/grade/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        {/* <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

                    </>
                )},
        ],
        data: [],
        keyword: '',
        filters: [
            {field: 'schoolYear', label: "School Year", options: [], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field, i){
                  if(field.field == "schoolYear"){
                    field.value = e.target.value;
                  }
                })
                this.filterUpdated(fields)
            }.bind(this)
            },
            {field: 'semester', label: "Semester", value: 1, options: [{key: 1, value: "First"},{key: 2, value: "Second"}],
            onChange: function(e){

                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "semester"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this)},
            {field: 'student', label: "Student", options: [], onChange: function(e){

                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "student"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this)}
        ]
    }
    filterUpdated(newFilter){
        this.setState({filters: newFilter});
        this.getGrades();
    }

    getGrades(){
        let studentId = 0
        let schoolYear = "";
        let semester = 0;

        let filters = this.state.filters;
        
        filters.map(function(filter){
            if(filter.field == 'schoolYear'){
                schoolYear = filter.value;
            } else if(filter.field == 'semester'){
                semester = filter.value;
            } else if(filter.field == 'student'){
                studentId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'grade/byStudent',   { params: {...GenericRequest(), studentId: studentId, schoolYear: schoolYear, semester: semester}}).then(res => {
            res.data.forEach(function(item){
                item['student'] = item.student.studentNumber;
                item['classCode'] = item.enrolledClass.classCode;
                item['subjectCode'] = item.enrolledClass.subject.subjectCode;
             })
             this.setState({data: res.data})
        })
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
          let syMap = {};
          let defaultSy = {};
          let defaultSem = 0;
          res.data.map(function(sy){
            let schoolYearStr = sy['schoolYearStart'] + "-" + sy['schoolYearEnd'];
            if(sy['current']){
                defaultSy = {key: schoolYearStr, value: schoolYearStr};
                defaultSem = "" + sy['semester'];
            }
            if(!syMap[schoolYearStr]){
                syOptions.push({key: schoolYearStr, value: schoolYearStr});     
                syMap[schoolYearStr] =  schoolYearStr;
            }
          });
    
          let filters = this.state.filters;
          filters.forEach(function(filter){
            if(filter.field == 'schoolYear'){
                filter.value = defaultSy ? defaultSy.key: null;
                filter.options = syOptions;
            } else if(filter.field == 'semester'){
                filter.value = defaultSem;
            }
          })
          this.setState({filters: filters})
          this.getStudents();
        })
     }

    
     getStudents(){
        axios.get(BASE_SERVER_URL + 'student',  { params: {...GenericRequest(), keyword: ""}})
        .then(res => {
          let stOptions = [];
          let defaultSt = {key: res.data[0].id, value: res.data[0].studentNumber}
          res.data.map(function(st){
            stOptions.push({key: st.id, value: st.studentNumber});     
          });
    
          let filters = this.state.filters;
          filters.forEach(function(filter){
            if(filter.field == 'student'){
                filter.value = defaultSt ? defaultSt.key: null;
                filter.options = stOptions;
            }
          })
          this.setState({filters: filters})
          this.getGrades();
        })
     }


    componentWillMount(){
        this.getSchoolYears();
   
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default StudentGrades;