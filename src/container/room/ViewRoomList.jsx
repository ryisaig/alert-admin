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
import { Create, DeleteOutline, ImageSearch } from '@material-ui/icons';
  
class ViewRoomList extends React.Component {

    state = {
        title: "Rooms",
        isSearchable: true,
        isPrintable: true,
        isCreatable: true,
        createUrl: "/room/create",
        columns: [
            {dataField: "no", text: "No", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '5px', textAlign: 'center' };
                }},
            {dataField: "roomName", text: "Room Name", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '200px'};
                }},
            {dataField: "actions", text: "Actions", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '50px'};
                },
                formatter: (cell, row) => (
                    <>                         
                         <Button as={Link} variant="outline-info"  to={"/room/" + row['id']+ "/details"}><ImageSearch/></Button>&nbsp;
                         <Button as={Link} variant="outline-info"  to={"/room/" + row['id']+ "/edit"}><Create/></Button>&nbsp;
                        <Button as={Link} variant="outline-danger" onClick={()=>this.delete(row['id'])}><DeleteOutline/></Button>
                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getRooms(){
        axios.get(BASE_SERVER_URL + 'room',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getRooms();
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
                axios.delete(BASE_SERVER_URL + 'room/' + id,  { params: {...GenericRequest()}})
                    .then(res => {
                        swal("Success!", "Room has been deleted", "success").then(()=>{
                            this.getRooms();
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
        this.getRooms();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewRoomList;