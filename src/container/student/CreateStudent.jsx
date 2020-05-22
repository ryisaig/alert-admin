import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateStudent extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Student",
        action: "create",
        resource: "student",
        submitUrl: BASE_SERVER_URL + "student",
        method: "POST",
        successMessage: "New student has been created",
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
                if(field.id === "course"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "studentNumber",
            name: "studentNumber",
            label: "Student Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "studentNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },

          {
            id: "lastName",
            name: "lastName",
            label: "Last Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "lastName"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "firstName",
            name: "firstName",
            label: "First Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "firstName"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "middleName",
            name: "middleName",
            label: "Middle Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "middleName"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "gender",
            name: "gender",
            label: "Gender",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: "MALE",
            options: [
              {key: "MALE", value:"Male"},
              {key: "FEMALE", value:"Female"}
            ],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "gender"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "birthday",
            name: "birthday",
            label: "Birth Day",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "date",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "birthday"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "civilStatus",
            name: "civilStatus",
            label: "Civil Status",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: "SINGLE",
            options: [
              {key: "SINGLE", value:"SINGLE"},
              {key: "MARRIED", value:"MARRIED"},
              {key: "WIDOW", value:"WIDOW"},
              {key: "ANNULLED", value:"ANNULLED"}
            ],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "civilStatus"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "occupation",
            name: "occupation",
            label: "Occupation",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "occupation"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "emailAddress",
            name: "emailAddress",
            label: "Email Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "email",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "emailAddress"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "mobileNumber",
            name: "mobileNumber",
            label: "Mobile Numner",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "mobileNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "presentAddress",
            name: "presentAddress",
            label: "Present Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "presentAddress"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
          ,
          {
            id: "guardianName1",
            name: "guardianName1",
            label: "Guardian 1",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "guardianName1"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "guardianName2",
            name: "guardianName2",
            label: "Guardian 2",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "guardianName2"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
        ]
      }
    
      componentWillMount(){
        this.getCourses()
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
      
    
    success(){}

    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateStudent;