import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateRoom extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Room",
        action: "create",
        resource: "room",
        submitUrl: BASE_SERVER_URL + "room",
        method: "POST",
        successMessage: "New room has been created",
        fields: [
          {
            id: "roomName",
            name: "roomName",
            label: "Room Name",
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

export default CreateRoom;