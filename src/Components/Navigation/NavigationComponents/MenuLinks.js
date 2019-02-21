import React, {Component} from 'react';
import styles from '../Navigation.module.css';
import {Link} from 'react-router-dom';

class MenuLinks extends Component {

    render() {
        return (


                <div className={styles.navigationLinksWrapper}>
                    <Link className={styles.linkLink} to='/main'>
                        <div className={styles.link}>Lists</div>
                    </Link>

                    <Link className={styles.linkLink} to='/createList'>
                        <div className={styles.link}>Create New List</div>
                    </Link>
                </div>

        );
    }
}

export default MenuLinks;
