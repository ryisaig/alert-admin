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
  
class ViewSubjectDetails extends React.Component {

    state = {
      title: "Subjects",
      resource: "",
      enableEdit: true,
      type: "subject",
      resourceId: 0,
      data: {},
      fields: [
        {
          id: "subjectCode",
          label: "Subject Code",
          value: "",
        },
        {
          id: "subjectName",
          label: "Description",
          value: "",
        },
        {
          id: "unit",
          label: "Unit",
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
            {dataField: "section", text: "Section", sort: true},
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
      this.getSubject(this.state.resourceId);
      this.getClasss(this.state.resourceId);
    }

    getSubject(id){
      axios.get(BASE_SERVER_URL + 'subject/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get subject 
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
          this.setState({fields: fields, resource: res.data['subjectCode']})
      });
  }

  getClasss(id){
    axios.get(BASE_SERVER_URL + 'class/bySubject',  { params: {...GenericRequest(), keyword: "", subjectId: id }})
    .then(res => {
        let tables = this.state.tables;
        res.data.forEach(function(classObj, i){
            classObj["no"] = i + 1;

            if(classObj.section){
                classObj['section'] = classObj.section.course ? classObj.section.course.courseCode + classObj.section.year + "-" + classObj.section.sectionNumber : "";
            }
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

export default ViewSubjectDetails;