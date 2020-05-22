import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditRole extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Role",
        action: "edit",
        resource: "role",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"role/"+this.resourceId,
        method: "PATCH",
        successMessage: "Role has been updated",
        fields: [
          {
            id: "roleName",
            name: "roleName",
            label: "Role Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true,
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

    getRole(id){
      axios.get(BASE_SERVER_URL + 'role/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get role 
          let {fields} = this.state;
          fields.forEach(function(field){
              field.value = res.data[field.id]
          });

          let objectReference = res.data;
          this.setState({fields: fields, objectReference: objectReference})
      });
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
          this.getRole(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getRole(id);
      this.getFunctions();
    }


    success(){
      const id = this.resourceId;
      this.getRole(id);
      this.getFunctions();
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditRole;