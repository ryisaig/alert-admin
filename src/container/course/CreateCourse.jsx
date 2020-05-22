import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import GenericRequest from '../../utils/GenericRequest';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { tsPropertySignature } from '@babel/types';

class CreateCourse extends React.Component {
    constructor(props) {
      super(props);
    }
    state = {
        title: "Create New Course",
        action: "create",
        resource: "course",
        submitUrl: BASE_SERVER_URL + "course",
        method: "POST",
        successMessage: "New course has been created",
        fields: [
          {
            id: "courseCode",
            name: "courseCode",
            label: "Course Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "courseCode"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "courseName",
            name: "courseName",
            label: "Description",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "courseName"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "courseType",
            name: "courseType",
            label: "Type",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            value: "BACHELOR",
            options: [
              {key: "BACHELOR", value:"Bachelor"},
              {key: "ASSOCIATE", value:"Associate"},
              {key: "MASTERAL", value:"Masteral"}
            ],
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "courseType"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "college",
            name: "college",
            label: "College",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "college"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
        ]
      }

    success(){}

    getColleges(){
      axios.get(BASE_SERVER_URL + 'college',  { params: {...GenericRequest(), keyword: ""}})
      .then(res => {
        let collegeOptions = [];
        let objectReference={0:null};
        res.data.map(function(college){
          collegeOptions.push({key: college['id'], value: college['collegeCode']});
          objectReference[college['id']]=college;
        },
        )

        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id === 'college'){
            if(res.data[0]){
              field.value = res.data[0].id;
            }
            field.options = collegeOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
   }

   componentWillMount(){
     this.getColleges();
   }
    render(){
       return ( <CreateEditForm values={this.state}  successCallBack={this.success} component={this}/>)
    }


}

export default CreateCourse;