import React, {Component} from 'react';
import styles from "./EditTaskList.module.scss";
import Navigation from "../../../Components/Navigation/Navigation";
import axios from "axios";
import {Link} from "react-router-dom";


class EditTaskList extends Component {

    state = {
        listName: "",
        newTaskName: "",
        listOfTasks: [],
        taskLengthValidation: false,
        noTaskValidation: false
    };


    componentWillMount() {
        let token = localStorage.getItem("token");
        let listInfo = {listID: this.props.match.params.id};

        axios.post('http://localhost:8080/list/getUserListTasks' , listInfo)
            .then((result)=>{
                this.setState({
                    listName : result.data.listName,
                    listOfTasks : result.data.tasks
                });

            })
    };


    onTaskNameChange = (e) => {
        this.setState({
            newTaskName: e
        });
    };


    addTask = (id) => {

        if (this.state.newTaskName.length <= 4) {

            this.setState({
                taskLengthValidation: true
            });

        } else {
            let task = {
                listID: this.props.match.params.id,
                taskTitle: this.state.newTaskName,
                taskStatus: true
            };


            let listInfo = {listID: this.props.match.params.id};
            let token = localStorage.getItem("token");

            axios.post('http://localhost:8080/list/addOneTaskToList', task, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then((result)=>{


                    axios.post('http://localhost:8080/list/getUserListTasks' , listInfo)
                        .then((result)=>{
                            this.setState({
                                listName : result.data.listName,
                                listOfTasks : result.data.tasks,
                                newTaskName: "",
                                taskLengthValidation: false,
                                noTaskValidation: false
                            });

                        })


                    })
                .catch(()=>{});

        }
    };



    deleteTask = (id) => {

        let taskInfo = {
            taskID: id
        };


        let listInfo = {listID: this.props.match.params.id};


        axios.post('http://localhost:8080/list/deleteTask', taskInfo)
            .then(() => {


                axios.post('http://localhost:8080/list/getUserListTasks' , listInfo)
                    .then((result)=>{
                        this.setState({
                            listName : result.data.listName,
                            listOfTasks : result.data.tasks
                        });

                    })


            })

    };


    render() {


        let taskList = this.state.listOfTasks.map((task)=>{
            return(
                <div className={styles.task} key={task._id}>
                    <div className={styles.taskTitle}>{task.taskTitle}</div>

                    <div
                        className={styles.taskOptions}
                        onClick={() =>this.deleteTask(task._id)}>
                            <div className={styles.unfinishedTask}> - </div>
                    </div>
                </div>);
        });




        return (
            <div className={styles.window}>

                <div className={styles.leftBox}>
                    <Navigation history={this.props.history}/>
                </div>


                <div className={styles.rightBox}>

                    <div className={styles.title}>Edit {this.state.listName} List</div>

                    <div className={styles.taskInput}>
                        <input className={styles.listName}
                               type="text"
                               placeholder="Write Task"
                               value={this.state.newTaskName}
                               onChange={(e) => this.onTaskNameChange(e.target.value)}
                        />
                    </div>

                    {this.state.taskLengthValidation ? (
                        <div className={styles.validationError}>Task should contain at least 5 characters</div>) : null}
                    {this.state.noTaskValidation ? (
                        <div className={styles.validationError}>You should add at least one task </div>) : null}

                    <div className={styles.addTaskButtonWrapper}>
                        <div onClick={this.addTask} className={styles.addTaskButton}> Add Task</div>
                    </div>



                    <div className={styles.taskWrapper}>
                        {taskList}
                    </div>


                    <div className={styles.editTaskListWrapper}>
                        <Link style={{textDecoration: 'none'}} to={'/listDetails/' + this.props.match.params.id }>
                            <div className={styles.editTaskList}>finish</div>
                        </Link>
                    </div>


                </div>
            </div>
        );
    }
}

export default EditTaskList;
