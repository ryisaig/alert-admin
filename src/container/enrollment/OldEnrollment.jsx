import React from 'react';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import ViewTable from '../../component/ViewTable';
import { selectField, checkListField, checkField, scheduleField, defaultField } from '../../component/Fields';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Add, Search, RemoveCircleOutline } from '@material-ui/icons';
import swal from 'sweetalert';

class NewEnrollment extends React.Component {
    constructor(props) {
      super(props);
      const sessionTabId = ""
    }
    state = {
        title: <><Link to="../enrollment" style={{color: "#17a2b8"}}>Enrollment</Link> > Enroll Old Student</>,
        action: "create",
        resource: "student",
        submitUrl: BASE_SERVER_URL + "student",
        method: "POST",
        successMessage: "New student has been created",
        enteredClassCode: "",
        fields: {
          "course": {
            id: "course",
            name: "course",
            label: "Course",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["course"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },"year": {
            id: "year",
            name: "year",
            label: "Year",
            placeholder: "",
            overrideStyle: {width: "70px"},
            isRequired: true,
            type: "number",
            value: 1,
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["year"].value = value;
              this.setState({fields: fields})
            }.bind(this)
      },
          "isRegular" : {
            id: "isRegular",
            name: "isRegular",
            label: "Regular",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            readOnly: true,
            type: "check",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["isRegular"].value = value;
              fields["isRegular"].checked = !fields["isRegular"].checked;

              this.setState({fields: fields})
            }.bind(this)
          },
          "studentNumber" : {
            id: "studentNumber",
            name: "studentNumber",
            label: "Student Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["studentNumber"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "lastName" : {
            id: "lastName",
            name: "lastName",
            label: "Last Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["lastName"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "firstName" : {
            id: "firstName",
            name: "firstName",
            label: "First Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["firstName"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "middleName" : {
            id: "middleName",
            name: "middleName",
            label: "Middle Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["middleName"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "emailAddress" : {
            id: "emailAddress",
            name: "emailAddress",
            label: "Email Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "email",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["emailAddress"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "mobileNumber" : {
            id: "mobileNumber",
            name: "mobileNumber",
            label: "Mobile Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["mobileNumber"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          },
          "presentAddress" : {
            id: "presentAddress",
            name: "presentAddress",
            label: "Present Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields["presentAddress"].value = value;
              this.setState({fields: fields})
            }.bind(this)
          }
        },
        table: 
            {
              title: "Active Classes",
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
                {dataField: "status", text: "Status", sort: true},
                {dataField: "actions", text: "Actions", sort: true, 
                  headerStyle: (colum, colIndex) => {
                      return { width: '80px'};
                  },
                  formatter: (cell, row) => (
                      <>  
                          <Button as={Link} to="#" variant="outline-danger" onClick={()=>this.delete(row['classCode'])}><RemoveCircleOutline/></Button>
                      </>
                  )},
              ],
              data: []
            }
        
      }

    formValues = {}

    calculate_age = (dob1) => {
      var today = new Date();
      var birthDate = new Date(dob1); 
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      console.log(age_now);
      return age_now;
    }

    handleFormValueChange = (e) =>{
      this.formValues[e.target.id] = e.target.value;
      this.state.fields[e.target.id].selectValueChange(e.target.value);
    }
      
    
    handleScheduleDayChange = (e, i) => {
        
    }
    
    
    handleStartTimeChange = (e, i) => {
    
    }
    
    handleEndTimeChange = (e, i) => {
    
    }
    
    handleCheckListValueChange = (e) =>{
      
    }
    
    handleAllCheckListValueChange = (e) =>{
      
    }
    
    handleSelectValueChange = (e) => {
      if(this.state.fields[e.target.id].objectReference){
        this.formValues[e.target.id] = this.state.fields[e.target.id].objectReference[e.target.value];
      } else {
        this.formValues[e.target.id] = e.target.value;
      }
      this.state.fields[e.target.id].selectValueChange(e.target.value); 
    }

    fieldRenderer(field){
        if(field.type === "select"){
            return selectField(field, this.formValues, this.handleSelectValueChange, field.id)
        } else if(field.type === "checklist"){
            return checkListField(field, this.formValues, this.handleAllCheckListValueChange, this.handleCheckListValueChange)
        } else if(field.type === "check"){
            return checkField(field, this.formValues, this.handleFormValueChange)
        } else if(field.type === "schedule"){
            return scheduleField(field, this.formValues, this.handleScheduleDayChange, this.handleStartTimeChange, this.handleEndTimeChange)
        } else {
            return defaultField(field, this.formValues, this.handleFormValueChange)
        }
    }

    componentWillMount(){
        this.getCourses();    
    }

    autogenerateClasses(){
      let generate = function(){
        let course = this.state.fields['course'];
        let year = this.state.fields['year'];
          if(course.value == null){
            swal("Warning!","Please select a course", "warning");
          } else {
            axios.get(BASE_SERVER_URL+ 'class/autogenerate',  { params: {...GenericRequest(), courseId: course.value, yearLevel: year.value}}).then((res) => {
              let table = this.state.table;
              table.data = [];
              res.data.map(function(item){
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
              })
              
              this.setState({table: table})
      
            })
          }
      }.bind(this)

      if(this.state.table.data.length != 0){
        swal({
          title: "Are you sure?",
          text: "This will reset the classes you previously selected",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willModify) => {
          if (willModify) {
            generate();
          }
        })  
      } else {
        generate();
      }
    }

    addClassToList(){
      let classCode = this.state.enteredClassCode;
      let table = this.state.table;
      let previouslyAdded = false;
      this.state.table.data.map(function(entry){
        if(entry.classCode == classCode){
          previouslyAdded = true;
        }
      })

      let classCodeFunc = function(res){
        if(previouslyAdded){
          swal("Warning!","Class code is already in the list", "warning");
        }
        else if(res.data == "") {
          swal("Error!","Class code does not exist", "error");
        } else {

          let result = {};
          result['no'] = table.data.length + 1;
          result['classCode'] = res.data.classCode
          result['subject'] = res.data.subject.subjectCode;
          result['section'] = res.data.section.course.courseCode + " " + res.data.section.year + "-" + res.data.section.sectionNumber;
          result['teacher'] = res.data.teacher.lastName.toUpperCase() + ", " + res.data.teacher.firstName
          result['room'] = res.data.room.roomName;
          result['status'] = res.data.status;

          let schedule = "";
          res.data.schedule.map(function(sched, i){
            if(i != 0){
              schedule += " | "
            }
            schedule += sched.day + " " + sched.time.timeStart + "-" + sched.time.timeEnd;
          })
          result['schedule'] = schedule;
  
          table.data.push(result)
        }
        this.setState({table: table})
      }.bind(this)
      axios.get(BASE_SERVER_URL+ 'class/byClassCode',  { params: {...GenericRequest(), classCode: classCode}}).then((res) => classCodeFunc(res))
    }
  


    async delete(classCode){
      let table  = this.state.table;
      let num = 0;
      let filteredData = table.data.filter(function(item){

        if(item.classCode != classCode){
          num++;
          item.no = num;
          return true;
        }
      })

      table.data = filteredData;

      this.setState({table: table});

    }

    onSubmit(e){
      
      e.preventDefault();

      if(this.state.table.data.length < 1){
        swal("Error!", "Classes should not be empty", "error");
      } else {

        let classes = [];
        this.state.table.data.map(function(item){
          classes.push({id: item.id})
        })

        const fields = this.state.fields;
        const params = {
          requestId: GenericRequest().requestId,
          session: {
              sessionValue: GenericRequest().sessionValue,
              sessionId: GenericRequest().sessionId,
              username: GenericRequest().username,
              application: GenericRequest().application
          },
          application: 'ADMIN_PORTAL',
          clientIp: '',
          enrollment: {
            student: {
              studentNumber: fields['studentNumber'].value,
              lastName: fields['lastName'].value,
              firstName: fields['firstName'].value,
              middleName: fields['middleName'].value,
              presentAddress: fields['presentAddress'].value,
              mobileNumber: fields['mobileNumber'].value,
              emailAddress: fields['emailAddress'].value
            },
            yearLevel: fields['year'].value,
            course: {
              id: fields['course'].value,
            },
            isRegular: fields["isRegular"].checked,
            classes: classes
          }         
        }
        axios.post(BASE_SERVER_URL + 'enrollment/old', params)
        .then(res => {
            swal("Success!", "New enrollment has been submitted", "success").then(()=>{
              window.location.reload();
            })

        }).catch( e => {
            swal("Error!", "Something went wrong", "error");
        })
      }
    }

    getCourses(){
       
        axios.get(BASE_SERVER_URL+ 'course',  { params: {...GenericRequest(), keyword: ''}})
        .then(res => {
          
          let courseOptions = [];
          let objectReference={0:null};
          res.data.map(function(course){
            courseOptions.push({key: course['id'], value: course['courseCode']});
            objectReference[course['id']]=course;
          },
          )
  
          if(res.data[0]){
            let fields = this.state.fields;
            fields["course"].value = res.data[0].id;
            fields["course"].options = courseOptions;
            fields["course"].objectReference = objectReference;
            this.setState({fields: fields})
          }
         
        })
    }

    

    classFormChange(e){
      this.setState({enteredClassCode: e.target.value})
    }
    render(){

       return ( 
        <div style={{padding: '25px'}}>
          <form onSubmit={this.onSubmit.bind(this)} >
            <div>
                <h5>{this.state.title}</h5><br/>
               
                <Button type="submit" variant="outline-info">
                    Submit
                </Button><br/><br/>
                <table>
                    <tbody>
                        <tr>
                            <td style={{padding: "0px", border: "none"}}>{this.fieldRenderer(this.state.fields["isRegular"])}</td>
                        </tr>
                        <tr>
                            <td style={{padding: "0px", border: "none"}}>{this.fieldRenderer(this.state.fields["course"])}</td>
                            <td style={{padding: "0px", border: "none", paddingLeft: "15px"}}>{this.fieldRenderer(this.state.fields["year"])}</td>

                        </tr>
                        <tr>
                            <td style={{padding: "0px", border: "none"}}>{this.fieldRenderer(this.state.fields["studentNumber"])}</td>
                        </tr>
                        <tr>
                            <td style={{padding: "0px", border: "none" }}>{this.fieldRenderer(this.state.fields["lastName"])}</td>
                            <td style={{padding: "0px", border: "none", paddingLeft: "15px"}}>{this.fieldRenderer(this.state.fields["firstName"])}</td>
                            <td style={{padding: "0px", border: "none", paddingLeft: "15px"}}>{this.fieldRenderer(this.state.fields["middleName"])}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{padding: "0px", border: "none" }}>{this.fieldRenderer(this.state.fields["presentAddress"])}</td>
                        </tr>
                        <tr>
                            <td style={{padding: "0px", border: "none" }}>{this.fieldRenderer(this.state.fields["mobileNumber"])}</td>
                            <td style={{padding: "0px", border: "none", paddingLeft: "15px"}}>{this.fieldRenderer(this.state.fields["emailAddress"])}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <h5>Classes</h5>
            <InputGroup className="mb-3" style={{width: '450px'}}>
              <FormControl style={{height: '40px'}} onChange={this.classFormChange.bind(this)}/>
              <InputGroup.Append style={{marginRight: '10px'}}> 
                 <Button variant="outline-info" onClick={this.addClassToList.bind(this)}><Add/></Button>
             </InputGroup.Append>
             <Button variant="outline-info" onClick={this.autogenerateClasses.bind(this)}>Auto-generate</Button>
             </InputGroup>
            <div>
                <ViewTable values={this.state.table}/>
            </div>
            <br/><br/>
            <Button type="submit" variant="outline-info">
                    Submit
                </Button>
                </form>
            <br/> <br/> <br/>
        </div>)
    }


}

export default NewEnrollment;