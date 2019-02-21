import React, { Component } from 'react';
import styles from './Password.module.css';
import axios from 'axios';

class NewPasswordInput extends Component {


    state = {
        password : String,
        passwordErrors : []
    };

    onPasswordChange = (e) => {
        this.setState({
            password: e
        });
    };


    changePassword = async() =>{

        let errArr = [];

        await this.setState({
            passwordErrors : errArr
        });



        if(this.state.password.length < 6 ){
            errArr.push("* Password should contain at least 6 symbols");
            await this.setState({
                passwordErrors:errArr
            });
        }

        if(!(/\d/.test(this.state.password))){
            errArr.push("* Password should have at least one number");
            await this.setState({
                passwordErrors:errArr
            });
        }

        if(this.state.passwordErrors.length === 0){

            const newEmailInfo ={
                newPassword : this.state.password,
                secID : this.props.match.params.id
            };



            axios.post('http://localhost:8080/user/recreatePassword',newEmailInfo)
                .then((result)=>{
                    console.log("password changed");
                    this.props.history.push("/login");
                })
                .catch((err)=>{

                })
        }



    };




    render() {


        let passwordErrors = this.state.passwordErrors.map((error)=>{
            return(<div key={error}><div>{error}</div><br/></div>);
        });

        return (
            <div className={styles.window}>

                <div className={styles.titleWrapper}>
                    <div className={styles.title}>Enter new password</div>
                </div>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} type="password" placeholder="password" value={this.state.password} onChange={(e)=>{this.onPasswordChange(e.target.value)}}/>
                </div>

                <div className={styles.sendEmailButtonWrapper}>
                    <div className={styles.sendEmailButton} onClick={this.changePassword}>change password</div>
                </div>


                <div className={styles.errorsWrapper}>
                    <div className={styles.errors}>{passwordErrors}</div>
                </div>

            </div>
        );
    }
}

export default NewPasswordInput;