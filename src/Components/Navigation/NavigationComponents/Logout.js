import React, {Component} from 'react';
import styles from './NavigationComponents.module.css';


class Logout extends Component {

    logout=()=>{
            localStorage.removeItem("token");
            this.props.history.push("/login");
    };

    render() {
        return (
          <div className={styles.logout} onClick={this.logout}>Logout</div>
        );
    }
}

export default Logout;