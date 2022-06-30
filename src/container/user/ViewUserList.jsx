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
            {dataField: "lastName", text: "Last Name", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '80px'};
            }},
            {dataField: "brgy", text: "Brgy", sort: true, 
            headerStyle: (colum, colIndex) => {
                return { width: '100px'};
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
        originalData: [],
        keyword: '',
        handleShow: this.handleShow.bind(this),
        filters: [
            {field: 'brgy', label: "Brgy", options: [{key: "", value: ""},{key: "Asisan", value: "Asisan"},
            {key: "Bagong Tubig", value: "Bagong Tubig"},
            {key: "Calabuso", value: "Calabuso"},
            {key: "Dapdap East", value: "Dapdap East"},
            {key: "Dapdap West", value: "Dapdap West"},
            {key: "Francisco", value: "Francisco"},
            {key: "Guinhawa North", value: "Guinhawa North"},
            {key: "Guinhawa South", value: "Guinhawa South"},
            {key: "Iruhin Central", value: "Iruhin Central"},
            {key: "Iruhin East", value: "Iruhin East"},
            {key: "Iruhin West", value: "Iruhin West"},
            {key: "Kaybagal Central", value: "Kaybagal Central"},
            {key: "Kaybagal North", value: "Kaybagal North"},
            {key: "Kaybagal South", value: "Kaybagal South"},
            {key: "Mag-asawang Ilat", value: "Mag-asawang Ilat"},
            {key: "Maharlika East", value: "Maharlika East"},
            {key: "Maharlika West", value: "Maharlika West"},
            {key: "Maitim II Central", value: "Maitim II Central"},
            {key: "Maitim II East", value: "Maitim II East"},
            {key: "Maitim II West", value: "Maitim II West"},
            {key: "Mendez Crossing East", value: "Mendez Crossing East"},
            {key: "Mendez Crossing West", value: "Mendez Crossing West"},
            {key: "Neogan", value: "Neogan"},
            {key: "Patutong Malaki North", value: "Patutong Malaki North"},
            {key: "Patutong Malaki South", value: "Patutong Malaki South"},
            {key: "Sambong", value: "Sambong"},
            {key: "San Jose", value: "San Jose"},
            {key: "Silang Crossing East", value: "Silang Crossing East"},
            {key: "Silang Crossing West", value: "Silang Crossing West"},
            {key: "Sungay East", value: "Sungay East"},
            {key: "Sungay West", value: "Sungay West"},
            {key: "Tolentino East", value: "Tolentino East"},
            {key: "Tolentino West", value: "Tolentino West"},
            {key: "Zambal", value: "Zambal"}], onChange: function(e){
                let fields = this.state.filters;
                fields.forEach(function(field, i){
                  if(field.field == "brgy"){
                    field.value = e.target.value;
                  }
                })
                this.filterUpdated(fields, "brgy", e.target.value)
            }.bind(this)
            }
        ],
    }

    filterUpdated(fields, brgy, value){
       
        const users = this.state.originalData.filter((item) => {
            return item.brgy === value;
        })

        this.setState({data: users});
    }

    
    async getUsers(){
        const res = await axios.get(BASE_SERVER_URL + 'user/all',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        this.setState({data: res.data, originalData: res.data})
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
       return ( 
       <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>
       )
    }

    
   handleShow(){
   }

}

export default ViewUserList;