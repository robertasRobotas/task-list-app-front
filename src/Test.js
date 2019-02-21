import React, { Component } from 'react';
import styles from './Test.module.css';

class Test extends Component {
    render() {
        return (
            <div className={styles.relativeLayer}>
                <div className={styles.fixedLayer}>

                </div>
            </div>
        );
    }
}

export default Test;