import React, {Component} from 'react';
import styles from "./CreateList.module.scss";
import Navigation from "../../../Components/Navigation/Navigation";
import axios from 'axios';


class CreateList extends Component {

    state = {
        listName: "",
        listNameValidation: false
    };

    componentWillMount() {
        let token = localStorage.getItem("token");

        axios.get('https://task-list-app.herokuapp.com/user/authUser',
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then()
            .catch((err) => {

                if (err.response.status === 401) {
                    this.props.history.push('/login');
                }
            })
    };

    onListNameChange = (e) => {
        this.setState({
            listName: e
        });
    };

    createList = () => {


        if (this.state.listName.length <= 4) {

            this.setState({
                listNameValidation: true
            });

        } else {

            this.setState({
                listNameValidation: false
            });
        }

        if (this.state.listName.length > 4) {

            let token = localStorage.getItem("token");
            let listInfo = {listName: this.state.listName};


            axios.post('https://task-list-app.herokuapp.com/list/createList', listInfo, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }).then((result) => {
                this.props.history.push("/addTaskToList/" + result.data.list._id)
            }).catch((err) => {
                console.log(err.response);
                if (err.response.status === 401) {
                    this.props.history.push('/login');
                }
            });

        }
    };


    render() {
        return (
            <div className={styles.window}>

                <div className={styles.leftBox}>
                    <Navigation history={this.props.history}/>
                </div>

                <div className={styles.rightBox}>

                    <div className={styles.title}>Write New List Name</div>
                    <div className={styles.listNameWrapper}>
                        <input value={this.state.listName}
                               className={styles.listName}
                               type="text"
                               placeholder="List name"
                               onChange={(e) => this.onListNameChange(e.target.value)}
                        />
                    </div>

                    {this.state.listNameValidation ? (
                        <div className={styles.validationError}>List Name should contain at least 5
                            characters</div>) : null}

                    <div className={styles.createListButtonWrapper}>
                        <div onClick={this.createList} className={styles.createListButton}> Create Task List</div>
                    </div>

                </div>

            </div>
        );
    }
}

export default CreateList;
