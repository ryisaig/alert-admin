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
  
class ViewClassDetails extends React.Component {

    state = {
      title: "Classes",
      resource: "",
      enableEdit: true,
      data: {},
      type: "class",
      resourceId: 0,
      fields: [
        {
          id: "classCode",
          label: "Class Code",
          value: ""
        },
        {
          id: "section",
          label: "Section",
          value: ""      
        },
        {
          id: "subject",
          label: "Subject",
          value: ""    
        },
        {
          id: "teacher",
          label: "Teacher",
          value: ""  
        },
        {
          id: "room",
          label: "Room",
          value: ""
        },
        {
          id: "schedule",
          label: "Schedule",
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
          title: "Enrolled Students",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "studentNumber", text: "Student Number", sort: true,  
              headerStyle: (colum, colIndex) => {
                  return { width: '200px'};
              }},
            {dataField: "name", text: "Name", sort: true},
            // {dataField: "status", text: "Status", sort: true},
            // {dataField: "actions", text: "Actions", sort: true, 
            // headerStyle: (colum, colIndex) => {
            //     return { width: '240px'};
            // },
            // formatter: (cell, row) => (
            //     <>  
            //     {
            //         row['status'] == "OPEN" ?  (<><Button as={Link} variant="outline-warning" to="#" onClick={()=>this.close(row['id'])}>Drop</Button>&nbsp;</>) :
            //         <><Button as={Link} variant="outline-info" to="#" onClick={()=>this.open(row['id'])}>Transfer</Button>&nbsp;</>
            //     } 
            //   </>
            // )},
          ],
          data: []
        }
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getClass(this.state.resourceId);
    }

    getClass(id){
      axios.get(BASE_SERVER_URL + 'class/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get class 
          let {fields} = this.state;
          fields.forEach(function(field){
            if(field.id == 'subject'){
              field.value = "" + res.data.subject.subjectCode;
            } else if(field.id == 'section'){
              field.value = "" + res.data.section.course.courseCode + " "  + res.data.section.year + "-" + res.data.section.sectionNumber
            } else if(field.id == 'teacher' && res.data['teacher']){
              field.value = "" + res.data.teacher.lastName.toUpperCase() + ", " + res.data.teacher.firstName ;
            } else if(field.id == 'room' && res.data['room']){
              field.value = "" + res.data.room.roomName;
            } else if(field.id == 'schedule' && res.data['schedule']){
              let schedule = "";
              res.data.schedule.map(function(sched, i){
                if(i != 0){
                  schedule += " | "
                }
                schedule += sched.day + " " + sched.time.timeStart + "-" + sched.time.timeEnd;
              })
              field.value = schedule;
            } else if(field.id == 'updatedBy'){
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

          this.setState({fields: fields, resource: res.data.classCode})
          this.getStudents(id);
      });
    }

    getStudents(id){
        axios.get(BASE_SERVER_URL + 'grade/byClass',   { params: {...GenericRequest(), classId: id, keyword: ""}}).then(res => {
            let table = this.state.tables[0];
            table.data = [];
            res.data.map(function(item){
              let result = {};
              result['id'] = item.id;
              result['no'] = table.data.length + 1;
              result['studentNumber'] = item.student.studentNumber;
              result['name'] = item.student.lastName + ", " + item.student.firstName + " " + item.student.middleName;
              table.data.push(result)

            });
          this.state.tables[0] = table;
          
          this.setState({table: table})
        })
    }


    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default ViewClassDetails;