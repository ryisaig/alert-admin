import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateRole extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Role",
        action: "create",
        resource: "role",
        submitUrl: BASE_SERVER_URL + "role",
        method: "POST",
        successMessage: "New role has been created",
        fields: [
          {
            id: "roleName",
            name: "roleName",
            label: "Role Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "roleName"){
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

    componentWillMount(){
      this.getFunctions();
    }


    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateRole;