import React, {Component} from 'react';

import Navigation from '../../Components/Navigation/Navigation';
import styles from './UserList.module.scss';
import Lists from './components/Lists';
import AddListButon from './components/AddTaskList';
import {Link} from 'react-router-dom';
import DeleteListWindow from './components/DeleteList/DeleteList';

import axios from 'axios';

class UsersList extends Component {

    state = {
        lists : [],
        userName : String,
        deleteList : false,
        listID : "",
        listName : ""
    };

    addList = () =>{
        this.props.history.push('/createList');
    };

    componentWillMount (){

        let token = localStorage.getItem("token");


        axios.get('https://task-list-app.herokuapp.com/list/getAllUserLists', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((result)=>{
            this.setState({
                lists : result.data.lists,
                userName : result.data.user.name
            });
        }).catch((err)=>{
            if(err.response.status === 401){
                this.props.history.push('/login');
            }
        })
    };


    deleteList = (id, name) =>{
        this.setState({
            deleteList : true,
            listID : id,
            listName : name
        });
    };


    yesButton = () =>{

        let token = localStorage.getItem("token");

        axios.post('https://task-list-app.herokuapp.com/list/deleteList', {id : this.state.listID}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((result)=>{





            axios.get('https://task-list-app.herokuapp.com/list/getAllUserLists', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((result)=>{
                this.setState({
                    lists : result.data.lists,
                    userName : result.data.user.name,
                    deleteList : false
                });
            }).catch((err)=>{
                if(err.response.status === 401){
                    this.props.history.push('/login');
                }
            })


        }).catch(err=>{

        });
    };


    noButton = () =>{
        this.setState({
            deleteList : false
        });
    };



    render() {


        let lists = this.state.lists.map((list)=>{
            return(<div key={list._id} className={styles.List}><div onClick={()=>this.deleteList(list._id, list.listName)} className={styles.delete}>x</div><Link to={'/listDetails/' + list._id}><Lists date={list.date} title={list.listName}/></Link></div>);
        });

        return (
            <div className={styles.window}>

                <div className={styles.leftBox}>
                    <Navigation history={this.props.history}/>
                </div>


                <div className={styles.rightBox}>

                    <div className={styles.title}>{this.state.userName} ToDo</div>
                    <AddListButon pressAddList={this.addList}/>
                    <div className={styles.taskListWrapper}>
                    {lists}
                    </div>
                    {this.state.deleteList ? (
                        <DeleteListWindow
                            id={this.state.listID}
                            name={this.state.listName}
                            pressYes={this.yesButton}
                            pressNo={this.noButton}
                        />): null}
                </div>
            </div>
        );
    }
}

export default UsersList;