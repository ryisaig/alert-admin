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
  
class ViewSubjectList extends React.Component {

    state = {
        title: "Subjects",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/subject/create",
        columns: [
            {dataField: "no", text: "No",
                headerStyle: (colum, colIndex) => {
                    return { width: '60px', textAlign: 'center' };
                }},
            {dataField: "subjectCode", text: "Subject Code", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '250px'};
                }},
            {dataField: "subjectName", text: "Description", sort: true},
            // {dataField: "subjectType", text: "Subject Type", sort: true},
            {dataField: "unit", text: "Unit", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '70px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
                },
                formatter: (cell, row) => (
                    <>  
                      <Button as={Link} variant="outline-info"  to={"/subject/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/subject/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>

                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getSubjects(){
        axios.get(BASE_SERVER_URL + 'subject',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getSubjects();
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
                axios.delete(BASE_SERVER_URL + 'subject/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Subject has been deleted", "success").then(()=>{
                            this.getSubjects();
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
        this.getSubjects();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewSubjectList;