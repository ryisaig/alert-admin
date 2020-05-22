import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditTeacher extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Teacher",
        action: "edit",
        resource: "teacher",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"teacher/"+this.resourceId,
        method: "PATCH",
        successMessage: "Teacher has been updated",
        fields: [
          {
            id: "employeeId",
            name: "employeeId",
            label: "Employee ID",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "position",
            name: "position",
            label: "Position",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "lastName",
            name: "lastName",
            label: "Last Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "firstName",
            name: "firstName",
            label: "First Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "middleName",
            name: "middleName",
            label: "Middle Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            type: "text",
          },
          {
            id: "address",
            name: "address",
            label: "Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "emailAddress",
            name: "emailAddress",
            label: "Email Address",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "mobileNumber",
            name: "mobileNumber",
            label: "Mobile Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          }
        ]
      }


    getTeacher(id){
      axios.get(BASE_SERVER_URL + 'teacher/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get teacher 
          let {fields} = this.state;
          fields.forEach(function(field){
            field.value = res.data[field.id]
          });
          this.setState({fields: fields})
      });
  }

    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getTeacher(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getTeacher(id);
    }


    success(){
      const id = this.resourceId;
      this.getTeacher(id);
     
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditTeacher;