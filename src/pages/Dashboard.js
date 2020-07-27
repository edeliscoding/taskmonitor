import React, { Component } from "react";
import axios from "axios";
// import Task from "../components/Task";
// import { Apporiginal } from "../components/Apporiginal";
import Tasklist from "../components/Tasklist";

export default class Dashboard extends Component {
  state = {
    tasks: []
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   axios.get("http://localhost:3001/api/dashboard").then(response => {
  //     const results = response.data;
  //     const task2 = results.map(result => {
  //       console.log(result.additional);
  //       const tasks = result.tasks.map(task => {
  //         console.log(task.firstName);
  //       });
  //     });
  //   });
  // }

  componentDidMount() {
    axios.get("http://localhost:3001/api/dashboard").then(response => {
      this.setState({ tasks: response.data });
      // console.log(this.state.tasks);
    });
  }
  render() {
    return (
      <div className="container">
        {/* <h2>hello and welcome</h2> */}
        {/* <form onSubmit={this.handleSubmit}>
          <button type="submit">submit</button>
        </form> */}
        <div className="row">
          {/* <div className="col-md-4">
            {this.state.tasks.map(t => (
              <Task
                additional={t.additional}
                tasksArray={t.tasks}
                // firstName={t.tasks[0].firstName}
                // lastName={t.tasks[0].lastName}
              />
            ))}
          </div> */}
          <div className="col-md-8">
            {/* <Apporiginal />} */}
            <Tasklist />
          </div>
        </div>
      </div>
    );
  }
}
