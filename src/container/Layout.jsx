import React from 'react';
import { Navbar, Nav, NavDropdown, ListGroup, Accordion, Card, Button, Table} from 'react-bootstrap';
import styles from '../sidemenu.css';
import ViewSubjectList from './subject/ViewSubjectList';
import logo from '../assets/images/logo.png';
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { BASE_SERVER_URL } from '../utils/BaseServerUrl';
import axios from 'axios';
import swal from 'sweetalert';
import GenericRequest from '../utils/GenericRequest';
import { Computer, ArrowForward, AccountBox, FolderOpen, GroupAdd, Send, Work, SyncAlt , Poll,Assignment, Settings} from '@material-ui/icons';

export default class Layout extends React.Component {


    state = {
        eventKey: 0
    }

    userId = 0;

   
    componentWillMount(){

        if(sessionStorage.getItem("luna_session") == null){
            window.location.href = "../login"
        } 

        this.userId = sessionStorage.getItem("luna_id")
    }

    signout(){
        
        let sessionId = sessionStorage.getItem("luna_session");
        const params = {
            requestId: GenericRequest().requestId,
            session: {
                sessionValue: GenericRequest().sessionValue,
                sessionId: GenericRequest().sessionId,
                username: GenericRequest().username,
                application: GenericRequest().application
            },
        }

        axios.post(BASE_SERVER_URL + 'session/'+sessionId, params)
        .then(res => {
            swal("Success!", "You've been logged-out", "success").then(()=>{
                sessionStorage.removeItem("luna_session");
                sessionStorage.removeItem("luna_user");

                window.location.href = "../login";
            })
        }).catch( e => {
            swal("Error!", "Error occurred. Please try again", "error").then(()=>{
                sessionStorage.removeItem("luna_session");
                sessionStorage.removeItem("luna_user");
                window.location.href = "../login"
            })
            
        })
    }

    download(file){
        window.location = BASE_SERVER_URL + 'download/'+file;
    }

    render(){
        let linkStyle = {
            color: '#17a2b8',
            textDecoration: 'none'
        }
    
        return(
            <div>
                  <div style={{borderBottom: '1px solid rgba(0,0,0,.125)', width: '100%', height: '76px'}}>
            <Navbar expand="lg" bg="info" fixed="top" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)'}} >
                <Navbar.Brand href="../../../home" style={{transform: 'translateX(150%)'}}>
                    <img src={logo} alt="" style={{width: '50px'}}/>
                    <span style={{marginLeft: '10px', color: '#E0F7FA'}}>Luna Colleges Administrative Portal</span>
                </Navbar.Brand>
            </Navbar>
            </div>
            <Table className="main-layout" responsive style={{display: 'flex', flexDirection: 'column', flex: "1 1 100%", height: '100%'}}>
                <tbody style={{height: '100%'}}>
                <tr style={{height: '100%'}}>
                <td style={{minWidth: '275px', border: 'none', padding: '0px', height: '100vh',}} className="bg-light">
            <Accordion  defaultActiveKey="0"> 
              
                <Accordion.Toggle as={ListGroup.Item} variant="secondary" eventKey="0" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><SyncAlt/> Submissions</center>
                </Accordion.Toggle>
                
                <Accordion.Collapse eventKey="0">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../admissions"><center>Admissions</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../preregistrations"><center>Pre-registrations</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../for-approvals"><center>For Approval</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../my-submissions"><center>My Submissions</center></ListGroup.Item>

                        </ListGroup>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item}  variant="secondary" eventKey="6" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><GroupAdd/> Enrollment</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="6">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../enrollment"><center>Enrollment</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../enroll-new"><center>Enroll New Student</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../enroll-old"><center>Enroll Old Student</center></ListGroup.Item>
                        </ListGroup>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item}  variant="secondary" eventKey="1" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><Work/> Administrative</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../grade"><center>Grades</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../class"><center>Classes</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../section"><center>Sections</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../student"><center>Students</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../teacher"><center>Teachers</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../subject"><center>Subjects</center></ListGroup.Item>                            
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../room"><center>Rooms</center></ListGroup.Item> 
                            {/* <ListGroup.Item as={Link} style={linkStyle} to="../../../subject"><center>Subjects</center></ListGroup.Item>                                                        */}
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../course"><center>Courses</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../college"><center>Colleges</center></ListGroup.Item>
                        </ListGroup>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item} variant="secondary" eventKey="2" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><Settings/> System</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../session"><center>Session</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../user"><center>Users</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../role"><center>Roles</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../function"><center>Functions</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../channel"><center>Channels</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../school-year"><center>School Year</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../audit-log"><center>Audit Log</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../troubleshoot"><center>Troubleshooting Guide</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../user-manual"><center>User Manual</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../developer"><center>Contact Developer</center></ListGroup.Item>

                        </ListGroup>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item} variant="secondary" eventKey="3" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><Poll/> Reports</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../copy-of-grades"><center>Copy of Grades</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../registration-form"><center>Registration Form</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../transcript-of-records"><center>Transcript of Records</center></ListGroup.Item>
                        </ListGroup>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item} variant="secondary" eventKey="4" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><Assignment/> Forms</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="#" onClick={()=>this.download("admission-form")}><center>Admission Form</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="#" onClick={()=>this.download("preregistration-form")}><center>Pre-registration Form</center></ListGroup.Item>
                        </ListGroup>
                </Accordion.Collapse>
          
                <Accordion.Toggle as={ListGroup.Item} variant="secondary" eventKey="5" style={{border: 'none', backgroundColor: '#f8f9fa'}}>
                    <center><AccountBox/> My Account</center>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                        <ListGroup>
                            <ListGroup.Item as={Link} style={linkStyle} to="../../../my-account"><center>My account</center></ListGroup.Item>
                            <ListGroup.Item as={Link} style={linkStyle} to="#" onClick={this.signout}><center>Sign-out</center></ListGroup.Item>
                        </ListGroup>
                </Accordion.Collapse>
            </Accordion>
            </td>
            <td style={{padding: '0px', border: 'none', width: '100%'}}>
                {this.props.children}
            </td>
            </tr>
            </tbody>
            </Table>
            <Navbar expand="lg" bg="info" fixed="bottom" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', padding: '0'}} >
                    <div className="bg-light text-dark" style={{ height: '3rem', width: '100%', paddingTop: '10px'}}>
                        <center>Luna Colleges @ 2020</center>
                    </div>
            </Navbar>
        </div>
        )
    }
}