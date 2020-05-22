import React from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Form } from 'react-bootstrap';
import { Lock, Create, ImageSearch, DeleteOutline, LockOpen} from '@material-ui/icons';


import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
  
class ViewClassList extends React.Component {

    state = {
        title: "Classes",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/class/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "classCode", text: "Class Code", sort: true},
            {dataField: "section", text: "Section", sort: true},
            {dataField: "subject", text: "Subject", sort: true},
            {dataField: "teacher", text: "Teacher", sort: true},
            {dataField: "room", text: "Room", sort: true},
            {dataField: "schedule", text: "Schedule", sort: true},
            {dataField: "status", text: "Status", sort: true},
            // {dataField: "school_year", text: "School Year", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '240px'};
                },
                formatter: (cell, row) => (
                    <>  
                    <Button as={Link} variant="outline-info" to={"/class/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                    <Button as={Link} variant="outline-info"  to={"/class/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                    {
                        row['status'] == "OPEN" ?  (<><Button as={Link} variant="outline-warning" to="#" onClick={()=>this.close(row['id'])}><Lock/></Button>&nbsp;</>) :
                        <><Button as={Link} variant="outline-info" to="#" onClick={()=>this.open(row['id'])}><LockOpen/></Button>&nbsp;</>
                    } 
                    
                    <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>
                    </>
                )},
        ],
        data: [],
        keyword: '',
        filters: [
            {field: 'schoolYear', label: "School Year", options: [], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field, i){
                  if(field.field == "schoolYear"){
                    field.value = e.target.value;
                  }
                })
                this.filterUpdated(fields)
            }.bind(this)
            },
            {field: 'semester', label: "Semester", value: 1, options: [{key: 1, value: "First"},{key: 2, value: "Second"}],
            onChange: function(e){

                let fields = this.state.filters;
                fields.forEach(function(field){
                  if(field.field == "semester"){
                      field.value = e.target.value;
                  }
                }
                )
                this.filterUpdated(fields)
            }.bind(this)}
        ]
    }

    async delete(id){
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this when deleted?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(BASE_SERVER_URL + 'class/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Class has been deleted", "success").then(()=>{
                            this.getClasss();
                        })
                        
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            }
          });
    }

    filterUpdated(newFilter){
        this.setState({filters: newFilter});
        this.getClasss();
    }

    getClasss(){
        let filters = this.state.filters;
        let schoolYear = "";
        let semester = 0;

        filters.map(function(filter){
            if(filter.field == 'schoolYear'){
                schoolYear = filter.value;
            } else if(filter.field == 'semester'){
                semester = filter.value;
            }
        })

        axios.get(BASE_SERVER_URL + 'class',  
            { params: {...GenericRequest(), keyword: this.state.keyword, schoolYear: schoolYear, semester: semester}})
        .then(res => {
            res.data.forEach(function(classObj){
                if(classObj.section){
                    classObj['section'] = classObj.section.course ? classObj.section.course.courseCode + " " + classObj.section.year + "-" + classObj.section.sectionNumber : "";
                }
                classObj['subject'] = classObj.subject ? classObj.subject.subjectCode: "";
                classObj['teacher'] = classObj.teacher ? classObj.teacher.lastName.toUpperCase() + ", " +  classObj.teacher.firstName : "";
                classObj['room'] = classObj.room ? classObj.room.roomName : "";
                classObj['school_year'] = classObj.schoolYear ? classObj.schoolYear.schoolYearStart + " " +classObj.schoolYear.schoolYearEnd : "";
                
                if(classObj.schedule){
                    let schedStr = "";
                    classObj.schedule.map(function(sched,  i){
                        if(i != 0){
                            schedStr +=  " | ";
                        }
                        schedStr += sched.day + " " +sched.time.timeStart + "-" + sched.time.timeEnd;
                    })
                    classObj['schedule'] = schedStr;
                } else {
                    classObj['schedule'] = "Not assigned";
                }
            })

            this.setState({data: res.data})
        })
    }

    getSchoolYears(){
        axios.get(BASE_SERVER_URL + 'schoolYearSemester',  { params: {...GenericRequest(), keyword: ""}})
        .then(res => {
          let syOptions = [];
          let syMap = {};
          let defaultSy = {};
          let defaultSem = 0;
          res.data.map(function(sy){
            let schoolYearStr = sy['schoolYearStart'] + "-" + sy['schoolYearEnd'];
            if(sy['current']){
                defaultSy = {key: schoolYearStr, value: schoolYearStr};
                defaultSem = "" + sy['semester'];
            }
            if(!syMap[schoolYearStr]){
                syOptions.push({key: schoolYearStr, value: schoolYearStr});     
                syMap[schoolYearStr] =  schoolYearStr;
            }
          });
    
          let filters = this.state.filters;
          filters.forEach(function(filter){
            if(filter.field == 'schoolYear'){
                filter.value = defaultSy ? defaultSy.key: null;
                filter.options = syOptions;
            } else if(filter.field == 'semester'){
                filter.value = defaultSem;
            }
          })
          this.setState({filters: filters})
          this.getClasss();

        })
     }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getClasss();
    }

    async close(id){

        const params = {
            requestId: GenericRequest().requestId,
            session: {
                sessionValue: GenericRequest().sessionValue,
                sessionId: GenericRequest().sessionId,
                username: GenericRequest().username,
                application: GenericRequest().application
            }
        }
        swal({
            title: "Are you sure?",
            text: "This will prohibit students to enroll in this class",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(BASE_SERVER_URL + 'class/' + id + "?status=CLOSED", params)
                    .then(res => {
                        swal("Success!", "Class has been closed", "success").then(()=>{
                            this.getClasss();
                        })
                        
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            }
          });
    }

    async open(id){

        const params = {
            requestId: GenericRequest().requestId,
            session: {
                sessionValue: GenericRequest().sessionValue,
                sessionId: GenericRequest().sessionId,
                username: GenericRequest().username,
                application: GenericRequest().application
            }
        }
        swal({
            title: "Are you sure?",
            text: "This will allow students to enroll in this class",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(BASE_SERVER_URL + 'class/' + id + "?status=OPEN", params)
                    .then(res => {
                        swal("Success!", "Class has been re-opened", "success").then(()=>{
                            this.getClasss();
                        })
                        
                    }).catch(e=>{
                        if(e.response.data){
                            swal("Error!", e.response.data, "error");
                        } else {
                            swal("Error!", e.message, "error");
                        }
                    })
            }
          });
    }


    componentWillMount(){
        this.getSchoolYears();
    }



    render(){
        return (
            <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
        );
    }


}

export default ViewClassList;