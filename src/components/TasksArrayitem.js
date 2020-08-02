import React, { Component } from "react";
import EditTask from "../components/EditTask";
import "./TasksArrayitem.css";

export class TasksArrayitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksArray: this.props.task
    };
  }

  delete(index, taskindex) {
    this.props.onDeleteIndex(index, taskindex);
  }

  edit(index, taskindex) {
    this.props.onEditIndex(index, taskindex);
  }

  render() {
    const { taskFname, taskLname, task, taskindex, taskid } = this.props;
    //taskindex is index of tasks
    //taskid is the main parent array
    return (
      <main className="row taskArrayItem">
        <div className="mr-5 mb-2">{taskFname}</div>
        <div className="mr-5 mb-2">{taskLname}</div>
        <button onClick={this.delete.bind(this, taskindex, taskid)}>
          Delete
        </button>
      </main>

      // <div className="container">
      //   <div className="input-group">
      //     <input
      //       // id={index}
      //       type="text"
      //       class="form-control input-lg"
      //       // placeholder={task.firstName}
      //       aria-label="Task name"
      //       aria-describedby="basic-addon2"
      //       readOnly
      //     ></input>
      //     <div class="input-group-append">
      //       {/* <button
      //               onClick={this.toggleForm}
      //               className="btn btn-outline-secondary"
      //               type="button"
      //             >
      //               Edit
      //             </button>
      //             <button
      //               onClick={() =>
      //                 this.props.handleremoveTask(this.state.taskid)
      //               }
      //               class="btn btn-outline-secondary"
      //               type="button"
      //             >
      //               Delete
      //             </button> */}
      //     </div>
      //     <div className="mb-5"></div>
      //     <input
      //       // id={index}
      //       type="text"
      //       class="form-control"
      //       // placeholder={task.lastName}
      //       aria-label="Comment name"
      //       aria-describedby="basic-addon2"
      //       readOnly
      //     ></input>
      //     <div class="input-group-append">
      //       <button
      //         // onClick={this.toggleForm}
      //         className="btn btn-outline-secondary"
      //         type="button"
      //         // id={this.taskid}
      //       >
      //         Edit
      //       </button>
      //       <button
      //         // onClick={() => this.props.handleremoveTask(this.state.taskid)}
      //         class="btn btn-primary"
      //         type="button"
      //       >
      //         Delete
      //       </button>
      //     </div>
      //   </div>
      //   {taskFname} -- {taskLname} -{" "}
      //   <button onClick={this.delete.bind(this, taskindex, taskid)}>
      //     Delete
      //   </button>
      // </div>
    );
  }
}

export default TasksArrayitem;
