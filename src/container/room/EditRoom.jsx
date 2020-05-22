import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditRoom extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Room",
        action: "edit",
        resource: "room",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"room/"+this.resourceId,
        method: "PATCH",
        successMessage: "Room has been updated",
        fields: [
          {
            id: "roomName",
            name: "roomName",
            label: "Room Name",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true
          }
        ]
      }


    getRoom(id){
      axios.get(BASE_SERVER_URL + 'room/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get room 
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
          this.getRoom(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getRoom(id);
    }


    success(){
      const id = this.resourceId;
      this.getRoom(id);
     
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditRoom;