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
  
class ViewCourseDetails extends React.Component {
    tableEntity = {
      title: "",
      columns: [
        {dataField: "subjectCpde", text: "Subject Code", sort: true},
        {dataField: "subjectName", text: "Subject Description", sort: true},
        {dataField: "unit", text: "Unit", sort: true},
        {dataField: "preRequisite", text: "Pre-requisite", sort: true}
      ],
      data: []
    };

    state = {
      title: "Courses",
      resource: "",
      enableEdit: true,
      data: {},
      type: "course",
      resourceId : 0,
      fields: [
        {
          id: "courseCode",
          label: "Course Code",
          value: ""
        },
        {
          id: "courseName",
          label: "Description",
          value: ""      
        },
        {
          id: "courseType",
          label: "Type",
          value: ""    
        },
        {
          id: "college",
          label: "College",
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
      ],
      tableAction: [
        { id: "addCurriculum", label: "Add Curriculum", onSubmit: function(){
          let tables = this.state.tables;
          let tableEntityInstance = this.tableEntity;
          tableEntityInstance.subtitle = "1st sem"
          tables.push(tableEntityInstance);
          this.setState({tables: tables});
        }.bind(this)}
      ]
    }

    componentWillMount(){
      this.state.resourceId = this.props.match.params.id;
      this.getCourse(this.state.resourceId);
    }

    getCourse(id){
      axios.get(BASE_SERVER_URL + 'course/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get class 
          let {fields} = this.state;
          fields.forEach(function(field){
            if(field.id == 'college'){
              field.value = "" + res.data.college.collegeCode;
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

          let tables = this.state.tables;

          console.log("res", res.data)

          // res.data.subject.map(function(subjSet, i){
          //   let tableEntityInstance = this.tableEntity;
          //   //tableEntityInstance.subtitle = i + " Semester";
          //   tables.push(tableEntityInstance);
          // })

          this.setState({fields: fields, resource: res.data.courseCode})
      });
    }

    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default ViewCourseDetails;