import React, {Component} from 'react';

import Navigation from '../../../Components/Navigation/Navigation';
import styles from './TaskListDetails.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

class TaskListDetails extends Component {

    state = {
        listName: "",
        listTasks: []
    };


    componentWillMount() {

        let listInfo = {listID: this.props.match.params.id};
        axios.post('https://task-list-app.herokuapp.com/list/getUserListTasks', listInfo)
            .then((result) => {
                this.setState({
                    listName: result.data.listName,
                    listTasks: result.data.tasks
                });
            })
    }


    changeTaskStatus = (id, status) => {

        let taskInfo = {
            taskID: id
        };

        axios.post('https://task-list-app.herokuapp.com/list/changeTaskStatus', taskInfo)
            .then((result) => {


                let listInfo = {listID: this.props.match.params.id};
                axios.post('https://task-list-app.herokuapp.com/list/getUserListTasks', listInfo)
                    .then((result) => {
                        this.setState({
                            listTasks: result.data.tasks
                        });
                    })

            })
            .catch(() => {
                console.log("error changing status")
            });

    };

    toLists = () =>{
        this.props.history.push("/main");
    };


    render() {


        let taskList = this.state.listTasks.map((task) => {
            return (
                <div className={styles.task} key={task._id}>
                    <div className={styles.taskTitle}>{task.taskTitle}</div>

                    <div
                        className={styles.taskOptions}
                        onClick={() => this.changeTaskStatus(task._id, task.taskStatus)}>
                        {task.taskStatus ?
                            (<div className={styles.unfinishedTask}>x</div>) :
                            (<div className={styles.finishedTask}>✓</div>)}
                    </div>
                </div>);
        });


        return (
            <div className={styles.window}>

                <div className={styles.leftBox}>
                    <Navigation history={this.props.history}/>
                </div>


                <div className={styles.rightBox}>

                    <div className={styles.title}>{this.state.listName}</div>

                    <div className={styles.taskWrapper}>
                        {taskList}
                    </div>


                    <div className={styles.editTaskListWrapper}>
                        <Link style={{textDecoration: 'none'}} to={'/editTaskList/' + this.props.match.params.id}>
                            <div className={styles.editTaskList}>edit task list</div>
                        </Link>
                    </div>

                    <div className={styles.backButtonWrapper}>
                        <div className={styles.backButton} onClick={this.toLists}>Back to Lists</div>
                    </div>

                </div>

            </div>

        );
    }
}

export default TaskListDetails;