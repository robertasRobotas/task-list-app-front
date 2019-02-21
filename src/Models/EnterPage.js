import React, { Component } from 'react';
import axios from 'axios';

class EnterPage extends Component{

    componentWillMount(){

        let token = localStorage.getItem("token");

        axios.get('http://localhost:8080/user/authUser',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(() => {
                this.props.history.push('/main');
            })
            .catch(() => {
                this.props.history.push('/login');
            });

    }

    render(){
        return(<div></div>);
    }

}

export default EnterPage;
