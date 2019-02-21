import React, { Component } from 'react';
import styles from './Password.module.css';
import axios from 'axios';

class ForgetPasswordEmail extends Component {


    state = {
        email : String,
        emailErrors : []
    };

    onEmailChange = (e) => {
        this.setState({
            email: e
        });

    };

    sendEmail = () =>{

        let email = {
            email : this.state.email
        };

        axios.post('http://localhost:8080/user/setUserSecretKeyAndSendEmail',email)
            .then((response)=>{
                this.setState({
                    emailErrors : []
                });
                this.props.history.push("/emailSent");
            })
            .catch((err)=>{
                this.setState({
                    emailErrors : err.response.data.errors
                });
            })
    };

    render() {


        let emailErrors = this.state.emailErrors.map((error)=>{
            return(<div key={error}>{error}</div>);
        });


        return (
            <div className={styles.window}>

                <div className={styles.titleWrapper}>
                <div className={styles.title}>Enter your email address</div>
                </div>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} placeholder="email" value={this.state.email} onChange={(e)=>{this.onEmailChange(e.target.value)}}/>
                </div>

                <div className={styles.sendEmailButtonWrapper}>
                    <div className={styles.sendEmailButton} onClick={this.sendEmail}>send email</div>
                </div>


                <div className={styles.errorsWrapper}>
                    <div className={styles.errors}>{emailErrors}</div>
                </div>


            </div>
        );
    }
}

export default ForgetPasswordEmail;