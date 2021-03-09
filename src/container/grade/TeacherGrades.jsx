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
import { Create, DeleteOutline, ImageSearch } from '@material-ui/icons';
  
class TeacherGrades extends React.Component {
   username =  sessionStorage.getItem("luna_user");
    state = {
        title: "Grades",
        isSearchable: true,
        isPrintable: true,
        isCreatable: false,
        createUrl: "/grades/create",
        disableReload: true,
        disableSubmitButton: true,
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
            {dataField: "grade", text: "Grade", sort: true,
                formatter: (cell, row) => (
                    <>  
                        {
                           cell > 3 ? <span style={{color: "#BF360C"}}>{cell}</span>: <span>{cell}</span>
                        }
                        
                    </>
                )},  
            {dataField: "removalGrade", text: "Removal Grade", sort: true},  
            {dataField: "finalGrade", text: "Final Grade", sort: true},  
            {dataField: "creditUnit", text: "Credit Unit", sort: true},
            {dataField: "status", text: "Status", sort: true},

            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                },
                formatter: (cell, row) => (
                    <>  
                         {/* <Button as={Link} variant="outline-info"  to={"/grade/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
                        <Button as={Link} variant="outline-info"  to={"/grades/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        {/* <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

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
                this.filterUpdated(fields, "schoolYear")
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
                this.filterUpdated(fields, "semester")
            }.bind(this)},           
            {field: 'class', label: "Class", options: [], onChange: function(e){

                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "class"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields, "class")
            }.bind(this)},

        ]
    }

    getGrades(){
        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'grade/byClass',   { params: {...GenericRequest(), classId: classId, keyword: this.state.keyword}}).then(res => {
            let allGradedAndDraft = true;
            res.data.forEach(function(item){
                if(item['grade'] == null || item['grade'] == 0 || item['status'] != "DRAFT"){
                    allGradedAndDraft = false;
                }
                item['student'] = item.student.studentNumber;
                item['classCode'] = item.enrolledClass.classCode;
                item['subjectCode'] = item.enrolledClass.subject.subjectCode;
                item['grade'] = item['grade'] != 0 ? item['grade'] : '-----';
                item['removalGrade'] = item['removalGrade'] != 0 ? item['removalGrade'] : '-----';
                item['finalGrade'] = item['finalGrade'] != 0 ? item['finalGrade'] : '-----';
                item['creditUnit'] = item['creditUnit'] != 0 ? item['creditUnit'] : '-----';
            })
             this.setState({data: res.data, disableSubmitButton: !allGradedAndDraft})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getGrades();
    }

    filterUpdated(newFilter, field){
        this.setState({filters: newFilter});
        if(field == "semester" || field == "schoolYear"){
            this.getClasss();
        } else {
            this.getGrades();
        }
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
          this.getTeachers();
        })
     }

     getClasss(){
        let filters = this.state.filters;
        let schoolYear = "";
        let semester = 0;
        let teacher = this.username;
        filters.map(function(filter){
            if(filter.field == 'schoolYear'){
                schoolYear = filter.value;
            } else if(filter.field == 'semester'){
                semester = filter.value;
            } 
        })

        axios.get(BASE_SERVER_URL + 'class/byEmployeeId',  
            { params: {...GenericRequest(), keyword: this.state.keyword, schoolYear: schoolYear, semester: semester, employeeId: teacher}})
        .then(res => {
            let classOptions = [];
            res.data.map(function(classObj){
                classOptions.push({key: classObj.id, value: classObj.classCode});          
            });
        
            let filters = this.state.filters;
            filters.forEach(function(filter){
                if(filter.field == 'class'){
                    filter.value = classOptions[0] ? classOptions[0].key: null;
                    filter.options = classOptions;
                }
            })
            this.setState({filters: filters})
            this.getGrades();
        })
    }

    getTeachers(){

        axios.get(BASE_SERVER_URL + 'teacher',  
            { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            let teacherOptions = [];
            res.data.map(function(teacher){
                teacherOptions.push({key: teacher.id, value: teacher.lastName.toUpperCase() + ", " + teacher.firstName });          
            });
        
            let filters = this.state.filters;
            filters.forEach(function(filter){
                if(filter.field == 'teacher'){
                    filter.value = teacherOptions[0] ? teacherOptions[0].key: null;
                    filter.options = teacherOptions;
                }
            })
            this.setState({filters: filters})
            this.getClasss();
        })
    }

    checkNotification(){
        axios.get(BASE_SERVER_URL + 'notification',  { params: {...GenericRequest(), type: "grade"}})
        .then(res => {
            if(res.data){
                this.getGrades();
                axios.post(BASE_SERVER_URL + 'notification?type=grade')
                    .then(res => {})
            }
        })
    }

    submitGrades(){

        let classId = 0;
        let filters = this.state.filters;

        filters.map(function(filter){
            if(filter.field == 'class'){
                classId = filter.value;
            }
        })

        swal({
            title: "Are you sure?",
            text: "You are about to submit the grades of this class.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willSubmitt) => {
            if (willSubmitt) {
                const params = {
                    requestId: GenericRequest().requestId,
                    session: {
                        sessionValue: GenericRequest().sessionValue,
                        sessionId: GenericRequest().sessionId,
                        username: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    application: 'ENROLLMENT_PORTAL',
                    clientIp: ''      
                  }
                  axios.patch(BASE_SERVER_URL + 'grade/' + classId + '/SUBMITTED', params)
                  .then(res => {
                      swal("Success!", "Grades of this class has been submitted", "success").then(()=>{
                        window.location.reload();
                      })
          
                  }).catch( e => {
                      swal("Error!", "Something went wrong", "error");
                  })
            }
          });
    }

    componentWillMount(){
        this.getSchoolYears();
    }
      

      componentDidMount() {
        // this.timer = setInterval(()=> this.checkNotification(), 3000);
       }
         
       componentWillUnmount() {
    //    clearInterval(this.timer)
    //    this.timer = null; // here...
       }

    render(){
        
       return (
           <>
            <Button disabled={this.state.disableSubmitButton} variant="info" style={{marginLeft: '25px'}} onClick={this.submitGrades.bind(this)}>Submit</Button>
            <ViewList values={this.state} sideContent={this.props.sideContent} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
            </>
       )
    }


}

export default TeacherGrades;