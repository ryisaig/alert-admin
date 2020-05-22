import React from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
import { ImageSearch, Create, DeleteOutline } from '@material-ui/icons';
  
class ViewSectionList extends React.Component {

    state = {
        title: "Sections",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/section/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "sectionName", text: "Section", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "schoolYear", text: "School Year", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            }},
            {dataField: "semester", text: "Semester", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "adviserName", text: "Adviser", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '150px'};
                }},
                {dataField: "maxNumber", text: "Max", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '50px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  
                       <Button as={Link} variant="outline-info"  to={"/section/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/section/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
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

    filterUpdated(newFilter){
        this.setState({filters: newFilter});
        this.getSections();
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
          this.getSections();

        })
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
                axios.delete(BASE_SERVER_URL + 'section/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Section has been deleted", "success").then(()=>{
                            this.getSections();
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

    getSections(){
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

        axios.get(BASE_SERVER_URL + 'section',  { params: {...GenericRequest(), keyword: this.state.keyword, schoolYear: schoolYear, semester: semester}})
        .then(res => {
            res.data.forEach(function(section){
               section['sectionName'] = section.course ? section.course.courseCode + " " + section.year + "-" + section.sectionNumber : "";
               section['adviserName'] = section.adviser ? section.adviser.lastName.toUpperCase() + ", "  + section.adviser.firstName: "";
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getSections();
    }

    componentWillMount(){
        this.getSchoolYears();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewSectionList;