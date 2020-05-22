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
  
class ViewSectionDetails extends React.Component {

    state = {
      title: "Sections",
      resource: "",
      enableEdit: true,
      data: {},
      type: "section",
      resourceId: 0,
      fields: [
        {
          id: "course",
          label: "Course",
          value:""
        },
        {
          id: "year",
          label: "Year",
          value: ""    
        },
        {
          id: "maxNumber",
          label: "Max number of students",
          value: ""
        },
        {
          id: "schoolYear",
          label: "School Year",
          value: ""
        },
        {
          id: "semester",
          label: "Semester",
          value: ""
        },
        {
          id: "adviser",
          label: "Adviser",
          value: ""
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
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
            {dataField: "status", text: "Status", sort: true}
          ],
          data: []
        }
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getSection(this.state.resourceId);
      this.getClasss(this.state.resourceId);
    }


    getSection(id){
      axios.get(BASE_SERVER_URL + 'section/'+id,  { params: {...GenericRequest()}})
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
            } else if(field.id == 'course'){
              if(res.data['course']){
                field.value = "" + res.data.course.courseCode;
              } else {
                field.value = "None";
              }
            } else if(field.id == 'adviser'){
              if(res.data['adviser']){
                field.value = "" + res.data.adviser.lastName.toUpperCase() + ", " + res.data.adviser.firstName;
              } else {
                field.value = "None";
              }
            } 
            else {
              field.value = res.data[field.id]
            }
          });

          this.setState({fields: fields, resource: res.data.course.courseCode +  " " +  res.data.year + "-" + res.data.sectionNumber})

      });
  }

  
  getClasss(id){
    axios.get(BASE_SERVER_URL + 'class/bySection',  { params: {...GenericRequest(), keyword: "", sectionId: id }})
    .then(res => {
        let tables = this.state.tables;
        res.data.forEach(function(classObj, i){
            classObj["no"] = i + 1;
            classObj['subject'] = classObj.subject ? classObj.subject.subjectCode: "";
            classObj['teacher'] = classObj.teacher ? classObj.teacher.lastName.toUpperCase() + ", " +  classObj.teacher.firstName : "";
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

export default ViewSectionDetails;