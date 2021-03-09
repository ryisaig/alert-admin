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
import { Computer, ArrowForward, AccountBox, FolderOpen, GroupAdd, Send, Work, SyncAlt , Poll,Assignment, Settings, Apps, VpnKeyOutlined, Close, PeopleAlt, SignalCellularAlt, GroupWork, AssignmentInd, BusinessCenter, Apartment, School, EmojiPeople, LocationOn, SupervisorAccount, DateRange, Help, ContactPhone, FindInPage, Build, Schedule, PermContactCalendar, Functions, CastConnected, VerticalSplit, ExitToApp, LibraryAddCheck, PlaylistAddCheck, PlaylistAdd} from '@material-ui/icons';

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
        if(sessionStorage.getItem("luna_session") == null){
            window.location.href = "../login"
        } 
        this.userId = sessionStorage.getItem("luna_id")
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
            <Navbar expand="lg" bg="info" fixed="top" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', height: '50px'}} >
                <Navbar.Brand href="../../../home" style={{position: 'absolute', left: '50%', display: 'block', width: '200px', marginLeft: '-100px'}}>
                    <img src={logo} alt="" style={{width: '30px'}}/>
                    <span style={{marginLeft: '10px', color: '#E0F7FA'}}>GRADING PORTAL</span>
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
                   <div style={{borderRadius: "50%", width: "60px", height: "60px", backgroundColor: "#17a2b8", marginBottom: '20px'}}>
                       <center><span style={{fontSize: "40px", fontWeight: "bold", color: "white"}}>{sessionStorage.getItem("luna_name") ? sessionStorage.getItem("luna_name").charAt(0) : ""}</span></center>
                   </div>
                   <h6 style={{color: '#424242', fontWeight: "bold"}}> {sessionStorage.getItem("luna_name")}</h6>
                   <p style={{color: '#424242', fontSize: '12px'}}> {sessionStorage.getItem("luna_user") ? sessionStorage.getItem("luna_user").toUpperCase() : ""}</p>
                </div>
                <div>
                <ListGroup.Item as={Link} style={linkStyle} to="../../../grades"><SignalCellularAlt/>&nbsp;&nbsp;&nbsp;&nbsp;Grades</ListGroup.Item>                        
                <ListGroup.Item as={Link} style={linkStyle} to="#" onClick={this.signout}><ExitToApp/>&nbsp;&nbsp;&nbsp;&nbsp;Sign-out</ListGroup.Item>
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
            <Navbar expand="lg" bg="info" fixed="bottom" style={{boxShadow: '2px 4px 10px rgba(0,0,0,.2)', padding: '0'}} >
                    <div className="bg-light text-dark" style={{ height: '3rem', width: '100%', paddingTop: '10px'}}>
                        <center>Luna Colleges @ 2020</center>
                    </div>
            </Navbar>
        </div>
        )
    }
}