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
        title: "Edit Grade",
        action: "edit",
        resource: "grade",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"grade/"+this.resourceId,
        method: "PATCH",
        successMessage: "Grade has been updated",
        disableReload: true,
        fields: [
          {
            id: "classCode",
            name: "classCode",
            label: "Class Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            readOnly: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "classCode"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "subjectCode",
            name: "subjectCode",
            label: "Subject Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            readOnly: true,
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
            id: "unit",
            name: "unit",
            label: "Unit",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            readOnly: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "subject"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "studentNumber",
            name: "studentNumber",
            label: "Student",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            readOnly: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "studentNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "grade",
            name: "grade",
            label: "Grade",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: "",
            options: [
              {key: "1.00", value:"1.00"},
              {key: "1.25", value:"1.25"},
              {key: "1.50", value:"1.50"},
              {key: "1.75", value:"1.75"},
              {key: "2.00", value:"2.00"},
              {key: "2.25", value:"2.25"},
              {key: "2.50", value:"2.50"},
              {key: "2.75", value:"2.75"},
              {key: "3.00", value:"3.00"},
              {key: "4.00", value:"4.00"},
              {key: "INC", value:"INC"},
              {key: "5.00", value:"5.00"},
              {key: "DRP", value:"DRP"}
            ],            
            editable: true,
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "grade"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
        ]
      }
    
    getGrade(id){
      axios.get(BASE_SERVER_URL + 'grade/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get subject 
          let {fields} = this.state;
          fields.forEach(function(field){

              if(field.id == 'classCode'){
                field.value = res.data.enrolledClass.classCode;
              } else if(field.id == 'subjectCode'){
                field.value = res.data.enrolledClass.subject.subjectCode;
              } else if(field.id == 'studentNumber'){
                field.value = res.data.student.studentNumber;
              } else {
                field.value = res.data[field.id]
              }

          });

          let objectReference = res.data;
          this.setState({fields: fields, objectReference: objectReference})
      });
  }

    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getGrade(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getGrade(id);
    }


    success(){
      const id = this.resourceId;
      this.getGrade(id);
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditSubject;