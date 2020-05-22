import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';
import getRandomString from '../../utils/RandomString'

class CreateSection extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Section",
        action: "create",
        resource: "section",
        submitUrl: BASE_SERVER_URL + "section",
        method: "POST",
        successMessage: "New section has been created",
        fields: [
          {
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
              fields.forEach(function(field){
                if(field.id == "course"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "year",
            name: "year",
            label: "year",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "year"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "sectionNumber",
            name: "sectionNumber",
            label: "Section Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "sectionNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)          
          },
          {
            id: "maxNumber",
            name: "maxNumber",
            label: "Max number of students",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "maxNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)        
          },
          {
            id: "schoolYear",
            name: "schoolYear",
            label: "School Year",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYear"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "semester",
            name: "semester",
            label: "Semester",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "select",
            options: [
              {key: "1", value: "1st"},
              {key: "2", value: "2nd"}
            ],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "semester"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "adviser",
            name: "adviser",
            label: "adviser",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            editable: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "adviser"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
        ]
      }


    componentWillMount(){
      this.getCourses();
      this.getSchoolYears();
      this.getTeachers();
    }

    getCourses(){
      axios.get(BASE_SERVER_URL + 'course',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
        let courseOptions = [];
        let objectReference={0:null};
        res.data.map(function(course){
          courseOptions.push({key: course['id'], value: course['courseCode']});
          objectReference[course['id']]=course;
        },
        )

        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id === 'course'){
            if(res.data[0]){
              field.value = res.data[0].id;
            }
            field.options = courseOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
   }

   getSchoolYears(){
    axios.get(BASE_SERVER_URL + 'schoolYearSemester',  { params: {...GenericRequest(), keyword: ""}})
    .then(res => {
      let syOptions = [];
      let syMap = {};
      let objectReference={0:null};
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
          syMap[schoolYearStr] = schoolYearStr;
          objectReference[schoolYearStr]=schoolYearStr;
        }
      });

      let fields = this.state.fields;
      fields.forEach(function(field){
        if(field.id === 'schoolYear'){
          field.value = defaultSy ? defaultSy.key: null;
          field.options = syOptions;
          field.objectReference = objectReference;
        } else if(field.id === 'semester'){
          console.log("defaultSem", defaultSem);
          field.value = defaultSem;
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
      if(field.id == 'adviser'){
        field.options = teacherOptions;
        field.objectReference = objectReference;
      }
    })
    this.setState({fields: fields})
  })
}

    success(){}

    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateSection;