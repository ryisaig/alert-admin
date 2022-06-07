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
import { ImageSearch, Create, MapOutlined } from '@material-ui/icons';
  
class ViewUserList extends React.Component {

    state = {
        title: "Community Users",
        isSearchable: false,
        isPrintable: false,
        isCreatable: false,
        createUrl: "/users/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'left' };
                }},
            {dataField: "mobileNumber", text: "Mobile Number", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '80px'};
                }},
            {dataField: "name", text: "Name", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '80px'};
            }},
            {dataField: "address", text: "Address", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
            }},
            // {dataField: "actions", text: "View Location", sort: true, 
            // headerStyle: (colum, colIndex) => {
            //     return { width: '80px'};
            // },
            // formatter: (cell, row) => (
            //     <>  
            //          {/* <Button as={Link} variant="outline-info"  to={"/calltree/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp; */}
            //         <Button as={Link} style={{backgroundColor: '#3880ff'}}  to={"/calltree/" + row['id']+ "/responses"}><MapOutlined/></Button>&nbsp;
            //         {/* <Button as={Link} variant="outline-danger" to="#" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button> */}

            //     </>
            // )},
        ],
        data: [],
        keyword: '',
        handleShow: this.handleShow.bind(this),
    }

    
    getUsers(){
        axios.get(BASE_SERVER_URL + 'user/all',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getUsers();
    }

    componentWillMount(){
        this.getUsers();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }

    
   handleShow(){
   }

}

export default ViewUserList;