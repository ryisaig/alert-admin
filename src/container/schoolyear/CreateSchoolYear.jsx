import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';
import getRandomString from '../../utils/RandomString'

class CreateSchoolYearSemester extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New School Year & Semester",
        action: "create",
        resource: "schoolYearSemester",
        submitUrl: BASE_SERVER_URL + "schoolYearSemester",
        method: "POST",
        successMessage: "New schoolYear & Semester has been created",
        fields: [
          {
            id: "schoolYearStart",
            name: "schoolYearStart",
            label: "Employee Start",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: 2019,
            options: [],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYearStart"){
                    field.value = value;
                }
                else if(field.id === "schoolYearEnd"){        
                    field.value = parseInt(value) + 1;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "schoolYearEnd",
            name: "schoolYearEnd",
            label: "School Year End",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "select",
            value: 2020,
            options: [],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYearEnd"){
                    field.value = value;
                }
                else if(field.id === "schoolYearStart"){        
                    field.value = parseInt(value) - 1;
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
            readOnly: false,
            type: "select",
            value: 1,
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
          }
        ]
      }


    componentWillMount(){
      let fields = this.state.fields;
      fields.forEach(function(field){
        if(field.id == 'schoolYearStart'){
          field.options = [];
          for(let i = 0; i < 25; i++){
            field.options.push({key: (2019 + i), value: (2019 + i)})
          }
        }
        if(field.id == 'schoolYearEnd'){
          field.options = [];
          for(let i = 0; i < 25; i++){
            field.options.push({key: (2019 + i), value: (2019 + i)})
          }
        }
      })
      this.setState({fields: fields});
    }

    success(){}

    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateSchoolYearSemester;