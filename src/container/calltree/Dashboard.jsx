import React, { useState } from 'react';
import ViewList from '../../component/ViewList';
import axios from 'axios'
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import { Button, Form, InputGroup, Modal, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import {
    Link
  } from "react-router-dom";
import { Add, Apps, Create, OpenInNew, ViewAgendaRounded, ViewColumn } from '@material-ui/icons';
import SockJsClient from 'react-stomp';
import StatItem from './StatItem';

class Dashboard extends React.Component {
   username =  sessionStorage.getItem("luna_user");
  
   state = {
    data: {
      users: 0,
      alerts: 0,
      reports: 0,
      responded: 0
    }
   }

   componentDidMount(){
    axios.get(BASE_SERVER_URL + 'dashboard').then(res => {
      this.setState({data: res.data})
    })
   }

    render(){ 
       return (
        <div style={{width: "100%"}}>
        <Table responsive style={{width: "100%"}}> 
          <tbody>
            <tr>
              <td style={{border: "none", padding: '25px'}}>
              <h5 style={{ marginBottom: '10px' }}>Dashboard</h5>
              </td>
              
              </tr>
              <tr>
              <table style={{ width: "100%"}}>
            <tbody>
                <tr>
                    <td style={{ width: "auto",paddingLeft: "40px"}}>
                        <StatItem label="No. of Registered Users" mainData={this.state.data.users} primaryBg="#1B5E20" secondaryBg="#388E3C" />
                    </td>
                    <td style={{ width: "auto" }}>
                        <StatItem label="No. of Alerts Created" mainData={this.state.data.alerts} primaryBg="#01579B" secondaryBg="#0288D1" />
                    </td>
                    <td style={{ width: "auto" }}>
                        <StatItem label="No. of Reports Received" mainData={this.state.data.reports}  primaryBg="#E65100" secondaryBg="#F57C00" />
                    </td>
                    <td style={{ width: "auto" }}>
                        <StatItem label="No. of Reports Responded" mainData={this.state.data.responded} primaryBg="#311B92" secondaryBg="#512DA8" />
                    </td>
                </tr>
            </tbody>
        </table>
              </tr>
              <tr>
                <td>
                <div style={{fontSize: '24px', color: '#616161'}}>
                  <br />
                  <br /><br />
                <span style={{ fontSize: '24px', color: '#616161', margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Click on {<Apps style={{fontSize: '36px'}}/>} to view navigations and perform tasks.</span>
            </div>
                </td>
              </tr>
            </tbody></Table></div>
       )
    }

    


}

export default Dashboard;