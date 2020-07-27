import React, { Component } from "react";
import Axios from "axios";

export default class Taskitem extends Component {
  state = {
    isEditing: false,
    // task: this.props.taskFirstName,
    // comment: this.props.taskLastName,
    task: this.props.fname,
    comment: this.props.lname,
    additional: this.props.comment,
    tasksArray: this.props.tasksArray,
    taskid: this.props.id
  };

  toggleForm = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleChange = e => {
    this.setState({
      // [e.target.name]: e.target.value
      [e.target.name]: e.target.value
    });
  };

  onChangeTask = task => {
    this.props.onUserNameChangeHandler(task);
  };

  handleCommentChange = e => {
    this.setState({
      // [e.target.name]: e.target.value
      comment: e.target.value
    });
  };

  handleAdditionalChange = e => {
    this.setState({
      // [e.target.name]: e.target.value
      additional: e.target.value
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateTask(
      this.state.taskid,
      this.state.task,
      this.state.comment,
      this.state.additional
    );
    this.setState({ isEditing: false });
  };

  updateTask = e => {
    e.preventDefault();
    console.log(e);

    const taskToUpdate = {
      tasks: [
        {
          firstName: this.state.task,
          lastName: this.state.comment
        }
      ],
      additional: this.state.additional
    };

    Axios.post(
      "http://localhost:3001/api/task/" + this.state.taskid,
      taskToUpdate
    );
  };
  //this.props.match.params.id
  render() {
    let result;
    if (this.state.isEditing) {
      // });
      result = (
        <div class="container">
          <h1 class="mb-4 mt-5"> Weekly Work Log | 7/13/2020 - 7/17/2020</h1>
          {/* <form onSubmit={this.handleUpdate}> This handle update works for frontend*/}
          <form onSubmit={this.updateTask}>
            <h5 class="mb-3">
              1. Use the table below to list the tasks that you have been
              working on this past week. This can include meetings, grants,
              presentations, trainings and other projects that you worked or
              collaborated on. Details can be included in the comments box.
            </h5>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <label htmlFor="firstName">Project/TaskName</label>
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  name="task"
                  value={this.state.task}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">Comments</label>
                <input
                  type="text"
                  className="form-control"
                  id="comment"
                  name="comment"
                  value={this.state.comment}
                  // value={last}
                  onChange={this.handleCommentChange}
                  // value={inputField.lastName}
                  // onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button className="btn btn-success">Save</button>
              </div>
            </div>
            <h5>
              2. Please add anything else that you would like to share. (Enter
              N/A if not applicable)
            </h5>
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control"
                name="additional"
                value={this.state.additional}
                onChange={this.handleAdditionalChange}
                // value={secondary.secondComments}
                // onChange={event => handleSecondaryChange(event)}
              />
            </div>

            <br />
          </form>
        </div>
      );
    } else {
      result = (
        <div>
          <li>
            {this.props.tasksArray.map(task => {
              return (
                <div>
                  <p>
                    {task.firstName} --- {task.lastName}
                    <span>
                      <button onClick={this.toggleForm}>Edit</button>
                    </span>
                    <span>
                      <button
                        onClick={() =>
                          this.props.handleremoveTask(this.state.taskid)
                        }
                      >
                        Delete
                      </button>
                    </span>
                  </p>
                </div>
              );
            })}
            {/* {this.props.taskFirstName}&nbsp;{this.props.taskLastName}
            {this.state.task}&nbsp;{this.state.comment} */}
          </li>
          <p>{this.state.additional}</p>
        </div>
      );
    }
    return result;
  }
}
