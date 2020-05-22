import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditCourse extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Course",
        action: "edit",
        resource: "course",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"course/"+this.resourceId,
        method: "PATCH",
        successMessage: "Course has been updated",
        fields: [
          {
            id: "courseCode",
            name: "courseCode",
            label: "Course Code",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true
          },
          {
            id: "courseName",
            name: "courseName",
            label: "Description",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "text",
            editable: true
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


    getCourse(id){
      axios.get(BASE_SERVER_URL + 'course/'+id,  { params: {...GenericRequest()}})
      .then(res => {
        let {fields} = this.state;
        fields.forEach(function(field){
          if(field.id == 'college'){
            if(res.data['college']){
              field.value = "" + res.data.college.id;
            } else {
              field.value = "0";
            }
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
          this.getCourse(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getColleges();
      this.getCourse(id);
    }

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
            field.options = collegeOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
      })
   }


    success(){
      const id = this.resourceId;
      this.getCourse(id);
      this.getColleges();
    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditCourse;