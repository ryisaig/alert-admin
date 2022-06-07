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
            username: fields['username'],
            password: fields['password'],           
        }
        
        axios.post(BASE_SERVER_URL + 'access/verify', params)
        .then(res => {
            if(res.data){
                swal("Success!", "You have been successfully logged-in", "success").then(()=>{
                    sessionStorage.setItem("call_tree_session", Math.random());
                    sessionStorage.setItem("call_tree_name", res.data);
                    window.location.href = "./dashboard";
                });
            } else {
                swal("Error!", "Invalid Login", "error");
            }
            
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
                    <span style={{marginLeft: '10px', fontSize: '20px'}}>ALERTagaytay</span>
                    </center>
                <div style={{marginTop: '30px'}}>

                <div className="form-group">
                    <label>User ID</label>
                    <input  id="username" type="text" required className="form-control" placeholder="User ID" onChange={this.handleFormValueChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input  id="password" type="password" required className="form-control" placeholder="Password" onChange={this.handleFormValueChange}/>
                </div>
                <button type="submit" className="btn btn-block" style={{height: '50px', marginTop: '30px', backgroundColor: '#3880ff', color: '#fff'}}>Login</button>   
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