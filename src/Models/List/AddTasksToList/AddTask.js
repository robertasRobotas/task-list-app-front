import React, { Component } from 'react';
import styles from "./AddTaskToList.module.scss";
import Navigation from "../../../Components/Navigation/Navigation";
import axios from "axios";



class AddTask extends Component {

    state ={
        listName: "",
        listID : "",
        newTaskName: "",
        listOfTasks : [],
        id : 0,
        taskLengthValidation:false,
        noTaskValidation:false
    };


    componentWillMount() {
        let token = localStorage.getItem("token");
        let listID = {listID :this.props.match.params.id};

        axios.post('https://task-list-app.herokuapp.com/list/getUserListsDetails', listID,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{
                this.setState({
                    listName : res.data.lists.listName,
                    listID : res.data.lists._id
                });
                console.log(res.data);
            })
            .catch((err) => {
                    console.log(err.response);
                if (err.response.status === 401) {
                    console.log(err.response);
                    this.props.history.push('/login');
                }
            })
    };


    onTaskNameChange = (e) => {
        this.setState({
            newTaskName: e
        });
    };


    addTask = () =>{

        if(this.state.newTaskName.length <= 4){

            this.setState({
                taskLengthValidation: true
            });

        }else {
            let task = {
                taskID: this.state.id,
                taskTitle: this.state.newTaskName,
                taskStatus: true
            };

            let newListOfTasks = this.state.listOfTasks;
            newListOfTasks.push(task);

            this.setState({
                listOfTasks: newListOfTasks,
                newTaskName: "",
                id: this.state.id + 1,
                taskLengthValidation: false,
                noTaskValidation: false
            });

        }
    };



    createList  = () =>{

        if(this.state.listOfTasks.length === 0){

            this.setState({
                noTaskValidation: true
            });

        }else{
            this.setState({
                noTaskValidation: false
            });
        }

        if(this.state.listName.length <= 4){

            this.setState({
                listNameValidation: true
            });

        }else{

            this.setState({
                listNameValidation: false
            });
        }


        if((this.state.listOfTasks.length !== 0) && (this.state.listName.length > 4)){

            let task = {
                listID: this.state.listID,
                listOfTasks: this.state.listOfTasks
            };

            let token = localStorage.getItem("token");

            axios.post('https://task-list-app.herokuapp.com/list/addTaskToList', task, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(()=>{
                    this.props.history.push("/listDetails/"+ this.state.listID);
                })
                .catch(err=>{
                    console.log('errrrrrrrr');
                });

        }

    };



    deleteTask = (id) =>{

        let newListOfTasks = this.state.listOfTasks;

        newListOfTasks = newListOfTasks.filter(e=> e.taskID !== id);

        this.setState({
            listOfTasks : newListOfTasks
        });
    };



    render() {
        return (
            <div className={styles.window}>

                <div className={styles.leftBox}>
                    <Navigation history={this.props.history}/>
                </div>


                <div className={styles.rightBox}>

                    <div className={styles.title}>Add tasks to {this.state.listName} List</div>

                    <div className={styles.taskInput}>
                        <input className={styles.listName}
                               type="text"
                               placeholder="Write Task"
                               value={this.state.newTaskName}
                               onChange={(e)=>this.onTaskNameChange(e.target.value)}
                        />
                    </div>

                    {this.state.taskLengthValidation ? (<div className={styles.validationError}>Task should contain at least 5 characters</div>):null}
                    {this.state.noTaskValidation ? (<div className={styles.validationError}>You should add at least one task </div>):null}

                    <div className={styles.addTaskButtonWrapper}>
                        <div onClick={this.addTask} className={styles.addTaskButton}> Add Task </div>
                    </div>



                    <div className={styles.addTaskButtonWrapper}>
                        <div onClick={this.createList} className={styles.createListButton}> Create Task List </div>
                    </div>

                    <div className={styles.taskWrapper}>
                        {this.state.listOfTasks.map((task)=>{
                            return(
                                <div className={styles.task} key={task.taskID}>
                                    <div className={styles.taskTitle}>{task.taskTitle}</div>
                                    <div className={styles.taskOptions} onClick={()=>this.deleteTask(task.taskID)}> - </div>
                                </div>);
                        })}
                    </div>

                </div>
            </div>
        );
    }
}

export default AddTask;
