import React, {Component} from 'react';
import styles from './Singup.module.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import Inputs from "./components/Inputs";


class Singup extends Component {

    state = {
        name: String,
        email: String,
        password: String,
        serverValidationErrors: []
    };


    onNameChange = (e) =>{
        this.setState({
            name:e
        });
    };

    onEmailChange = (e) =>{
        this.setState({
            email:e
        });
    };

    onPasswordChange = (e) =>{
        this.setState({
            password:e
        });
    };

    onSubmit = async () =>{

        let userInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };

        await axios.post('http://localhost:8080/user/singup', userInfo)
            .then((result)=>{
                this.setState({
                    serverValidationErrors: []
                });
                this.props.history.push('registrationSuccess');
            })
            .catch((err)=>{

                this.setState({
                    serverValidationErrors : err.response.data.errors
                });
            });
    };


    render() {

        let errorList = this.state.serverValidationErrors.map((error)=>{return(<div className={styles.validation}>* {error}</div>)});
        return (

            <div className={styles.loginWindow}>

                <div className={styles.title}>ToDo</div>
                <div className={styles.loginForm}>

                   <Inputs
                       name={this.state.name}
                       email={this.state.email}
                       password={this.state.password}
                       onNameChange={this.onNameChange}
                       onEmailChange={this.onEmailChange}
                       onPasswordChange={this.onPasswordChange}
                   />

                    <div className={styles.validationList}>{errorList}</div>
                    <button className={styles.loginButton} onClick={this.onSubmit}>SingUp</button>

                    <br/>
                    <Link className={styles.link1} to="/login">Login</Link>


                    <Link className={styles.link2} to="/forgetPassword">Forgot password?</Link>

                </div>

            </div>

        );
    }
}

export default Singup;
