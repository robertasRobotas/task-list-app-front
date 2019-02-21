import React, { Component } from 'react';
import styles from '../UserList.module.scss';

class AddTaskList extends Component {



    render() {
        return (
            <div className={styles.buttonWrapper}>
                <div className={styles.addListButton}
                     onClick={this.props.pressAddList}><br/>Add Task List <br/>
                    <div className={styles.plus}>+</div> </div>
            </div>
        );
    }
}

export default AddTaskList;
