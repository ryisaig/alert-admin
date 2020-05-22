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
  
class ViewTeacherDetails extends React.Component {

    state = {
      title: "Teachers",
      resource: "",
      enableEdit: true,
      data: {},
      type: "teacher",
      resourceId: 0,
      fields: [
        {
          id: "employeeId",
          label: "Employee ID",
          value: ""
        },
        {
          id: "position",
          label: "Position",
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
          id: "address",
          label: "Address",
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
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
          ],
          data: []
        }
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getTeacher(this.state.resourceId);
      this.getClasss(this.state.resourceId);
    }


    getTeacher(id){
      axios.get(BASE_SERVER_URL + 'teacher/'+id,  { params: {...GenericRequest()}})
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
    axios.get(BASE_SERVER_URL + 'class/byTeacher',  { params: {...GenericRequest(), keyword: "", teacherId: id, schoolYear: "", semester: 0 }})
    .then(res => {
        let tables = this.state.tables;
        res.data.forEach(function(classObj, i){
            classObj["no"] = i + 1;
            if(classObj.section){
              classObj['section'] = classObj.section.course ? classObj.section.course.courseCode + classObj.section.year + "-" + classObj.section.sectionNumber : "";
            }
            classObj['subject'] = classObj.subject ? classObj.subject.subjectCode: "";
            classObj['room'] = classObj.room ? classObj.room.roomName : "";
            classObj['school_year'] = classObj.schoolYear ? classObj.schoolYear.schoolYearStart + " " +classObj.schoolYear.schoolYearEnd : "";
            
            if(classObj.schedule){
                let schedStr = "";
                classObj.schedule.map(function(sched,  i){
                    if(i != 0){
                        schedStr +=  " | ";
                    }
                    schedStr += sched.day + " " +sched.time.timeStart + "-" + sched.time.timeEnd;
                })
                classObj['schedule'] = schedStr;
            } else {
                classObj['schedule'] = "Not assigned";
            }
        })
        tables[0].data = res.data;
        this.setState({tables: tables})
    })
  }

    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default ViewTeacherDetails;