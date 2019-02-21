import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './NavigationComponents.module.css';
import axios from "axios";


class Lists extends Component {

    state = {
        lists : []
    };

    componentWillMount (){
        let token = localStorage.getItem("token");


        axios.get('http://localhost:8080/list/getAllUserLists', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((result)=>{
            this.setState({
                lists : result.data.lists
            });
        }).catch((err)=>{
            console.log(err);
        })
    };


    render() {

        let lists = this.state.lists.map((list)=>{
            return(<Link to={"/listDetails/" + list._id} key={list._id} style={{textDecoration : 'none'}}>
                <div className={styles.listLink}>{list.listName}</div>
            </Link>);
        });

        return (
            <div className={styles.listsWrapper}>
                <div className={styles.title} >Lists</div>

                {lists}

            </div>
        );
    }
}

export default Lists;