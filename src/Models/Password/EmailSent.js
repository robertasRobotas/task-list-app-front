import React, { Component } from 'react';
import styles from './Password.module.css';

class EmailSent extends Component {
    render() {
        return (
            <div className={styles.window}>
                <div className={styles.titleWrapper}>
                    <div className={styles.title}>Email were sent</div>
                </div>

                <div className={styles.descriptionWrapper}>
                    <div className={styles.title}>If you can not see email check in a spam.</div>
                </div>

                <div className={styles.trashWrapper}>
                    <div className={styles.trash}><i className="fas fa-trash"></i></div>
                </div>
            </div>
        );
    }
}

export default EmailSent;