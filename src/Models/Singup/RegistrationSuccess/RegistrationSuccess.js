import React, {Component} from 'react';
import styles from "./RegistrationSuccess.module.css";



class RegistrationSuccess extends Component {

    login = () =>{
        this.props.history.push("/login");
    };

    render() {
        return (
            <div className={styles.loginWindow}>

                <div className={styles.title}>Registration was Successfull</div>
                <div className={styles.login}>
                    <div className={styles.loginButton} onClick={this.login}> Login </div>
                </div>

            </div>
        );
    }
}

export default RegistrationSuccess;