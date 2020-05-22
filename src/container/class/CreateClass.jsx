import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateClass extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Class",
        action: "create",
        resource: "class",
        submitUrl: BASE_SERVER_URL + "class",
        method: "POST",
        successMessage: "New class has been created",
        fields: [
          {
            id: "classCode",
            name: "classCode",
            label: "Class Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",           
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "classCode"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "section",
            name: "section",
            label: "Section",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "section"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "subject",
            name: "subject",
            label: "Subject",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "subject"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "teacher",
            name: "teacher",
            label: "Teacher",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            readOnly: false,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "teacher"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "room",
            name: "room",
            label: "Room",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            readOnly: false,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "room"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "schedule",
            name: "schedule",
            label: "Schedule",
            isRequired: false,
            readOnly: false,
            type: "schedule",
            length: 1,
            incrementable: true,
            value:[],
            onIncrement: function(){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "schedule"){
                    field.value.push({day: "MON", time: {timeStart: "07:00:00", timeEnd: "10:00:00"}});
                }
              })
              this.setState({fields: fields})
            }.bind(this),
            selectValueChange: function(value, scheduleField, i){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "schedule"){
                  if(scheduleField == "day"){
                    field.value[i]["day"]=value;
                  } else {
                    field.value[i]["time"][scheduleField]=value;
                  }
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
        ]
      }


    componentWillMount(){
      this.getTeachers();
      this.getSections();
      this.getSubjects();
      this.getRooms();
    }

    success(){}


    getRooms(){
      axios.get(BASE_SERVER_URL + 'room',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
    
        let roomOptions = [];
        let objectReference={0:null};
        res.data.map(function(room){
          roomOptions.push({key: room['id'], value: room.roomName});
          objectReference[room['id']]=room;
        },
        )
    
        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id == 'room'){
            field.options = roomOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
    }

    getTeachers(){
      axios.get(BASE_SERVER_URL + 'teacher',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
    
        let teacherOptions = [];
        let objectReference={0:null};
        res.data.map(function(teacher){
          teacherOptions.push({key: teacher['id'], value: teacher['lastName'].toUpperCase() + ", " + teacher['firstName']});
          objectReference[teacher['id']]=teacher;
        },
        )
    
        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id == 'teacher'){
            field.options = teacherOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
    }


    getSections(){
      axios.get(BASE_SERVER_URL + 'section',  { params: {...GenericRequest(), keyword: "", schoolYear: "", semester: 0}})
      .then(res => {
    
        let sectionOptions = [];
        let objectReference={0:null};
        res.data.map(function(section){
          let sectionStr = section.course ? section.course.courseCode + " " + section.year + "-" + section.sectionNumber : "";
          sectionOptions.push({key: section['id'], value: sectionStr});
          objectReference[section['id']]=section;
        },
        )
    
        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id == 'section'){
           if(res.data[0]){
              field.value = res.data[0].id;
            }
            field.options = sectionOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
    }

    getSubjects(){
      axios.get(BASE_SERVER_URL+ 'subject',  { params: {...GenericRequest(), keyword: ''}})
      .then(res => {
        
        let subjectOptions = [];
        let objectReference={0:null};
        res.data.map(function(subject){
          subjectOptions.push({key: subject['id'], value: subject['subjectCode']});
          objectReference[subject['id']]=subject;
        },
        )

        let fields = this.state.fields;
        fields.forEach(function(field){
          
          if(field.id === 'subject'){
            if(res.data[0]){
              field.value = res.data[0].id;
            }
            field.options = subjectOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
    }
    

    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateClass;