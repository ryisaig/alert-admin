import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditSubject extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Subject",
        action: "edit",
        resource: "subject",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"subject/"+this.resourceId,
        method: "PATCH",
        successMessage: "Subject has been updated",
        fields: [
          {
            id: "subjectCode",
            name: "subjectCode",
            label: "Subject Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "subjectCode"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "subjectName",
            name: "subjectName",
            label: "Description",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "subjectName"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "unit",
            name: "unit",
            label: "Unit",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "number",
            editable: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "unit"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }        
        ]
      }

    getSubjects(){
      axios.get(BASE_SERVER_URL+ 'subject',  { params: {...GenericRequest(), keyword: ''}})
      .then(res => {
        
        let subjectOptions = [];
        let objectReference={0:null};
        res.data.map(function(subject){
          subjectOptions.push({key: subject['id'], value: subject['subjectCode']});
          objectReference[subject['id']]=subject;
        })

        let fields = this.state.fields;
       
        this.setState({fields: fields})
      })
    }
    

    getSubject(id){
      axios.get(BASE_SERVER_URL + 'subject/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get subject 
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
          this.getSubjects();
          this.getSubject(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getSubjects();
      this.getSubject(id);
    }


    success(){
      const id = this.resourceId;
      this.getSubjects();
      this.getSubject(id);
     
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditSubject;