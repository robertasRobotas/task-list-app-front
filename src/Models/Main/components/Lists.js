import React, { Component } from 'react';
import styles from './Lists.module.css';

class Lists extends Component {


    render() {
        return (
                        <div className={styles.listButton}>
                            <div>{this.props.title}</div>
                            <br/>
                            <br/>
                            <div className={styles.date}>{this.props.date.split("T")[0]}</div>
                        </div>


        );
    }
}

export default Lists;