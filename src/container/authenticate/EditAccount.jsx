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
        title: "Edit Account",
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


    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getUser(this.resourceId);
      }
    }

    componentDidMount() {
      const id = this.resourceId;
      this.getUser(id);
    }


    success(){
      const id = this.resourceId;
      this.getUser(id);
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditUser;