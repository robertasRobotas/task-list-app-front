import React, {Component} from 'react';
import styles from './Login.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Login extends Component {

    state = {
        name: String,
        email: String,
        password: String,
        serverValidationErrors : ""
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
            email: this.state.email,
            password: this.state.password,
        };

            await axios.post('http://localhost:8080/user/login', userInfo)
                .then((result)=>{

                    localStorage.setItem('token', result.data.jwt)

                    this.props.history.push('/main');
                })
                .catch((err)=>{

                    this.setState({
                        serverValidationErrors : err.response.data.message
                    });
                });
            console.log(this.state.serverValidationErrors);
    };


    render() {



        return (

            <div className={styles.loginWindow}>

                <div className={styles.title}>ToDo</div>
                <div className={styles.loginForm}>
                    <input type="text" placeholder="email" value={this.state.email} onChange={(e)=>this.onEmailChange(e.target.value)}/>
                    <input type="password" placeholder="password" value={this.state.password} onChange={(e)=>this.onPasswordChange(e.target.value)}/>

                    <div className={styles.validation}>{this.state.serverValidationErrors}</div>
                    <button className={styles.loginButton} onClick={this.onSubmit}>SingUp</button>

                    <br/>
                    <Link className={styles.link1} to="/singup">Singup</Link>


                    <Link className={styles.link2} to="/forgetPassword">Forgot password?</Link>

                </div>


            </div>

        );
    }
}

export default Login;
