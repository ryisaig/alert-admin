import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';
import getRandomString from '../../utils/RandomString'

class CreateUser extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New User",
        action: "create",
        resource: "user",
        submitUrl: BASE_SERVER_URL + "user",
        method: "POST",
        successMessage: "New user has been created",
        fields: [
          {
            id: "schoolId",
            name: "schoolId",
            label: "Employee ID",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolId"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "name",
            name: "name",
            label: "Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "name"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "password",
            name: "password",
            label: "Password",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "text",
            value: getRandomString(),
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "password"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "email",
            name: "email",
            label: "Email",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach((field) => {
                if(field.id === "email") 
                  field.value = value;
                });
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "roles",
            name: "roles",
            label: "Roles",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "checklist",
            options: [],
            objectReference:{},
            checklistValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "roles"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "functions",
            name: "functions",
            label: "Functions",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "checklist",
            options: [],
            objectReference:{},
            checklistValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "functions"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
        ]
      }


    componentWillMount(){
      this.getRoles();
      this.getFunctions();
    }


    getRoles(){
      axios.get(BASE_SERVER_URL + 'role',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
        let roleOptions = [];
        let objectReference={0:null};
        res.data.map(function(role){
          roleOptions.push({key: role['id'], value: role['roleName']});
          objectReference[role['id']]=role;
        },
        )

        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id === 'roles'){
            field.options = roleOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
    }

    getFunctions(){
      axios.get(BASE_SERVER_URL + 'function',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
        let functionOptions = [];
        let objectReference={0:null};
        res.data.map(function(func){
          functionOptions.push({key: func['id'], value: func['functionName']});
          objectReference[func['id']]=func;
        },
        )

        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id === 'functions'){
            field.options = functionOptions;
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

export default CreateUser;