import React, { Component } from 'react';
import styles from "../Singup.module.css";
import {Link} from "react-router-dom";


class Inputs extends Component {
    render() {
        return (
            <div>

                <input type="text" placeholder="name" value={this.props.name} onChange={(e)=>this.props.onNameChange(e.target.value)}/>
                <input type="text" placeholder="email" value={this.props.email} onChange={(e)=>this.props.onEmailChange(e.target.value)}/>
                <input type="password" placeholder="password" value={this.props.password} onChange={(e)=>this.props.onPasswordChange(e.target.value)}/>

            </div>
        );
    }
}

export default Inputs;