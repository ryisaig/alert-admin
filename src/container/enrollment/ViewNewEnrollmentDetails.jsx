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
import { RemoveCircleOutline } from '@material-ui/icons';
  
class ViewClassDetails extends React.Component {

    state = {
      title: "Enrollments",
      resource: "",
      enableEdit: true,
      data: {},
      type: "enrollment",
      subtype: "new",
      resourceId: 0,
      fields: [
        {
          id: "type",
          label: "Type",
          value: ""
        },
        {
          id: "status",
          label: "Status",
          value: ""
        },
        {
          id: "course",
          label: "Course",
          value: ""
        },
        {
          id: "yearLevel",
          label: "Year",
          value: ""      
        },
        {
          id: "studentNumber",
          label: "Student Number",
          value: ""    
        },
        {
          id: "lastName",
          label: "Last Name",
          value: ""  
        },
        {
          id: "firstName",
          label: "FirstName",
          value: ""
        },
        {
          id: "middleName",
          label: "MiddleName",
          value: ""
        },
        {
          id: "gender",
          label: "Gender",
          value: ""
        },
        {
          id: "civilStatus",
          label: "Civil Status",
          value: ""
        },
        {
          id: "birthday",
          label: "Birthday",
          value: ""
        }, 
        {
          id: "age",
          label: "Age",
          value: ""
        },
        {
          id: "occupation",
          label: "Occupation",
          value: ""
        },
        {
          id: "presentAddress",
          label: "Present Address",
          value: ""
        },
        {
          id: "emailAddress",
          label: "Email Address",
          value: ""
        },
        {
          id: "mobileNumber",
          label: "Mobile Number",
          value: ""
        },
        {
          id: "guardianName1",
          label: "Guardian 1",
          value: ""
        },
        {
          id: "guardianName2",
          label: "Guardian 2",
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
          title: "Pre-enrolled Classes",
          columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
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
      this.getEnrollment(this.state.resourceId);
    }

    getEnrollment(id){
      axios.get(BASE_SERVER_URL + 'enrollment/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get class 
          let {fields} = this.state;

          if(res.data.status == 'CONFIRMED'){
            fields.splice(2, 0, {id: 'receiptNumber', label: 'Receipt Number'})
          } else if(res.data.status == 'DISCARDED'){
            fields.splice(2, 0, {id: 'discardReason', label: 'Discard Reason'})
          }

          fields.forEach(function(field){
            if(field.id == 'course'){
              field.value = "" + res.data.course.courseCode;
            } else if(field.id == 'yearLevel'){
              field.value = "" + res.data.yearLevel;
            }else if(field.id == 'studentNumber'){
              field.value = "" + res.data.student.studentNumber;
            } else if(field.id == 'lastName'){
              field.value = "" + res.data.student.lastName;
            }else if(field.id == 'firstName'){
              field.value = "" + res.data.student.firstName;
            }else if(field.id == 'middleName'){
              field.value = "" + res.data.student.middleName;
            }else if(field.id == 'civilStatus'){
              field.value = "" + res.data.student.civilStatus;
            }else if(field.id == 'presentAddress'){
              field.value = "" + res.data.student.presentAddress;
            }else if(field.id == 'gender'){
              field.value = "" + res.data.student.gender;
            }else if(field.id == 'mobileNumber'){
              field.value = "" + res.data.student.mobileNumber;
            }else if(field.id == 'emailAddress'){
              field.value = "" + res.data.student.emailAddress;
            }else if(field.id == 'birthday'){
              field.value = "" + res.data.student.birthday;
            }else if(field.id == 'guardianName1'){
              field.value = "" + res.data.student.guardianName1;
            }else if(field.id == 'guardianName2'){
              field.value = "" + res.data.student.guardianName2;
            }else if(field.id == 'occupation'){
              field.value = "" + res.data.student.occupation;
            }else if(field.id == 'age'){
              field.value = "" + this.calculate_age(res.data.student.birthday)
            }else if(field.id == 'updatedBy'){
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
          }.bind(this))

            let table = this.state.tables[0];
            table.data = [];
            res.data.classes.map(function(item){
              let result = {};
              result['id'] = item.id;
              result['no'] = table.data.length + 1;
              result['classCode'] = item.classCode
              result['subject'] = item.subject.subjectCode;
              result['section'] = item.section.course.courseCode + " " + item.section.year + "-" + item.section.sectionNumber;
              result['teacher'] = item.teacher.lastName.toUpperCase() + ", " + item.teacher.firstName
              result['room'] = item.room.roomName;
              result['status'] = item.status;
              let schedule = "";
              item.schedule.map(function(sched, i){
                if(i != 0){
                  schedule += " | "
                }
                schedule += sched.day + " " + sched.time.timeStart + "-" + sched.time.timeEnd;
              })
              result['schedule'] = schedule;
              table.data.push(result)

            });
          this.state.tables[0] = table;
          
          this.setState({fields: fields, resource: res.data.student.studentNumber, table: table})
      });
    }

    calculate_age = (dob1) => {
      var today = new Date();
      var birthDate = new Date(dob1); 
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      return age_now;
    }


    render(){
       return ( <ViewDetails values={this.state} sideContent={this.props.children}/>)
    }


}

export default ViewClassDetails;