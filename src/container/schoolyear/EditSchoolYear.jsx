import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditSchoolYearSemester extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit SchoolYear & Semester",
        action: "edit",
        resource: "schoolYearSemester",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"schoolYearSemester/"+this.resourceId,
        method: "PATCH",
        successMessage: "SchoolYearSemester has been updated",
        fields: [
          {
            id: "schoolYearStart",
            name: "schoolYearStart",
            label: "Employee Start",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: 2019,
            options: [],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYearStart"){
                    field.value = value;
                }
                else if(field.id === "schoolYearEnd"){        
                    field.value = parseInt(value) + 1;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "schoolYearEnd",
            name: "schoolYearEnd",
            label: "School Year End",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "select",
            options: [],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYearEnd"){
                    field.value = value;
                }
                else if(field.id === "schoolYearStart"){        
                    field.value = parseInt(value) - 1;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "semester",
            name: "semester",
            label: "Semester",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "select",
            options: [
              {key: "1", value: "1st"},
              {key: "2", value: "2nd"}
            ],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "semester"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
        ]
      }

    getSchoolYearSemester(id){
      axios.get(BASE_SERVER_URL + 'schoolYearSemester/'+id,  { params: {...GenericRequest()}})
      .then(res => {
          //get schoolYearSemester 
          let {fields} = this.state;
          fields.forEach(function(field){
              field.value = res.data[field.id]
          });

          let objectReference = res.data;
          this.setState({fields: fields, objectReference: objectReference})
      });
  }

  componentWillMount(){
    let fields = this.state.fields;
    fields.forEach(function(field){
      if(field.id == 'schoolYearStart'){
        field.options = [];
        for(let i = 0; i < 25; i++){
          field.options.push({key: (2019 + i), value: (2019 + i)})
        }
      }
      if(field.id == 'schoolYearEnd'){
        field.options = [];
        for(let i = 0; i < 25; i++){
          field.options.push({key: (2019 + i), value: (2019 + i)})
        }
      }
    })
    this.setState({fields: fields});
  }


    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getSchoolYearSemester(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getSchoolYearSemester(id);
    }


    success(){
      const id = this.resourceId;
      this.getSchoolYearSemester(id);
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditSchoolYearSemester;