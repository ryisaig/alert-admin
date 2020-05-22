import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import CreateSubject from './container/subject/CreateSubject';
import EditSubject from './container/subject/EditSubject';

import Layout from './container/Layout';
import ViewSubjectList from './container/subject/ViewSubjectList';
import ViewUserList from './container/user/ViewUserList';
import CreateUser from './container/user/CreateUser';
import ViewRoomList from './container/room/ViewRoomList';
import ViewRoomDetails from './container/room/ViewRoomDetails';
import CreateRoom from './container/room/CreateRoom';
import EditRoom from './container/room/EditRoom';
import ViewClassList from './container/class/ViewClassList';
import CreateClass from './container/class/CreateClass';
import EditClass from './container/class/EditClass';
import ViewCourseList from './container/course/ViewCourseList';
import CreateCourse from './container/course/CreateCourse';
import EditCourse from './container/course/EditCourse';
import ViewSectionList from './container/section/ViewSectionList';
import CreateSection from './container/section/CreateSection';
import EditSection from './container/section/EditSection';
import ViewTeacherList from './container/teacher/ViewTeacherList';
import CreateTeacher from './container/teacher/CreateTeacher';
import EditTeacher from './container/teacher/EditTeacher';
import ViewStudentList from './container/student/ViewStudentList';
import ViewStudentDetails from './container/student/ViewStudentDetails';
import CreateStudent from './container/student/CreateStudent';
import EditStudent from './container/student/EditStudent';
import ViewGradeList from './container/grade/ViewGradeList';
import EditGrade from './container/grade/EditGrade';
import ViewRoleList from './container/role/ViewRoleList';
import CreateRole from './container/role/CreateRole';
import EditRole from './container/role/EditRole';
import ViewFunctionList from './container/function/ViewFunctionList';
import EditUser from './container/user/EditUser';
import ViewChannelList from './container/channel/ViewChannelList';
import ViewCollegeList from './container/college/ViewCollegeList';
import EditCollege from './container/college/EditCollege';
import CreateCollege from './container/college/CreateCollege';
import ViewSchoolYearSemesterList from './container/schoolyear/ViewSchoolYearList';
import EditSchoolYearSemester from './container/schoolyear/EditSchoolYear';
import CreateSchoolYearSemester from './container/schoolyear/CreateSchoolYear';
import Login from './container/authenticate/LoginForm';
import MyAccount from './container/authenticate/MyAccount';
import EditAccount from './container/authenticate/EditAccount';
import DefaultPage from './container/DefaultPage';
import ViewSubjectDetails from './container/subject/ViewSubjectDetails';
import ViewSectionDetails from './container/section/ViewSectionDetails';
import ViewClassDetails from './container/class/ViewClassDetails';
import ViewTeacherDetails from './container/teacher/ViewTeacherDetails';
import ViewCourseDetails from './container/course/ViewCourseDetails';
import NewEnrollment from './container/enrollment/NewEnrollment';
import EnrollmentList from './container/enrollment/EnrollmentList';
import OldEnrollment from './container/enrollment/OldEnrollment';
import EditNewEnrollment from './container/enrollment/EditNewEnrollment';
import EditOldEnrollment from './container/enrollment/EditOldEnrollment';
import ViewNewEnrollmentDetails from './container/enrollment/ViewNewEnrollmentDetails';
import ViewOldEnrollmentDetails from './container/enrollment/ViewOldEnrollmentDetails';


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
                <Route exact path="/enrollment" render={(props) => 
                          <EnrollmentList {...props}/>
                }/>
                 <Route exact path="/enrollment/:id/new/edit" render={(props) => 
                          <EditNewEnrollment {...props}/>
                }/>
                 <Route exact path="/enrollment/:id/old/edit" render={(props) => 
                          <EditOldEnrollment {...props}/>
                }/>
                 <Route exact path="/enrollment/:id/new/details" render={(props) => 
                          <ViewNewEnrollmentDetails {...props}/>
                }/>
                 <Route exact path="/enrollment/:id/old/details" render={(props) => 
                          <ViewOldEnrollmentDetails {...props}/>
                }/>
                 <Route 
                  path="/enroll-new" 
                  render={(props) => 
                          <NewEnrollment {...props}/>
                }/>
                 <Route path="/enroll-old" render={(props) => 
                          <OldEnrollment {...props}/>
                }/>
                {/* Administrative */}
                <Route path="/subject/:id/details" render={(props) => 
                   <ViewSubjectDetails  {...props}>
                        <Route path="/subject/:id/details/edit" render={(props) => 
                            <EditSubject {...props}/>
                        }/>
                   </ViewSubjectDetails>
                }/>
                <Route path="/subject" render={(props) => 
                   <ViewSubjectList  {...props}>
                    <Switch>
                      <Route path="/subject/:id/edit" render={(props) => 
                          <EditSubject {...props}/>
                      }/>
                      <Route path="/subject/create" render={(props) => 
                          <CreateSubject {...props}/>
                      }/>
                    </Switch>
                  </ViewSubjectList>
                }/>
                  <Route path="/room/:id/details" render={(props) => 
                   <ViewRoomDetails  {...props}>
                        <Route path="/room/:id/details/edit" render={(props) => 
                            <EditRoom {...props}/>
                        }/>
                   </ViewRoomDetails>
                }/>
                <Route path="/room" render={(props) => 
                  <ViewRoomList {...props}>
                    <Switch>
                      <Route path="/room/:id/edit" render={(props) => 
                        <EditRoom {...props}/>
                      }/>
                      <Route path="/room/create" render={(props) => 
                        <CreateRoom {...props}/>
                      }/>
                    </Switch>
                  </ViewRoomList>
                }/>
                 <Route path="/class/:id/details" render={(props) => 
                   <ViewClassDetails  {...props}>
                        <Route path="/class/:id/details/edit" render={(props) => 
                            <EditClass {...props}/>
                        }/>
                   </ViewClassDetails>
                }/>
                 <Route path="/class" render={(props) => 
                  <ViewClassList {...props}>
                    <Switch>
                      <Route path="/class/:id/edit" render={(props) => 
                        <EditClass {...props}/>
                      }/>
                      <Route path="/class/create" render={(props) => 
                        <CreateClass {...props}/>
                      }/>
                    </Switch>
                  </ViewClassList>
                }/>
                 <Route path="/section/:id/details" render={(props) => 
                   <ViewSectionDetails  {...props}>
                        <Route path="/section/:id/details/edit" render={(props) => 
                            <EditSection {...props}/>
                        }/>
                   </ViewSectionDetails>
                }/>
                 <Route path="/section" render={(props) => 
                  <ViewSectionList {...props}>
                    <Switch>
                      <Route path="/section/:id/edit" render={(props) => 
                        <EditSection {...props}/>
                      }/>
                      <Route path="/section/create" render={(props) => 
                        <CreateSection {...props}/>
                      }/>
                    </Switch>
                  </ViewSectionList>
                }/>
                  <Route path="/course/:id/details" render={(props) => 
                   <ViewCourseDetails  {...props}>
                        <Route path="/course/:id/details/edit" render={(props) => 
                            <EditCourse {...props}/>
                        }/>
                   </ViewCourseDetails>
                }/>
                 <Route path="/course" render={(props) => 
                  <ViewCourseList {...props}>
                    <Switch>
                      <Route path="/course/:id/edit" render={(props) => 
                        <EditCourse {...props}/>
                      }/>
                      <Route path="/course/create" render={(props) => 
                        <CreateCourse {...props}/>
                      }/>
                    </Switch>
                  </ViewCourseList>
                }/>
                    <Route path="/college" render={(props) => 
                  <ViewCollegeList {...props}>
                    <Switch>
                      <Route path="/college/:id/edit" render={(props) => 
                        <EditCollege {...props}/>
                      }/>
                      <Route path="/college/create" render={(props) => 
                        <CreateCollege {...props}/>
                      }/>
                    </Switch>
                  </ViewCollegeList>
                }/>
                  <Route path="/teacher/:id/details" render={(props) => 
                   <ViewTeacherDetails  {...props}>
                        <Route path="/teacher/:id/details/edit" render={(props) => 
                            <EditTeacher {...props}/>
                        }/>
                   </ViewTeacherDetails>
                }/>
                 <Route path="/teacher" render={(props) => 
                  <ViewTeacherList {...props}>
                    <Switch>
                      <Route path="/teacher/:id/edit" render={(props) => 
                        <EditTeacher {...props}/>
                      }/>
                      <Route path="/teacher/create" render={(props) => 
                        <CreateTeacher {...props}/>
                      }/>
                    </Switch>
                  </ViewTeacherList>
                }/>
                 <Route path="/student/:id/details" render={(props) => 
                   <ViewStudentDetails  {...props}>
                        <Route path="/student/:id/details/edit" render={(props) => 
                            <EditStudent {...props}/>
                        }/>
                   </ViewStudentDetails>
                }/>
                 <Route path="/student" render={(props) => 
                  <ViewStudentList {...props}>
                    <Switch>
                      <Route path="/student/:id/edit" render={(props) => 
                        <EditStudent {...props}/>
                      }/>
                      <Route path="/student/create" render={(props) => 
                        <CreateStudent {...props}/>
                      }/>
                    </Switch>
                  </ViewStudentList>
                }/>
                 <Route path="/grade" render={(props) => 
                  <ViewGradeList {...props}>
                     <Switch>
                      <Route path="/grade/:id/edit" render={(props) => 
                        <EditGrade {...props}/>
                      }/>
                    </Switch>
                    </ViewGradeList>
                }/>
                  <Route path="/role" render={(props) => 
                  <ViewRoleList {...props}>
                    <Switch>
                      <Route path="/role/:id/edit" render={(props) => 
                        <EditRole {...props}/>
                      }/>
                      <Route path="/role/create" render={(props) => 
                        <CreateRole {...props}/>
                      }/>
                    </Switch>
                  </ViewRoleList>
                }/>
                     <Route path="/function" render={(props) => 
                        <ViewFunctionList {...props}/>
                    }/>
                     <Route path="/channel" render={(props) => 
                        <ViewChannelList {...props}/>
                    }/>
                   <Route path="/user" render={(props) => 
                  <ViewUserList {...props}>
                    <Switch>
                      <Route path="/user/:id/edit" render={(props) => 
                        <EditUser {...props}/>
                      }/>
                      <Route path="/user/create" render={(props) => 
                        <CreateUser {...props}/>
                      }/>
                    </Switch>
                  </ViewUserList>
                }/>
                 <Route path="/school-year" render={(props) => 
                  <ViewSchoolYearSemesterList {...props}>
                    <Switch>
                      <Route path="/school-year/:id/edit" render={(props) => 
                        <EditSchoolYearSemester {...props}/>
                      }/>
                      <Route path="/school-year/create" render={(props) => 
                        <CreateSchoolYearSemester {...props}/>
                      }/>
                    </Switch>
                  </ViewSchoolYearSemesterList>
                }/>
                <Route path="/troubleshoot" render={(props) => 
                        <DefaultPage {...props}/>
                  }/>
                 <Route path="/user-manual" render={(props) => 
                        <DefaultPage {...props}/>
                  }/>
                 <Route path="/developer" render={(props) => 
                        <DefaultPage {...props}/>
                  }/>
                    <Route path="/admissions" render={(props) => 
                        <DefaultPage {...props}/>
                  }/>
                 <Route path="/preregistrations" render={(props) => 
                        <DefaultPage {...props}/>
                  }/>
                 <Route path="/for-approvals" render={(props) => 
                        <DefaultPage {...props}/>
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
