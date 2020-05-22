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
  
class ViewChannelList extends React.Component {

    state = {
        title: "Channels",
        isSearchable: true,
        isPrintable: true,
        isCreatable: false,
        createUrl: "/channel/create",
        columns: [
            {dataField: "no", text: "No", sort: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '50px', textAlign: 'center' };
                }},
            {dataField: "channelName", text: "Channel", sort: true},
            {dataField: "enabled", text: "Enabled", sort: true,  
                headerStyle: (colum, colIndex) => {
                    return { width: '150px'};
                }},
            {dataField: "actions", text: "Action", sort: true, 
                headerStyle: (colum, colIndex) => {
                    return { width: '150px'};
                },
                formatter: (cell, row) => (
                    <> 
                        {row['enabled'] == "Yes" ? 

                        <Button as={Link} variant="outline-danger" onClick={()=>this.modifyStatus(row['id'], row)}>Disable</Button> : 
                        <Button as={Link} variant="outline-info" onClick={()=>this.modifyStatus(row['id'], row)}>Enable</Button>
                       
                        }
                        
                   
                    </>
                )},
        ],
        data: [],
        keyword: ''
    }

    getChannels(){
        axios.get(BASE_SERVER_URL + 'channel',  { params: {...GenericRequest(), keyword: this.state.keyword}})
        .then(res => {
            res.data.forEach(function(channel){
                if(channel.enabled){
                    channel['enabled'] = "Yes";
                } else {
                    channel['enabled'] = "No";
                }
            })
            this.setState({data: res.data})
        })
    }

    handleKeywordChange = (e) => {
        this.state.keyword = e.target.value;
    }

    search(){
        this.getChannels();
    }
    async modifyStatus(id, row){
        swal({
            title: "Are you sure?",
            text: "You are modifying the status of this channel",
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
                        username: GenericRequest().username,
                        application: GenericRequest().application
                    },
                    'channel' : row
                }
                axios.patch(BASE_SERVER_URL + 'channel/' + id,  params)
                    .then(res => {
                        swal("Success!", "Channel has been modified", "success").then(()=>{
                            this.getChannels();
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
        this.getChannels();
    }

    render(){
       return ( <ViewList values={this.state} sideContent={this.props.children} handleKeywordChange={this.handleKeywordChange} search={this.search} component={this}/>)
    }


}

export default ViewChannelList;