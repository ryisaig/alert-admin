import React from 'react';
import CreateEditForm from '../../component/CreateEditForm';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import GenericRequest from '../../utils/GenericRequest';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button } from 'react-bootstrap';

import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
import { Create } from '@material-ui/icons';
  
class ViewSchoolYearSemesterList extends React.Component {

    state = {
        title: "School Year & Semester",
        isSearchable: false,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/school-year/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                }},
            {dataField: "schoolYearStart", text: "School Year Start", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '120px'};
                }},
            {dataField: "schoolYearEnd", text: "School Year End", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '120px'};
            }},
            {dataField: "semester", text: "Semester", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '100px'};
                }},
            {dataField: "isCurrent", text: "Is Current", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '100px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '180px'};
                },
                formatter: (cell, row) => (
                    <>  

                        <Button as={Link} variant="outline-info"  to={"/school-year/" + row['id']+ "/edit"}><Create/></Button>&nbsp;

                        {row['isCurrent'] == true ? null : 
                                <Button as={Link} variant="outline-info" onClick={()=>this.modifyStatus(row['id'])}>Set as current</Button>
                        }
                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    async modifyStatus(id, row){
        swal({
            title: "Are you sure?",
            text: "You are modifying the status of this SchoolYear & Semester",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willModify) => {
            if (willModify) {
                const params = {
                    requestId: GenericRequest().requestId,
                    session: {
                        sessionValue: GenericRequest().sessionValue,
                        sessionId: GenericRequest().sessionId,
                        user: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    'schoolYearSemester' : row
                }
                axios.patch(BASE_SERVER_URL + 'schoolYearSemester/' + id,  params)
                    .then(res => {
                        swal("Success!", "SchoolYear & Semester status has been modified", "success").then(()=>{
                            this.getSchoolYearSemesters();
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

    getSchoolYearSemesters(){
        axios.get(BASE_SERVER_URL + 'schoolYearSemester',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            res.data.forEach(function(schoolYearSemester){
                let sem = schoolYearSemester['semester'] + (schoolYearSemester['semester'] == '1' ? 'st' : 'nd');
                schoolYearSemester['semester'] = sem;

                if(schoolYearSemester.current){
                    schoolYearSemester['isCurrent'] = "Yes";
                } else {
                    schoolYearSemester['isCurrent'] = "No";
                }
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getSchoolYearSemesters();
    }

    componentWillMount(){
        this.getSchoolYearSemesters();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewSchoolYearSemesterList;