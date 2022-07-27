import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Layout from './container/Layout';
import CallTreePage from './container/calltree/CallTreePage';
import CallTreeResponses from './container/calltree/CallTreeResponses';

import Login from './container/authenticate/LoginForm';
import MyAccount from './container/authenticate/MyAccount';
import EditAccount from './container/authenticate/EditAccount';
import axios from 'axios'
import InstructionPage from './component/InstructionPage';
import ViewUserList from './container/user/ViewUserList';
import InformationalList from './container/calltree/InformationalList';
import AlertList from './container/calltree/AlertList';
import Dashboard from './container/calltree/Dashboard';
import Assessments from './container/calltree/Assessments';
import AdminUsers from './container/user/AdminUsers';

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
                 <Route path="/users" render={(props) => 
                  <ViewUserList {...props}>
                    </ViewUserList>
                }/>
                 <Route path="/admin-users" render={(props) => 
                  <AdminUsers {...props}>
                    </AdminUsers>
                }/>
                 <Route path="/calltree/:id/responses" render={(props) => 
                  <CallTreeResponses {...props}>
                    </CallTreeResponses>
                }/>
                 <Route path="/calltree" render={(props) => 
                  <CallTreePage {...props}>
                    </CallTreePage>
                }/>
                
                <Route path="/alerts" render={(props) => 
                  <InformationalList {...props}>
                    </InformationalList>
                }/>
                 <Route path="/dashboard" render={(props) => 
                  <Dashboard {...props}>
                    </Dashboard>
                }/>
                <Route path="/emergency" render={(props) => 
                  <AlertList {...props}>
                    </AlertList>
                }/>
                
                <Route path="/assessments" render={(props) => 
                  <Assessments {...props}>
                    </Assessments>
                }/>
                 <Route path="/brgy-assessment" render={(props) => 
                  <Assessments {...props}>
                    </Assessments>
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
