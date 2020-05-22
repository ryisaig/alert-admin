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
import { ImageSearch, Create, DeleteOutline } from '@material-ui/icons';
  
class ViewCollegeList extends React.Component {

    state = {
        title: "Colleges",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/college/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "collegeCode", text: "College Code", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
                }},
            {dataField: "collegeName", text: "College Name", sort: true},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '185px'};
                },
                formatter: (cell, row) => (
                    <>  <Button as={Link} variant="outline-info"  to={"/college/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                        <Button as={Link} variant="outline-info"  to={"/college/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>

                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getColleges(){
        axios.get(BASE_SERVER_URL + 'college',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getColleges();
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
                axios.delete(BASE_SERVER_URL + 'college/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "College has been deleted", "success").then(()=>{
                            this.getColleges();
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
        this.getColleges();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewCollegeList;