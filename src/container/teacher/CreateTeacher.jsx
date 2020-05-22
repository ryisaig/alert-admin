import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateTeacher extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Teacher",
        action: "create",
        resource: "teacher",
        submitUrl: BASE_SERVER_URL + "teacher",
        method: "POST",
        successMessage: "New teacher has been created",
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
    
    success(){}

    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateTeacher;