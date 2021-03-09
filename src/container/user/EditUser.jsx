import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditUser extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit User",
        action: "edit",
        resource: "user",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"user/"+this.resourceId,
        method: "PATCH",
        successMessage: "User has been updated",
        fields: [
          {
            id: "schoolId",
            name: "schoolId",
            label: "School ID",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            readOnly: true,
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
            readOnly: true,
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
            value: "*********",
            type: "password",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "password"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)          },
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
                fields.forEach(function(field){
                  if(field.id === "email"){
                      field.value = value;
                  }
                })
                this.setState({fields: fields})
              }.bind(this)          },
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

    getUser(id){
      axios.get(BASE_SERVER_URL + 'user/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get user 
          let {fields} = this.state;
          fields.forEach(function(field){
              field.value = res.data[field.id]
          });

          let objectReference = res.data;
          this.setState({fields: fields, objectReference: objectReference})
      });
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

    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getUser(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getUser(id);
      this.getRoles();
      this.getFunctions();
    }


    success(){
      const id = this.resourceId;
      this.getUser(id);
      this.getRoles();
      this.getFunctions();
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditUser;