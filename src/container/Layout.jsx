import React from 'react';
import { Navbar, Nav, NavDropdown, ListGroup, Accordion, Card, Button, Table, Form, FormControl} from 'react-bootstrap';
import styles from '../sidemenu.css';
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
import { Computer, ArrowForward, AccountBox, FolderOpen, GroupAdd, Send, Work, SyncAlt , Poll,Assignment, Settings, Apps, VpnKeyOutlined, Close, PeopleAlt, SignalCellularAlt, GroupWork, AssignmentInd, BusinessCenter, Apartment, School, EmojiPeople, LocationOn, SupervisorAccount, DateRange, Help, ContactPhone, FindInPage, Build, Schedule, PermContactCalendar, Functions, CastConnected, VerticalSplit, ExitToApp, LibraryAddCheck, PlaylistAddCheck, PlaylistAdd, WarningRounded, PeopleRounded, ExitToAppRounded, GitHub, CallMerge, Usb, InfoOutlined, Warning, Dashboard, AccountCircleRounded, AssignmentOutlined} from '@material-ui/icons';

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
        eventKey: 0
    }
    sideMenulink = {
        fontSize: '14px',
        color: '#424242'
    }
    userId = 0;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentWillMount(){
        if(sessionStorage.getItem("call_tree_session") == null){
            window.location.href = "../login"
        } 
    }

    handleClickOutside(event) {
        if (this.state.sideMenuOpen && this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.setState({sideNavWidth: "0", sideMenuOpen: false})
        }
    }

    toggleNav() {
        if(this.state.sideMenuOpen){
             this.setState({sideNavWidth: "0", sideMenuOpen: false})
        } else {
            this.setState({sideNavWidth: "250px", sideMenuOpen: true})
        }
    }

    signout(){
        sessionStorage.removeItem("call_tree_session");
        sessionStorage.removeItem("call_tree_name");
        window.location.href = "../login";
    }

    download(file){
        window.location = BASE_SERVER_URL + 'download/'+file;
    }

    render(){

        let linkStyle = {
            color: '#424242',
            fontSize: '14px',
            textDecoration: 'none',
            backgroundColor: '#EEEEEE',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
        }
    
        return(
            <div>
                  <div style={{borderBottom: '1px solid rgba(0,0,0,.125)', width: '100%', height: '50px'}}>
            <Navbar expand="lg" fixed="top" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', height: '50px', backgroundColor: '#3880ff'}} >
                <Navbar.Brand href="../../../home" style={{position: 'absolute', left: '50%', display: 'block', width: '200px', marginLeft: '-100px'}}>
                    <span style={{marginLeft: '10px', color: '#E0F7FA'}}>CALL TREE ADMIN PORTAL</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link id="sidemenutoggle"  style={{color: '#fff', paddingLeft: "0px"}} onClick={this.toggleNav.bind(this)}><Apps style={{fontSize: "36px"}}/></Nav.Link>     
                        </Nav>
                       
                    </Navbar.Collapse>
            </Navbar>
            </div>
            <div id="mySidenav"  ref={this.wrapperRef} className="sidenav" style={{width: this.state.sideNavWidth, boxShadow: '2px 4px 10px rgba(0,0,0,.2)', zIndex: 9999, backgroundColor:  '#E0E0E0'}} >
                <a href="#" onClick={this.toggleNav.bind(this)} style={{padding: '1px', float: 'right'}}><Close/></a>
                <div style={{width: '100%', height: '160px', backgroundColor: '#E0E0E0', marginBottom: '20px', paddingLeft: '35px', paddingTop: '30px', marginTop: '40px'}}>
                   <div style={{borderRadius: "50%", width: "60px", height: "60px", backgroundColor: "#3880ff", marginBottom: '20px'}}>
                       <center><span style={{fontSize: "40px", fontWeight: "bold", color: "white"}}>{sessionStorage.getItem("call_tree_name") ? sessionStorage.getItem("call_tree_name").charAt(0) : ""}</span></center>
                   </div>
                   <h6 style={{color: '#424242', fontWeight: "bold"}}> {sessionStorage.getItem("call_tree_name")}</h6>
                   <p style={{color: '#424242', fontSize: '12px'}}> {sessionStorage.getItem("call_tree_name") ? sessionStorage.getItem("call_tree_name").toUpperCase() : ""}</p>
                </div>
                <div>
                <ListGroup.Item as={Link} style={linkStyle} to="../../../dashboard"><Dashboard/>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</ListGroup.Item>
                {/* <ListGroup.Item as={Link} style={linkStyle} to="../../../calltree"><Usb/>&nbsp;&nbsp;&nbsp;&nbsp;Call Tree List</ListGroup.Item> */}
                <ListGroup.Item as={Link} style={linkStyle} to="../../../alerts"><InfoOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;Alerts</ListGroup.Item>
                <ListGroup.Item as={Link} style={linkStyle} to="../../../emergency"><Warning/>&nbsp;&nbsp;&nbsp;&nbsp;Emergency Reports</ListGroup.Item>
                <ListGroup.Item as={Link} style={linkStyle} to="../../../assessments"><AssignmentOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;Assessments</ListGroup.Item>
                {/* <ListGroup.Item as={Link} style={linkStyle} to="../../../alerts"><WarningRounded/>&nbsp;&nbsp;&nbsp;&nbsp;Alerts</ListGroup.Item> */}
                <ListGroup.Item as={Link} style={linkStyle} to="../../../users" ><PeopleRounded/>&nbsp;&nbsp;&nbsp;&nbsp;Community Users</ListGroup.Item> 
                {/* <ListGroup.Item as={Link} style={linkStyle} to="../../../admin-users" ><AccountCircleRounded/>&nbsp;&nbsp;&nbsp;&nbsp;Admin Users</ListGroup.Item>                                                */}
                <ListGroup.Item as={Link} style={linkStyle} to="#" onClick={this.signout}><ExitToAppRounded/>&nbsp;&nbsp;&nbsp;&nbsp;Sign-out</ListGroup.Item>
                </div>
            </div>
            <Table className="main-layout" responsive style={{display: 'flex', flexDirection: 'column', flex: "1 1 100%", height: '100%'}}>
                <tbody style={{height: '100%'}}>
                    <tr style={{height: '100%'}}>               
                        <td style={{padding: '30px', border: 'none', width: '100%'}}>
                            {this.props.children}
                        </td>
                    </tr>
                </tbody>
            </Table>
            {/* <Navbar expand="lg" bg="info" fixed="bottom" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', padding: '0'}} >
                    <div className="bg-light text-dark" style={{ height: '3rem', width: '100%', paddingTop: '10px'}}>
                        <center>MDRRMO</center>
                    </div>
            </Navbar> */}
        </div>
        )
    }
}