import React from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
import { ImageSearch, DeleteOutline, Create, CheckCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
  
class EnrollmentList extends React.Component {

    state = {
        title: "Enrollments",
        isSearchable: true,
        isPrintable: true,
        isCreatable: false,
        createUrl: "/course/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "studentNumber", text: "Student No.", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '130px'};
                }},
            {dataField: "name", text: "Name", sort: true},
            {dataField: "courseCode", text: "Course", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "year", text: "Year", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '90px'};
                }},
            {dataField: "totalUnits", text: "Total Units", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '110px'};
                }},
            {dataField: "studentType", text: "Type", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "createdBy", text: "Submitted By", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '150px'};
                }},
            {dataField: "createdDateTime", text: "Date Submitted", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '180px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '238px'};
                },
                formatter: (cell, row) => (
                    <>  
                     {
                         row['type'] == 'NEW' ? (
                             <> 
                                <Button as={Link} variant="outline-info"  to={"/enrollment/" + row['id']+ "/new/details"}><ImageSearch/></Button>&nbsp;

                            {row['status'] == 'PENDING' || row['status'] == 'CONFIRMED' && <>
                            <Button as={Link} variant="outline-info"  to={"/enrollment/" + row['id']+ "/new/edit"}><Create/></Button>&nbsp;</>}
                            </>
                         )  : (
                             <>
                              <Button as={Link} variant="outline-info"  to={"/enrollment/" + row['id']+ "/old/details"}><ImageSearch/></Button>&nbsp;

                              {row['status'] == 'PENDING' || row['status'] == 'CONFIRMED' && <><Button as={Link} variant="outline-info"  to={"/enrollment/" + row['id']+ "/old/edit"}><Create/></Button>&nbsp;</>}
                             </>
                         )
                     }
                        
                    {
                        row['status'] == 'PENDING' && (<><Button as={Link} variant="outline-success" to="#" onClick={()=>this.confirm(row['studentNumber'], row['id'])}><CheckCircleOutline/></Button>&nbsp;</>)
                    } 
                    {
                        row['status'] == 'PENDING' && (<Button as={Link} variant="outline-danger" to="#" onClick={()=>this.discard(row['studentNumber'], row['id'])}><RemoveCircleOutline/></Button>)
                    }
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
            }.bind(this)},
            {field: 'semester', label: "Semester", options: [{key: 1, value: "First"},{key: 2, value: "Second"}], onChange: function(e){

                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "semester"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this)},
            {field: 'course', label: "Course", options: [{key: "", value: "All Courses"}], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "course"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this), value: ""},
            {field: 'yearLevel', label: "Year Level", value: 0,options: [{key: 0, value: "All Levels"},{key: 1, value: "1st"},{key: 2, value: "2nd"},{key: 3, value: "3rd"},{key: 4, value: "4th"},{key: 5, value: "5th"}], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "yearLevel"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this)},
            {field: 'status', label: "Status", value: 1, options: [{key: 1, value: "PENDING"},{key: 0, value: "CONFIRMED"},{key: 2, value: "DISCARDED"}], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "status"){
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
        this.getEnrollments();

    }

    getCourses(){
        axios.get(BASE_SERVER_URL + 'course',  { params: {...GenericRequest(), keyword: ""}})
        .then(res => {

          let courseOptions = [];
          let objectReference={0:null};
          res.data.map(function(course){
            courseOptions.push({key: course['courseCode'], value: course['courseCode']});
            objectReference[course['id']]=course;
          },
          )
  
          let filters = this.state.filters;
          filters.forEach(function(field){
            if(field.field === 'course'){
              field.options.push(...courseOptions)
            }
          })
          
          this.setState({filters: filters})
          this.getSchoolYears();
        })
    }

    confirm(studentNumber, id){
        swal("You are about to confirm the enrollment of " + studentNumber  + ". Please enter the receipt number.", {
            content: "input",
          })
          .then((value) => {
            if(value){
                const params = {
                    requestId: GenericRequest().requestId,
                    session: {
                        sessionValue: GenericRequest().sessionValue,
                        sessionId: GenericRequest().sessionId,
                        username: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    enrollment: {
                        receiptNumber: value
                    }
                }
                axios.patch(BASE_SERVER_URL + 'enrollment/confirm/' + id,  params)
                    .then(res => {
                        swal("Success!", "Enrollment of " + studentNumber + " has been confirmed with receipt : " + value, "success");    
                        this.getEnrollments();                    
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            } else {
                swal("Error!", "Receipt of payment is required", "error");
            }
          });
    }

    discard(studentNumber, id){
        swal("You are about to discard the enrollment of " + studentNumber  + ". Please enter the reason.", {
            content: "input",
          })
          .then((value) => {
            if(value){
                const params = {
                    requestId: GenericRequest().requestId,
                    session: {
                        sessionValue: GenericRequest().sessionValue,
                        sessionId: GenericRequest().sessionId,
                        username: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    enrollment: {
                        receiptNumber: value
                    }
                }
                axios.patch(BASE_SERVER_URL + 'enrollment/discard/' + id,  params)
                    .then(res => {
                        swal("Success!", "Enrollment of " + studentNumber + " has been discarded with reason : " + value, "success");   
                        this.getEnrollments();            
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            } else {
                swal("Error!", "Reason of discard is required", "error");
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
          this.getEnrollments();
        })
     }

    getEnrollments(){

        let filters = this.state.filters;
        let schoolYear = "";
        let semester = 0;
        let course = '';
        let yearLevel = 1;
        let status = 0;


        filters.map(function(filter){
            if(filter.field == 'schoolYear'){
                schoolYear = filter.value;
            } else if(filter.field == 'semester'){
                semester = filter.value;
            } else if(filter.field == 'course'){
                course = filter.value;
            } else if(filter.field == 'yearLevel'){
                yearLevel = filter.value;
            } else if(filter.field == 'status'){
                status = filter.value;
            }
        })
        axios.get(BASE_SERVER_URL + 'enrollment',  { 
            params: {...GenericRequest(), 
                keyword: this.state.keyword,
                schoolYear: schoolYear,
                semester: semester,
                courseCode: course,
                yearLevel: yearLevel,
                status: status
            }
        })
        .then(res => {
            res.data.forEach(function(enrollment){
                enrollment['createdBy'] = enrollment.createdBy.schoolId;
                enrollment['courseCode'] = enrollment.course.courseCode;
                enrollment['year'] = enrollment.yearLevel;
                enrollment['studentNumber'] = enrollment.student.studentNumber;
                enrollment['name'] = enrollment.student['lastName'].toUpperCase() + ", " + enrollment.student['firstName'];
                enrollment['studentType'] = enrollment.type;
                
                let totalUnits = 0;
                enrollment.classes.map(function(classObj){
                    totalUnits += classObj.subject.unit;
                });
                enrollment['totalUnits'] = totalUnits;
            })

            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getEnrollments();
    }

   
    componentWillMount(){
        this.getCourses();
    }


    render(){
       return (
            <>
            <div style={{padding: '25px'}}>
            <Button as={Link}  to="../enroll-new" variant="outline-info">Enroll New Student</Button>&nbsp;&nbsp;
            <Button as={Link}  to="../enroll-old" variant="outline-info">Enroll Old Student</Button>
            </div>
            <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
            </>
        )
    }


}

export default EnrollmentList;