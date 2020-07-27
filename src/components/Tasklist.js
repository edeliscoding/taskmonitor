import React, { Component } from "react";
import Taskitem from "./Taskitem";
import axios from "axios";
const { uuid } = require("uuidv4");

export default class Tasklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      comment: ""
    };
    this.updateTask = this.updateTask.bind(this);
  }

  // onUserNameChangeHandler = firstName => {
  //   this.setState(prevState => {
  //     prevState.tasks.tasks[0].firstName = firstName;
  //     return { ...prevState };
  //   });
  // };

  // onUserNameChangeHandler = firstName => {
  //   this.setState(prevState => {
  //    {...prevState.tasks.tasks[0].firstName = firstName}
  //    return
  //   })

  // }

  // onUserNameChangeHandler = firstName => {
  //   this.setState(prevState => {
  //     prevState.comment = firstName;
  //   });
  // };

  OnUpdateTask = (event, index) => {
    const tasks = this.state.tasks;
    tasks[index].firstName = event.target.value;
    this.setState({
      tasks
    });
  };

  componentDidMount() {
    axios.get("http://localhost:3001/api/dashboard").then(response => {
      // response.map(item => item.tasks.firstName);
      // let first;
      //     let last;
      //     const task = this.state.tasksArray.map(item => {
      //       first = item.firstName;
      //       last = item.lastName;
      //     });
      this.setState({
        tasks: response.data,
        comment: response.data.additional
      });
      console.log(response.data);
      // console.log(this.state.comment);
    });
  }
  //{
  //   tasks: [
  //     { firstName: 'abc', lastName: 'comment 1' },
  //     { firstName: 'def', lastName: 'comment 2' }
  //   ],
  //   comment: 'this is a comment from req.body'
  // }

  updateTask(id, task, comment, additional) {
    const updatedProject = this.state.tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          firstName: (t.tasks.firstName = task),
          lastName: comment
        };
      }
      return t;
    });
    this.setState({ tasks: updatedProject, comment: additional });
  }

  handleremoveTask = id => {
    axios
      .delete("http://localhost:3001/api/task/" + id)
      .then(response => console.log(response));
    this.setState({ tasks: this.state.tasks.filter(task => task._id !== id) });
  };
  render() {
    const tasksall = this.state.tasks.map((task, index) => {
      // let first;
      // let last;
      const fname = task.tasks.map(t => t.firstName);
      const lname = task.tasks.map(t => t.lastName);

      const first_fname = fname[0];
      const first_lname = lname[0];

      console.log(first_fname);
      // first = task.firstName;
      // last = task.lastName;

      return (
        <Taskitem
          updateTask2={event => {
            this.OnUpdateTask(event);
          }}
          // fNameIndex={this.state.tasks[index].firstName}
          // lNameIndex={this.state.tasks[index].lastName}
          tasksArray={task.tasks}
          fname={first_fname}
          lname={first_lname}
          // onUserNameChangeHandler={this.onUserNameChangeHandler}
          // taskFirstName={this.state.first}
          // taskLastName={this.state.last}
          comment={task.additional}
          updateTask={this.updateTask}
          id={task._id}
          handleremoveTask={this.handleremoveTask}
        />
      );
    });

    return (
      <div>
        <h1>Tasks Lists</h1>
        <ul>{tasksall}</ul>
        <p>{this.state.comment}</p>
      </div>
    );
  }
}
