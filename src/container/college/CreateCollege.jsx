import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateCollege extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New College",
        action: "create",
        resource: "college",
        submitUrl: BASE_SERVER_URL + "college",
        method: "POST",
        successMessage: "New college has been created",
        fields: [
          {
            id: "collegeCode",
            name: "collegeCode",
            label: "College Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "collegeName",
            name: "collegeName",
            label: "Description",
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

export default CreateCollege;