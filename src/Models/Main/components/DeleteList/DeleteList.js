import React, { Component } from 'react';
import styles from './DeleteList.module.css';


class DeleteList extends Component {
    render() {
        return (
            <div className={styles.deleteListWindow}>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>Are you really want to delete {this.props.name} list ?</div>
                </div>


                <div className={styles.buttonsWrapper}>
                    <div className={styles.buttonYes} onClick={this.props.pressYes}>Yes</div>
                    <div className={styles.buttonNo} onClick={this.props.pressNo}>No</div>
                </div>


            </div>
        );
    }
}

export default DeleteList;