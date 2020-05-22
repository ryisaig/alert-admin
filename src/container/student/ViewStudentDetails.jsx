import React from 'react';
import ViewDetails from '../../component/ViewDetails';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
  
class ViewStudentDetails extends React.Component {

    state = {
      title: "Students",
      resource: "",
      enableEdit: true,
      data: {},
      type: "student",
      resourceId: 0,
      fields: [
        {
          id: "studentNumber",
          label: "Student Number",
          value: ""
        },
        {
          id: "lastName",
          label: "Last Name",
          value: "",      
        },
        {
          id: "firstName",
          label: "First Name",
          value: "",
        },
        {
          id: "middleName",
          label: "Middle Name",
          value: "",
        },
        {
          id: "gender",
          label: "Gender",
          value: "",
        },
        {
          id: "birthday",
          label: "Birthday",
          value: "",
        },
        {
          id: "civilStatus",
          label: "Civil Status",
          value: "",
        },
        {
          id: "occupation",
          label: "Occupation",
          value: "",
        },
        {
          id: "presentAddress",
          label: "Present Address",
          value: ""
        },
        {
          id: "emailAddress",
          label: "Email Address",
          value: "",
        },
        {
          id: "mobileNumber",
          label: "Mobile Number",
          value: "",
        },
        {
          id: "guardianName1",
          label: "Guardian 1",
          value: "",
        },
        {
          id: "guardianName2",
          label: "Guardian 2",
          value: "",
        },
        {
          id: "createdBy",
          label: "Created by",
          value: "",
        },
        {
          id: "createdDateTime",
          label: "Date Created",
          value: "",
        },
        {
          id: "updatedBy",
          label: "Last Update by",
          value: "",
        },
        {
          id: "updatedDateTime",
          label: "Date Last Updated",
          value: "",
        }
      ],
      tables: [
        {
          title: "Active Classes",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "section", text: "Section", sort: true},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
            {dataField: "grade", text: "Grade", sort: true}
          ],
          data: []
        },
        {
          title: "Pending Pre-enrolled Classes",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
          ],
          data: []
        },
        {
          title: "Class History",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "section", text: "Section", sort: true},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
            {dataField: "grade", text: "Grade", sort: true}
          ],
          data: [],
          filters: [
            {field: 'schoolYear', label: "School Year", options: [], onChange: function(e){
                let fields = this.state.tables[2].filters;
                fields.forEach(function(field, i){
                  if(field.field == "schoolYear"){
                    field.value = e.target.value;
                  }
                })
                this.getClassBasedOnFilters(this.state.resourceId);
            }.bind(this)},
            {field: 'semester', label: "Semester", options: [{key: 1, value: "First"},{key: 2, value: "Second"}], onChange: function(e){

              let fields = this.state.tables[2].filters;
                fields.forEach(function(field){
                  if(field.field == "semester"){
                      field.value = e.target.value;
                  }
                }
                )
                this.getClassBasedOnFilters(this.state.resourceId);
            }.bind(this)}
          ]
        }
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getSchoolYears();
      this.getStudent(this.state.resourceId);
      this.getClasss(this.state.resourceId);
    }


    getStudent(id){
      axios.get(BASE_SERVER_URL + 'student/'+id,  { params: {...GenericRequest()}})
      .then(res => {
     
          let {fields} = this.state;
          fields.forEach(function(field){
            if(field.id == 'updatedBy'){
              if(res.data['updatedBy']){
                field.value = "" + res.data.updatedBy.schoolId;
              } else {
                field.value = "None";
              }
            } else if(field.id == 'createdBy'){
              if(res.data['createdBy']){
                field.value = "" + res.data.createdBy.schoolId;
              } else {
                field.value = "None";
              }
            } else {
              field.value = res.data[field.id]
            }
          });

          this.setState({fields: fields, resource: res.data.firstName +  " " +  res.data.lastName})

      });
  }

  
  getClasss(id){
    
    axios.get(BASE_SERVER_URL + 'grade/byStudent',  { params: {...GenericRequest(), keyword: "", studentId: id, schoolYear: "", semester: 0 }})
    .then((res) => {

        let tables = this.state.tables;

        res.data.forEach(function(item, i){

          if(item.enrolledClass.section){
            item['section'] = item.enrolledClass.section.course ? item.enrolledClass.section.course.courseCode + item.enrolledClass.section.year + "-" + item.enrolledClass.section.sectionNumber : "";
          }
          item['room'] = item.enrolledClass.room ? item.enrolledClass.room.roomName : "";
          item["no"] = i + 1;
          item['student'] = item.student.studentNumber;
          item['classCode'] = item.enrolledClass.classCode;
          item['subject'] = item.enrolledClass.subject.subjectCode;
          item['teacher'] = item.enrolledClass.teacher.lastName + ", " + item.enrolledClass.teacher.firstName;

          if(item.schedule){
            let schedStr = "";
            item.enrolledClass.schedule.map(function(sched,  i){
                if(i != 0){
                    schedStr +=  " | ";
                }
                schedStr += sched.day + " " +sched.time.timeStart + "-" + sched.time.timeEnd;
            })
            item['schedule'] = schedStr;
        } else {
          item['schedule'] = "Not assigned";
        }
       })

      tables[0].data = res.data;

      this.setState({tables: tables})
      this.getPendingClasses(this.state.resourceId);

    })
  }

  getPendingClasses(id){
    
    axios.get(BASE_SERVER_URL + 'enrollment/byStudent/' + id,  { params: {...GenericRequest()}})
    .then((res) => {

        let tables = this.state.tables;
        res.data.classes.forEach(function(item, i){
          if(item.section){
            item['section'] = item.section.course ? item.section.course.courseCode + item.section.year + "-" + item.section.sectionNumber : "";
          }
          item['room'] = item.room ? item.room.roomName : "";
          item["no"] = i + 1;
          item['classCode'] = item.classCode;
          item['subject'] = item.subject.subjectCode;
          item['teacher'] = item.teacher.lastName + ", " + item.teacher.firstName;

          if(item.schedule){
            let schedStr = "";
            item.schedule.map(function(sched,  i){
                if(i != 0){
                    schedStr +=  " | ";
                }
                schedStr += sched.day + " " +sched.time.timeStart + "-" + sched.time.timeEnd;
            })
            item['schedule'] = schedStr;
        } else {
          item['schedule'] = "Not assigned";
        }
       })

      tables[1].data = res.data.classes;

      this.setState({tables: tables})
      this.getClassBasedOnFilters(id);
    })
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

      let tables = this.state.tables;
      let filters = tables[2].filters;
      filters.forEach(function(filter){
        if(filter.field == 'schoolYear'){
            filter.value = defaultSy ? defaultSy.key: null;
            filter.options = syOptions;
        } else if(filter.field == 'semester'){
            filter.value = defaultSem;
        }
      })
      this.setState({tables: tables})
    })
 }

    getClassBasedOnFilters(id){

      let filters = this.state.tables[2].filters;
      let schoolYear = "";
      let semester = 0;
      filters.map(function(filter){
          if(filter.field == 'schoolYear'){
              schoolYear = filter.value;
          } else if(filter.field == 'semester'){
              semester = filter.value;
          }
      })

      axios.get(BASE_SERVER_URL + 'grade/byStudent',  { params: {...GenericRequest(), keyword: "", studentId: id, schoolYear: schoolYear, semester: semester }})
      .then((res) => {
  
          let tables = this.state.tables;
  
          res.data.forEach(function(item, i){
  
            if(item.enrolledClass.section){
              item['section'] = item.enrolledClass.section.course ? item.enrolledClass.section.course.courseCode + item.enrolledClass.section.year + "-" + item.enrolledClass.section.sectionNumber : "";
            }
            item['room'] = item.enrolledClass.room ? item.enrolledClass.room.roomName : "";
            item["no"] = i + 1;
            item['student'] = item.student.studentNumber;
            item['classCode'] = item.enrolledClass.classCode;
            item['subject'] = item.enrolledClass.subject.subjectCode;
            item['teacher'] = item.enrolledClass.teacher.lastName + ", " + item.enrolledClass.teacher.firstName;
  
            if(item.schedule){
              let schedStr = "";
              item.enrolledClass.schedule.map(function(sched,  i){
                  if(i != 0){
                      schedStr +=  " | ";
                  }
                  schedStr += sched.day + " " +sched.time.timeStart + "-" + sched.time.timeEnd;
              })
              item['schedule'] = schedStr;
          } else {
            item['schedule'] = "Not assigned";
          }
         })
  
        tables[2].data = res.data;
  
        this.setState({tables: tables})  
      })
    }

    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default ViewStudentDetails;