import React, {Component} from 'react';
import styles from './Navigation.module.css';
import {Link} from 'react-router-dom';
import MenuLinks from './NavigationComponents/MenuLinks';
import ListsLinks from './NavigationComponents/Lists';
import Logout from './NavigationComponents/Logout';

class Navigation extends Component {



    render() {
        return (
            <div>
                <Link style={{textDecoration: "none"}} to={"/main"}><div className={styles.title}>ToDo</div></Link>

                <MenuLinks/>
                <ListsLinks/>

            <Logout history={this.props.history}/>

            </div>
        );
    }
}

export default Navigation;