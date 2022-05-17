import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Layout from './container/Layout';
import CallTreePage from './container/calltree/CallTreePage';
import Login from './container/authenticate/LoginForm';
import MyAccount from './container/authenticate/MyAccount';
import EditAccount from './container/authenticate/EditAccount';
import axios from 'axios'
import InstructionPage from './component/InstructionPage';

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("luna_session");
  config.headers.Authorization =  token;

  return config;
});

function App() {
  return (
    <div id="app" style={{heigt: '100%'}}>
      <Switch>
          <Route path="/login" render={(props) => 
                        <Login {...props}/>
                      }/>
          <Route path='/'>
            <Layout>
              <Switch>
                 <Route path="/my-account" render={(props) => 
                   <MyAccount  {...props}>
                    <Switch>
                      <Route path="/my-account/:id/edit" render={(props) => 
                          <EditAccount {...props}/>
                      }/>
                    </Switch>
                  </MyAccount>
                }/>
                 <Route path="/calltree" render={(props) => 
                  <CallTreePage {...props}>
                    </CallTreePage>
                }/>
                <Route path="/" render={(props) => 
                   <InstructionPage/>
                }/>

              </Switch>
            </Layout>
         </Route>
         <Route path="/login" render={(props) => 
                        <Login {...props}/>
                      }/>
          
        </Switch>
    </div>
  );
}

export default App;
