import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateSubject extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Subject",
        action: "create",
        resource: "subject",
        submitUrl: BASE_SERVER_URL + "subject",
        method: "POST",
        successMessage: "New subject has been created",
        fields: [
          {
            id: "subjectCode",
            name: "subjectCode",
            label: "Subject Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "subjectName",
            name: "subjectName",
            label: "Description",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
          },
          {
            id: "unit",
            name: "unit",
            label: "Unit",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "number",
          }
        ]
      }


    componentWillMount(){
      this.getSubjects()
    }

    getSubjects(){
     
      axios.get(BASE_SERVER_URL+ 'subject',  { params: {...GenericRequest(), keyword: ''}})
      .then(res => {
        
        let subjectOptions = [];
        let objectReference={0:null};
        res.data.map(function(subject){
          subjectOptions.push({key: subject['id'], value: subject['subjectCode']});
          objectReference[subject['id']]=subject;
        },
        )

        let fields = this.state.fields;
        this.setState({fields: fields})
      })
    }
    
    success(){}



    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateSubject;