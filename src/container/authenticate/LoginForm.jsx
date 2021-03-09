import React from 'react';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import { BASE_SERVER_URL } from '../../utils/BaseServerUrl';
import swal from 'sweetalert';
import GenericRequest from '../../utils/GenericRequest';

class Login extends React.Component {
    constructor(props) {
      super(props);
    }

    state = {
        fields: {}
    }

    handleFormValueChange = (e) =>{
        this.state.fields[e.target.id] = e.target.value;
    }

    componentWillMount(){
        if(sessionStorage.getItem("luna_session") != null){
            window.location.href = "../"
        } 
    }


    login(e, fields){
        e.preventDefault();

        const params = {
            requestId: GenericRequest().requestId,
            session: {
                sessionValue: GenericRequest().sessionValue,
                sessionId: GenericRequest().sessionId,
                username: GenericRequest().username,
                application: GenericRequest().application
            } ,
            username: fields['username'],
            password: fields['password'],
            application: 'GRADING_PORTAL',
            clientIp: ''           
        }
        
        axios.post(BASE_SERVER_URL + 'session', params)
        .then(res => {
            swal("Success!", "You have been successfully logged-in", "success").then(()=>{
                sessionStorage.setItem("luna_user", res.data.username);
                sessionStorage.setItem("luna_session", res.data.sessionId);
                sessionStorage.setItem("luna_id", res.data.userId);
                sessionStorage.setItem("luna_name", res.data.name);
                sessionStorage.setItem("email", res.data.email);

                window.location.href = "./";
       
            })
        }).catch( e => {
            swal("Error!", "Invalid Login", "error");
        })
    }

    render(){

        return(
            <>    
            <form onSubmit={(e) => this.login(e, this.state.fields)} class="bg-light" style={{width: '500px', margin: 'auto', padding: '50px', borderRadius: '20px', position: 'absolute', top: '50%', transform: 'translateY(-50%) translateX(-50%)', left: '50%', boxShadow: '2px 4px 10px rgba(0,0,0,.2)'}}>
                    <center>
                        {/* <img src={logo} alt="" style={{width: '50px'}}/> */}
                    <span style={{marginLeft: '10px', fontSize: '20px'}}>Grading Portal</span>
                    </center>
                <div style={{marginTop: '30px'}}>

                <div className="form-group">
                    <label>Employee ID</label>
                    <input  id="username" type="text" required className="form-control" placeholder="Employee ID" onChange={this.handleFormValueChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input  id="password" type="password" required className="form-control" placeholder="Password" onChange={this.handleFormValueChange}/>
                </div>
                <button type="submit" className="btn btn-info btn-block" style={{height: '50px', marginTop: '30px'}}>Login</button>   
                <p className="forgot-password text-right" style={{marginTop: '15px'}}>
                    {/* <a href="#">Reset Password</a> */}
                </p>     
                </div>     
            </form>
        
            </>
        );
    }
}

export default Login;