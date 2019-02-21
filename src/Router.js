import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import EnterPage from './Models/EnterPage';
import CreateList from './Models/List/CreateTaskList/CreateList';
import AddTaskToList from './Models/List/AddTasksToList/AddTask';
import EditTaskList from './Models/List/EditTaskList/EditTaskList';
import RegistrationSuccess from './Models/Singup/RegistrationSuccess/RegistrationSuccess';
import Login from './Models/Login/Login';
import Singup from './Models/Singup/Singup';
import Main from './Models/Main/Main';
import Test from './Test';
import TaskListDetails from './Models/List/TaskListDetails/TaskListDetails';
import NewPassword from './Models/Password/NewPasswordInput';
import ForgetPassword from './Models/Password/ForgetPasswordEmail';
import EmailSent from './Models/Password/EmailSent';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={EnterPage}/>
                        <Route path="/emailSent" exact component={EmailSent}/>
                        <Route path="/createList" exact component={CreateList}/>
                        <Route path="/addTaskToList/:id" exact component={AddTaskToList}/>
                        <Route path="/forgetPassword" exact component={ForgetPassword}/>
                        <Route path="/newPassword/:id" exact component={NewPassword}/>
                        <Route path="/editTaskList/:id" exact component={EditTaskList}/>
                        <Route path="/listDetails/:id" exact component={TaskListDetails}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/singup" exact component={Singup}/>
                        <Route path="/registrationSuccess" exact component={RegistrationSuccess}/>
                        <Route path="/main" exact component={Main}/>
                        <Route path="/test" exact component={Test}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
