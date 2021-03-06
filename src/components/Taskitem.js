import React, { Component } from "react";
import Axios from "axios";
import TasksArrayitem from "./TasksArrayitem";
import EditTask from "../components/EditTask";

export default class Taskitem extends Component {
  state = {
    isEditing: false,
    // task: this.props.taskFirstName,
    // comment: this.props.taskLastName,
    task: this.props.fname,
    comment: this.props.lname,
    additional: this.props.comment,
    tasksArray: this.props.tasksArray,
    taskid: this.props.id,
    componentUpdate: false,
    isEditMode: false
  };

  closeButton = () => {
    this.setState({
      isEditing: false
    });
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
    this.setState({
      isEditing: false
    });
  };

  handleEdit = event => {
    Axios.get("https://localhost:3001/api/task/" + event.target.id).then(
      response => {
        this.setState({
          tasks: response.data,
          additional: response.data.additional
        });
      }
    );
  };
  // delete(task){
  //   const data = this.state.tasksArray.filter(i => i.id !== task.id)
  //   this.setState({data})
  // }

  deleteIndex = (index, taskindex) => {
    const newList = this.state.tasksArray.splice(index, 1);
    console.log(index); // 0 -2
    console.log(taskindex); // ._id
    Axios.delete(`http://localhost:3001/api/task/${taskindex}/${index}`).then(
      response => {
        this.setState({ taskArray: newList });
      }
    );
    // // const newListId = indexof(newList);
    // console.log(newList); //array of the object you removed
    // const newListId = newList.

    // Axios.delete(`http://localhost:3001/api/task/${id}/${index}`);
  };

  onEditIndex = (index, taskindex) => {};

  // handleremoveTask = id => {
  //   axios
  //     .delete("http://localhost:3001/api/task/" + id)
  //     .then(response => console.log(response));
  //   this.setState({ tasks: this.state.tasks.filter(task => task._id !== id) });
  // };

  // removeItem(item) {
  //   const item = getItem(this.state.list, item.id) // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
  //   const newlist = [].concat(list) // Clone array with concat or slice(0)
  //   newlist.splice(item.index, 1);
  //   this.setState({list: newlist});
  // }

  //this.props.match.params.id
  render() {
    let result;
    if (this.state.isEditing) {
      // this.handleEdit();
      // });
      result = (
        <EditTask />
        // <div class="container">
        //   <h1 class="mb-4 mt-5"> Weekly Work Log | 7/13/2020 - 7/17/2020</h1>
        //   {/* <form onSubmit={this.handleUpdate}> This handle update works for frontend*/}
        //   <form onSubmit={this.updateTask}>
        //     <h5 class="mb-3">
        //       1. Use the table below to list the tasks that you have been
        //       working on this past week. This can include meetings, grants,
        //       presentations, trainings and other projects that you worked or
        //       collaborated on. Details can be included in the comments box.
        //     </h5>
        //     <div className="form-row">
        //       <div className="form-group col-sm-6">
        //         <label htmlFor="firstName">Project/TaskName</label>
        //         <input
        //           type="text"
        //           className="form-control"
        //           id="task"
        //           name="task"
        //           value={this.state.task}
        //           onChange={this.handleChange}
        //         />
        //       </div>
        //       <div className="form-group col-sm-4">
        //         <label htmlFor="lastName">Comments</label>
        //         <input
        //           type="text"
        //           className="form-control"
        //           id="comment"
        //           name="comment"
        //           value={this.state.comment}
        //           // value={last}
        //           onChange={this.handleCommentChange}

        //           // value={inputField.lastName}
        //           // onChange={event => handleInputChange(index, event)}
        //         />
        //       </div>
        //       <div className="form-group d-flex col-sm-2">
        //         <button
        //           onClick={this.componentupdate}
        //           className="btn btn-sm btn-success"
        //         >
        //           Save
        //         </button>
        //         <button
        //           onClick={this.closeButton}
        //           className="btn btn-sm btn-info"
        //         >
        //           Close
        //         </button>
        //       </div>
        //     </div>

        //     <h5>
        //       2. Please add anything else that you would like to share. (Enter
        //       N/A if not applicable)
        //     </h5>
        //     <div className="form-group col-sm-6">
        //       <input
        //         type="text"
        //         className="form-control"
        //         name="additional"
        //         value={this.state.additional}
        //         onChange={this.handleAdditionalChange}
        //         // value={secondary.secondComments}
        //         // onChange={event => handleSecondaryChange(event)}
        //       />
        //     </div>

        //     <br />
        //   </form>
        // </div>
      );
    } else {
      result = (
        <div class="card mb-3">
          {/* <li key={index}className="list-group-item"> */}
          {this.props.tasksArray.map((task, index) => {
            return (
              <ul className="flex">
                {/* <li key={index}>{task.firstName}</li>
                <button>Edit</button>
                <button onClick={this.delete.bind(this, task)}>Delete</button> */}
                <TasksArrayitem
                  taskid={this.state.taskid}
                  taskFname={task.firstName}
                  taskLname={task.lastName}
                  key={index}
                  taskindex={index}
                  task={task}
                  onDeleteIndex={this.deleteIndex}
                  isEditing={this.state.isEditing}
                />
                <div className="row float-right edit-task">
                  <EditTask
                    taskindex={index}
                    taskid={this.state.taskid}
                    edittask={task}
                    additionalcomment={this.state.additional}
                  />
                </div>
              </ul>
              // <div className="input-group">
              //   <input
              //     id={index}
              //     type="text"
              //     class="form-control input-lg"
              //     placeholder={task.firstName}
              //     aria-label="Task name"
              //     aria-describedby="basic-addon2"
              //     readOnly
              //   ></input>
              //   <div class="input-group-append">
              //     {/* <button
              //       onClick={this.toggleForm}
              //       className="btn btn-outline-secondary"
              //       type="button"
              //     >
              //       Edit
              //     </button>
              //     <button
              //       onClick={() =>
              //         this.props.handleremoveTask(this.state.taskid)
              //       }
              //       class="btn btn-outline-secondary"
              //       type="button"
              //     >
              //       Delete
              //     </button> */}
              //   </div>
              //   <div className="mb-5"></div>
              //   <input
              //     id={index}
              //     type="text"
              //     class="form-control"
              //     placeholder={task.lastName}
              //     aria-label="Comment name"
              //     aria-describedby="basic-addon2"
              //     readOnly
              //   ></input>
              //   <div class="input-group-append">
              //     <button
              //       onClick={this.toggleForm}
              //       className="btn btn-outline-secondary"
              //       type="button"
              //       id={this.taskid}
              //     >
              //       Edit
              //     </button>
              //     <button
              //       onClick={() =>
              //         this.props.handleremoveTask(this.state.taskid)
              //       }
              //       class="btn btn-primary"
              //       type="button"
              //     >
              //       Delete
              //     </button>
              //   </div>
              //   {/* <p>
              //     {task.firstName} --- {task.lastName}
              //     <span>
              //       <button onClick={this.toggleForm}>Edit</button>
              //     </span>
              //     <span>
              //       <button
              //         onClick={() =>
              //           this.props.handleremoveTask(this.state.taskid)
              //         }
              //       >
              //         Delete
              //       </button>
              //     </span>
              //   </p> */}
              // </div>
            );
          })}

          <div className="card-footer">{this.state.additional}</div>
        </div>
      );
    }
    return result;
  }
}
