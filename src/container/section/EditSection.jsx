import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';

class EditSection extends React.Component {
    constructor(props) {
      super(props);
    }
    resourceId = this.props.match.params.id;

    state = {
        title: "Edit Section",
        action: "edit",
        resource: "section",
        objectReference: {},
        resourceId: this.resourceId,
        submitUrl: BASE_SERVER_URL+"section/"+this.resourceId,
        method: "PATCH",
        successMessage: "Section has been updated",
        fields: [
          {
            id: "course",
            name: "course",
            label: "Course",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id == "course"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          },
          {
            id: "year",
            name: "year",
            label: "Year",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "year"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)          
          },
          {
            id: "sectionNumber",
            name: "sectionNumber",
            label: "Section Number",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "sectionNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)         
          },
          {
            id: "maxNumber",
            name: "maxNumber",
            label: "Max number of students",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: false,
            type: "number",
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "maxNumber"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)       
          },
          {
            id: "schoolYear",
            name: "schoolYear",
            label: "School Year",
            placeholder: "",
            overrideStyle: {},
            isRequired: true,
            readOnly: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "schoolYear"){
                    field.value = value;
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
            readOnly: true,
            type: "select",
            value: 1,
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
          },
          {
            id: "adviser",
            name: "adviser",
            label: "Adviser",
            placeholder: "",
            overrideStyle: {},
            isRequired: false,
            editable: true,
            type: "select",
            options: [],
            objectReference:{},
            selectValueChange: function(value){
              let fields = this.state.fields;
              fields.forEach(function(field){
                if(field.id === "adviser"){
                    field.value = value;
                }
              })
              this.setState({fields: fields})
            }.bind(this)
          }
          
        ]
      }

    getSection(id){
      axios.get(BASE_SERVER_URL + 'section/'+id,  { params: {...GenericRequest()}})
      .then(res => {
     
          let {fields} = this.state;
          fields.forEach(function(field){
            if(field.id == 'course'){
              if(res.data['course']){
                field.value = "" + res.data.course.id;
              } else {
                field.value = "0";
              }
            } else if(field.id == 'adviser'){
              if(res.data['adviser']){
                field.value = "" + res.data.adviser.id;
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

  getCourses(){
    axios.get(BASE_SERVER_URL + 'course',  { params: {...GenericRequest(), keyword: ""}})
    .then(res => {
      let courseOptions = [];
        let objectReference={0:null};
        res.data.map(function(course){
          courseOptions.push({key: "" + course['id'], value: course['courseCode']});
          objectReference[course['id']]=course;
        })

        let fields = this.state.fields;
        fields.forEach(function(field){
          if(field.id == 'course'){
            field.options = courseOptions;
            field.objectReference = objectReference;
          }
        })
        this.setState({fields: fields})
    })
 }

 getSchoolYears(){
  axios.get(BASE_SERVER_URL + 'schoolYearSemester',  { params: {...GenericRequest(), keyword: ""}})
  .then(res => {
    let syOptions = [];
      let syMap = {};
      let objectReference={0:null};
      res.data.map(function(sy){
        let schoolYearStr = sy['schoolYearStart'] + "-" + sy['schoolYearEnd'];
        if(!syMap[schoolYearStr]){
          syOptions.push({key: schoolYearStr, value: schoolYearStr});
          syMap[schoolYearStr] = schoolYearStr;
          objectReference[schoolYearStr]=schoolYearStr;
        }
      });

      let fields = this.state.fields;
      fields.forEach(function(field){
        if(field.id === 'schoolYear'){
          field.options = syOptions;
          field.objectReference = objectReference;
        }
      })
      this.setState({fields: fields})
    })
}


getTeachers(){
axios.get(BASE_SERVER_URL + 'teacher',  { params: {...GenericRequest(), keyword: ""}})
.then(res => {

  let teacherOptions = [];
  let objectReference={0:null};
  res.data.map(function(teacher){
    teacherOptions.push({key: teacher['id'], value: teacher['lastName'].toUpperCase() + ", " + teacher['firstName']});
    objectReference[teacher['id']]=teacher;
  })

  let fields = this.state.fields;
  fields.forEach(function(field){
    if(field.id === 'adviser'){
      field.options = teacherOptions;
      field.objectReference = objectReference;
    }
  })
  this.setState({fields: fields})
})
}


  

    componentDidUpdate(prevProps) {
      this.resourceId = this.props.match.params.id;
      if (prevProps.match.params.id !== this.resourceId) {
          this.getSection(this.resourceId);
      }

    }

    componentDidMount() {
      const id = this.resourceId;
      this.getCourses();
      this.getSchoolYears();
      this.getTeachers();
      this.getSection(id);

    }


    success(){
      const id = this.resourceId;
      this.getCourses();
      this.getSchoolYears();
      this.getTeachers();
      this.getSection(id);

    }

    render(){
        return (<CreateEditForm values={this.state} successCallBack={this.success} component={this}/>)
    }


}

export default EditSection;