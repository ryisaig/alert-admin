import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditCollege extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit College",
        action: "edit",
        resource: "college",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"college/"+this.resourceId,
        method: "PATCH",
        successMessage: "College has been updated",
        fields: [
          {
            id: "collegeCode",
            name: "collegeCode",
            label: "College Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true
          },
          {
            id: "collegeName",
            name: "collegeName",
            label: "Description",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true
          }
        ]
      }


    getCollege(id){
      axios.get(BASE_SERVER_URL + 'college/'+id,  { params: {...GenericRequest()}})
      .then(res => {
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
          this.getCollege(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getCollege(id);
    }


    success(){
      const id = this.resourceId;
      this.getCollege(id);
     
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditCollege;